 import "jsr:@supabase/functions-js/edge-runtime.d.ts";
 import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
 
 const corsHeaders = {
   'Access-Control-Allow-Origin': '*',
   'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
 };
 
 Deno.serve(async (req) => {
   if (req.method === 'OPTIONS') {
     return new Response('ok', { headers: corsHeaders });
   }
 
   try {
     const authHeader = req.headers.get('Authorization');
     if (!authHeader?.startsWith('Bearer ')) {
       return new Response(JSON.stringify({ error: 'Unauthorized' }), { 
         status: 401, 
         headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
       });
     }
 
     const supabase = createClient(
       Deno.env.get('SUPABASE_URL')!,
       Deno.env.get('SUPABASE_ANON_KEY')!,
       { global: { headers: { Authorization: authHeader } } }
     );
 
     const token = authHeader.replace('Bearer ', '');
     const { data: userData, error: authError } = await supabase.auth.getUser(token);
     if (authError || !userData?.user) {
       return new Response(JSON.stringify({ error: 'Unauthorized' }), { 
         status: 401, 
         headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
       });
     }
 
     const userId = userData.user.id;
     const { action, ...params } = await req.json();
 
     const supabaseAdmin = createClient(
       Deno.env.get('SUPABASE_URL')!,
       Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
     );
 
     switch (action) {
       case 'transfer': {
         const { toUserId, amount, description } = params;
         
         if (!toUserId || !amount || amount <= 0) {
           return new Response(JSON.stringify({ error: 'Invalid transfer parameters' }), { 
             status: 400, 
             headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
           });
         }
 
         // Get sender wallet
         const { data: senderWallet, error: senderError } = await supabaseAdmin
           .from('wallets')
           .select('*')
           .eq('user_id', userId)
           .single();
 
         if (senderError || !senderWallet) {
           return new Response(JSON.stringify({ error: 'Sender wallet not found' }), { 
             status: 404, 
             headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
           });
         }
 
         if (Number(senderWallet.balance) < amount) {
           return new Response(JSON.stringify({ error: 'Insufficient balance' }), { 
             status: 400, 
             headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
           });
         }
 
         // Get receiver wallet
         const { data: receiverWallet, error: receiverError } = await supabaseAdmin
           .from('wallets')
           .select('*')
           .eq('user_id', toUserId)
           .single();
 
         if (receiverError || !receiverWallet) {
           return new Response(JSON.stringify({ error: 'Receiver wallet not found' }), { 
             status: 404, 
             headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
           });
         }
 
         // Calculate fee (1%)
         const fee = amount * 0.01;
         const netAmount = amount - fee;
 
         // Execute transfer
         const [senderUpdate, receiverUpdate, txInsert] = await Promise.all([
           supabaseAdmin
             .from('wallets')
             .update({ balance: Number(senderWallet.balance) - amount })
             .eq('id', senderWallet.id),
           supabaseAdmin
             .from('wallets')
             .update({ balance: Number(receiverWallet.balance) + netAmount })
             .eq('id', receiverWallet.id),
           supabaseAdmin
             .from('transactions')
             .insert({
               from_wallet_id: senderWallet.id,
               to_wallet_id: receiverWallet.id,
               amount,
               fee,
               tx_type: 'transfer',
               status: 'completed',
               description: description || 'Transfer',
               completed_at: new Date().toISOString(),
             })
             .select()
             .single(),
         ]);
 
         // Log to BookPI
         await supabaseAdmin.from('bookpi_records').insert({
           event_type: 'transaction',
           entity_type: 'transaction',
           entity_id: txInsert.data?.id,
           user_id: userId,
           payload: { action: 'transfer', amount, to: toUserId, fee },
         });
 
         return new Response(JSON.stringify({ 
           success: true, 
           transaction: txInsert.data,
           newBalance: Number(senderWallet.balance) - amount
         }), {
           headers: { ...corsHeaders, 'Content-Type': 'application/json' },
         });
       }
 
       case 'deposit': {
         const { amount } = params;
         
         if (!amount || amount <= 0) {
           return new Response(JSON.stringify({ error: 'Invalid amount' }), { 
             status: 400, 
             headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
           });
         }
 
         const { data: wallet } = await supabaseAdmin
           .from('wallets')
           .select('*')
           .eq('user_id', userId)
           .single();
 
         if (!wallet) {
           return new Response(JSON.stringify({ error: 'Wallet not found' }), { 
             status: 404, 
             headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
           });
         }
 
         const [walletUpdate, txInsert] = await Promise.all([
           supabaseAdmin
             .from('wallets')
             .update({ balance: Number(wallet.balance) + amount })
             .eq('id', wallet.id),
           supabaseAdmin
             .from('transactions')
             .insert({
               to_wallet_id: wallet.id,
               amount,
               tx_type: 'deposit',
               status: 'completed',
               description: 'Deposit',
               completed_at: new Date().toISOString(),
             })
             .select()
             .single(),
         ]);
 
         await supabaseAdmin.from('bookpi_records').insert({
           event_type: 'transaction',
           entity_type: 'transaction',
           entity_id: txInsert.data?.id,
           user_id: userId,
           payload: { action: 'deposit', amount },
         });
 
         return new Response(JSON.stringify({ 
           success: true,
           newBalance: Number(wallet.balance) + amount
         }), {
           headers: { ...corsHeaders, 'Content-Type': 'application/json' },
         });
       }
 
       default:
         return new Response(JSON.stringify({ error: 'Unknown action' }), { 
           status: 400, 
           headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
         });
     }
 
   } catch (error) {
     console.error('Economy error:', error);
     return new Response(JSON.stringify({ error: 'Internal server error' }), { 
       status: 500, 
       headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
     });
   }
 });
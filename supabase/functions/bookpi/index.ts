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
 
     const url = new URL(req.url);
     const limit = parseInt(url.searchParams.get('limit') || '50');
     const offset = parseInt(url.searchParams.get('offset') || '0');
     const eventType = url.searchParams.get('event_type');
 
     let query = supabase
       .from('bookpi_records')
       .select('*', { count: 'exact' })
       .order('block_number', { ascending: false })
       .range(offset, offset + limit - 1);
 
     if (eventType) {
       query = query.eq('event_type', eventType);
     }
 
     const { data: records, count, error } = await query;
 
     if (error) {
       throw error;
     }
 
     // Verify chain integrity (sample check)
     let chainValid = true;
     if (records && records.length > 1) {
       for (let i = 0; i < records.length - 1; i++) {
         if (records[i].prev_hash !== records[i + 1].hash) {
           chainValid = false;
           break;
         }
       }
     }
 
     return new Response(JSON.stringify({ 
       records,
       total: count,
       chainValid,
       pagination: {
         limit,
         offset,
         hasMore: (count || 0) > offset + limit
       }
     }), {
       headers: { ...corsHeaders, 'Content-Type': 'application/json' },
     });
 
   } catch (error) {
     console.error('BookPI error:', error);
     return new Response(JSON.stringify({ error: 'Internal server error' }), { 
       status: 500, 
       headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
     });
   }
 });
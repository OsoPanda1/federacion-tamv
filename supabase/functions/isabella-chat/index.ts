 import "jsr:@supabase/functions-js/edge-runtime.d.ts";
 import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
 
 const corsHeaders = {
   'Access-Control-Allow-Origin': '*',
   'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
 };
 
 const LOVABLE_AI_URL = "https://ai.gateway.lovable.dev/v1/chat/completions";
 
 const SYSTEM_PROMPT = `Eres Isabella, la asistente de IA del ecosistema TAMV (Transcultural Autonomous MetaVerse). 
 
 Tu rol es ayudar a los ciudadanos de TAMV con:
 - Consultas sobre su wallet y transacciones
 - Análisis de reputación MSR (Wisdom, Community, Creation)
 - Información sobre DAOs y gobernanza
 - Estado de seguridad TENOCHTITLAN
 - Guía sobre el ecosistema TAMV
 
 Personalidad:
 - Profesional pero amigable
 - Usa terminología civilizacional (ciudadano, ecosistema, etc.)
 - Proporciona respuestas concisas pero informativas
 - Cuando sea relevante, menciona herramientas o acciones disponibles
 
 Contexto del usuario que está hablando contigo:
 - Email: {user_email}
 - Balance del wallet: {wallet_balance} TAMV
 - MSR: Wisdom {msr_wisdom}, Community {msr_community}, Creation {msr_creation}
 
 Responde siempre en español a menos que el usuario escriba en otro idioma.`;
 
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
 
     // Verify user
     const token = authHeader.replace('Bearer ', '');
     const { data: userData, error: authError } = await supabase.auth.getUser(token);
     if (authError || !userData?.user) {
       return new Response(JSON.stringify({ error: 'Unauthorized' }), { 
         status: 401, 
         headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
       });
     }
 
     const userId = userData.user.id;
     const userEmail = userData.user.email || 'ciudadano';
 
     // Get user context
     const [walletResult, msrResult] = await Promise.all([
       supabase.from('wallets').select('balance').eq('user_id', userId).maybeSingle(),
       supabase.from('msr_scores').select('*').eq('user_id', userId).maybeSingle(),
     ]);
 
     const walletBalance = walletResult.data?.balance || 0;
     const msr = msrResult.data || { wisdom: 0, community: 0, creation: 0 };
 
     // Parse request
     const { message, conversationHistory = [] } = await req.json();
 
     if (!message) {
       return new Response(JSON.stringify({ error: 'Message is required' }), { 
         status: 400, 
         headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
       });
     }
 
     // Build system prompt with user context
     const contextualSystemPrompt = SYSTEM_PROMPT
       .replace('{user_email}', userEmail)
       .replace('{wallet_balance}', String(walletBalance))
       .replace('{msr_wisdom}', String(msr.wisdom))
       .replace('{msr_community}', String(msr.community))
       .replace('{msr_creation}', String(msr.creation));
 
     // Build messages array
     const messages = [
       { role: 'system', content: contextualSystemPrompt },
       ...conversationHistory.slice(-10), // Keep last 10 messages for context
       { role: 'user', content: message }
     ];
 
     // Call Lovable AI
     const aiResponse = await fetch(LOVABLE_AI_URL, {
       method: 'POST',
       headers: {
         'Content-Type': 'application/json',
         'Authorization': `Bearer ${Deno.env.get('LOVABLE_API_KEY')}`,
       },
       body: JSON.stringify({
         model: 'google/gemini-3-flash-preview',
         messages,
         max_tokens: 1024,
         temperature: 0.7,
       }),
     });
 
     if (!aiResponse.ok) {
       const error = await aiResponse.text();
       console.error('AI Gateway error:', error);
       return new Response(JSON.stringify({ 
         error: 'AI service temporarily unavailable',
         fallbackResponse: 'Lo siento, estoy experimentando dificultades técnicas. Por favor, intenta de nuevo en unos momentos.'
       }), { 
         status: 500, 
         headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
       });
     }
 
     const aiData = await aiResponse.json();
     const assistantMessage = aiData.choices?.[0]?.message?.content || 'No pude generar una respuesta.';
 
     return new Response(JSON.stringify({ 
       response: assistantMessage,
       userContext: {
         walletBalance,
         msr,
       }
     }), {
       headers: { ...corsHeaders, 'Content-Type': 'application/json' },
     });
 
   } catch (error) {
     console.error('Error in isabella-chat:', error);
     return new Response(JSON.stringify({ 
       error: 'Internal server error',
       fallbackResponse: 'Ha ocurrido un error inesperado. Por favor, intenta de nuevo.'
     }), { 
       status: 500, 
       headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
     });
   }
 });
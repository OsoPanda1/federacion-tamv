 import { useQuery } from '@tanstack/react-query';
 import { supabase } from '@/integrations/supabase/client';
 import { useAuth } from '@/contexts/AuthContext';
 
 export interface MSRScore {
   id: string;
   user_id: string;
   wisdom: number;
   community: number;
   creation: number;
   total_score: number;
   last_updated: string;
 }
 
 export function useMSR() {
   const { user } = useAuth();
   
   return useQuery({
     queryKey: ['msr', user?.id],
     queryFn: async () => {
       if (!user) return null;
       const { data, error } = await supabase
         .from('msr_scores')
         .select('*')
         .eq('user_id', user.id)
         .maybeSingle();
       
       if (error) throw error;
       return data as MSRScore | null;
     },
     enabled: !!user,
   });
 }
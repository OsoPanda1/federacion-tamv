 import { useQuery } from '@tanstack/react-query';
 import { supabase } from '@/integrations/supabase/client';
 
 export interface BookPIRecord {
   id: string;
   event_type: string;
   entity_type: string;
   entity_id: string | null;
   user_id: string | null;
   payload: Record<string, unknown>;
   hash: string;
   prev_hash: string | null;
   block_number: number;
   created_at: string;
 }
 
 export function useBookPI(limit = 50) {
   return useQuery({
     queryKey: ['bookpi', limit],
     queryFn: async () => {
       const { data, error } = await supabase
         .from('bookpi_records')
         .select('*')
         .order('block_number', { ascending: false })
         .limit(limit);
       
       if (error) throw error;
       return data as BookPIRecord[];
     },
   });
 }
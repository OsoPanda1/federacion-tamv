 import { useQuery } from '@tanstack/react-query';
 import { supabase } from '@/integrations/supabase/client';
 import { useEffect } from 'react';
 import { useQueryClient } from '@tanstack/react-query';
 
 export interface ServiceHealth {
   id: string;
   service_name: string;
   status: 'operational' | 'degraded' | 'maintenance' | 'outage';
   uptime_percentage: number;
   last_check: string;
   metadata: Record<string, unknown>;
 }
 
 export function useServiceHealth() {
   const queryClient = useQueryClient();
   
   // Realtime updates
   useEffect(() => {
     const channel = supabase
       .channel('service_health')
       .on(
         'postgres_changes',
         {
           event: '*',
           schema: 'public',
           table: 'service_health',
         },
         () => {
           queryClient.invalidateQueries({ queryKey: ['service-health'] });
         }
       )
       .subscribe();
     
     return () => {
       supabase.removeChannel(channel);
     };
   }, [queryClient]);
   
   return useQuery({
     queryKey: ['service-health'],
     queryFn: async () => {
       const { data, error } = await supabase
         .from('service_health')
         .select('*')
         .order('service_name');
       
       if (error) throw error;
       return data as ServiceHealth[];
     },
   });
 }
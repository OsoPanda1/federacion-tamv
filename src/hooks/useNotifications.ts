 import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
 import { supabase } from '@/integrations/supabase/client';
 import { useAuth } from '@/contexts/AuthContext';
 import { useEffect } from 'react';
 
 export interface Notification {
   id: string;
   user_id: string;
   title: string;
   content: string | null;
   notification_type: 'info' | 'success' | 'warning' | 'error' | 'transaction' | 'dao' | 'security';
   read: boolean;
   action_url: string | null;
   created_at: string;
 }
 
 export function useNotifications() {
   const { user } = useAuth();
   const queryClient = useQueryClient();
   
   // Set up realtime subscription
   useEffect(() => {
     if (!user) return;
     
     const channel = supabase
       .channel('notifications')
       .on(
         'postgres_changes',
         {
           event: 'INSERT',
           schema: 'public',
           table: 'notifications',
           filter: `user_id=eq.${user.id}`,
         },
         () => {
           queryClient.invalidateQueries({ queryKey: ['notifications'] });
         }
       )
       .subscribe();
     
     return () => {
       supabase.removeChannel(channel);
     };
   }, [user, queryClient]);
   
   return useQuery({
     queryKey: ['notifications', user?.id],
     queryFn: async () => {
       if (!user) return [];
       const { data, error } = await supabase
         .from('notifications')
         .select('*')
         .eq('user_id', user.id)
         .order('created_at', { ascending: false })
         .limit(20);
       
       if (error) throw error;
       return data as Notification[];
     },
     enabled: !!user,
   });
 }
 
 export function useMarkAsRead() {
   const queryClient = useQueryClient();
   
   return useMutation({
     mutationFn: async (notificationId: string) => {
       const { error } = await supabase
         .from('notifications')
         .update({ read: true })
         .eq('id', notificationId);
       
       if (error) throw error;
     },
     onSuccess: () => {
       queryClient.invalidateQueries({ queryKey: ['notifications'] });
     },
   });
 }
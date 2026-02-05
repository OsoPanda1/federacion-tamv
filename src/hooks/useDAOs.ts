 import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
 import { supabase } from '@/integrations/supabase/client';
 import { useAuth } from '@/contexts/AuthContext';
 
 export interface DAO {
   id: string;
   name: string;
   description: string | null;
   avatar_url: string | null;
   treasury_balance: number;
   member_count: number;
   status: 'active' | 'inactive' | 'dissolved';
   created_by: string | null;
   created_at: string;
   updated_at: string;
 }
 
 export interface DAOMember {
   id: string;
   dao_id: string;
   user_id: string;
   role: 'member' | 'moderator' | 'admin' | 'founder';
   joined_at: string;
   contribution: number;
 }
 
 export function useDAOs() {
   return useQuery({
     queryKey: ['daos'],
     queryFn: async () => {
       const { data, error } = await supabase
         .from('daos')
         .select('*')
         .eq('status', 'active')
         .order('member_count', { ascending: false });
       
       if (error) throw error;
       return data as DAO[];
     },
   });
 }
 
 export function useMyDAOs() {
   const { user } = useAuth();
   
   return useQuery({
     queryKey: ['my-daos', user?.id],
     queryFn: async () => {
       if (!user) return [];
       const { data, error } = await supabase
         .from('dao_members')
         .select(`
           *,
           dao:daos(*)
         `)
         .eq('user_id', user.id);
       
       if (error) throw error;
       return data;
     },
     enabled: !!user,
   });
 }
 
 export function useJoinDAO() {
   const queryClient = useQueryClient();
   const { user } = useAuth();
   
   return useMutation({
     mutationFn: async (daoId: string) => {
       if (!user) throw new Error('Not authenticated');
       const { data, error } = await supabase
         .from('dao_members')
         .insert({
           dao_id: daoId,
           user_id: user.id,
           role: 'member',
         })
         .select()
         .single();
       
       if (error) throw error;
       return data;
     },
     onSuccess: () => {
       queryClient.invalidateQueries({ queryKey: ['daos'] });
       queryClient.invalidateQueries({ queryKey: ['my-daos'] });
     },
   });
 }
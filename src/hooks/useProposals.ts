 import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
 import { supabase } from '@/integrations/supabase/client';
 import { useAuth } from '@/contexts/AuthContext';
 
 export interface Proposal {
   id: string;
   dao_id: string;
   title: string;
   description: string;
   proposer_id: string;
   status: 'draft' | 'active' | 'passed' | 'rejected' | 'executed';
   votes_for: number;
   votes_against: number;
   quorum: number;
   deadline: string | null;
   created_at: string;
   updated_at: string;
 }
 
 export interface Vote {
   id: string;
   proposal_id: string;
   user_id: string;
   choice: 'for' | 'against' | 'abstain';
   weight: number;
   created_at: string;
 }
 
 export function useProposals(daoId?: string) {
   return useQuery({
     queryKey: ['proposals', daoId],
     queryFn: async () => {
       let query = supabase
         .from('proposals')
         .select('*')
         .order('created_at', { ascending: false });
       
       if (daoId) {
         query = query.eq('dao_id', daoId);
       }
       
       const { data, error } = await query;
       if (error) throw error;
       return data as Proposal[];
     },
   });
 }
 
 export function useVote() {
   const queryClient = useQueryClient();
   const { user } = useAuth();
   
   return useMutation({
     mutationFn: async ({ proposalId, choice }: { proposalId: string; choice: 'for' | 'against' | 'abstain' }) => {
       if (!user) throw new Error('Not authenticated');
       const { data, error } = await supabase
         .from('votes')
         .insert({
           proposal_id: proposalId,
           user_id: user.id,
           choice,
         })
         .select()
         .single();
       
       if (error) throw error;
       return data;
     },
     onSuccess: () => {
       queryClient.invalidateQueries({ queryKey: ['proposals'] });
     },
   });
 }
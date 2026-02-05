 import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
 import { supabase } from '@/integrations/supabase/client';
 import { useAuth } from '@/contexts/AuthContext';
 
 export interface Wallet {
   id: string;
   user_id: string;
   balance: number;
   locked_balance: number;
   currency: string;
   created_at: string;
   updated_at: string;
 }
 
 export interface Transaction {
   id: string;
   from_wallet_id: string | null;
   to_wallet_id: string | null;
   amount: number;
   fee: number;
   tx_type: 'transfer' | 'deposit' | 'withdrawal' | 'dao_contribution' | 'reward' | 'fee';
   status: 'pending' | 'completed' | 'failed' | 'reversed';
   description: string | null;
   metadata: Record<string, unknown>;
   created_at: string;
   completed_at: string | null;
 }
 
 export function useWallet() {
   const { user } = useAuth();
   
   return useQuery({
     queryKey: ['wallet', user?.id],
     queryFn: async () => {
       if (!user) return null;
       const { data, error } = await supabase
         .from('wallets')
         .select('*')
         .eq('user_id', user.id)
         .maybeSingle();
       
       if (error) throw error;
       return data as Wallet | null;
     },
     enabled: !!user,
   });
 }
 
 export function useTransactions() {
   const { user } = useAuth();
   const { data: wallet } = useWallet();
   
   return useQuery({
     queryKey: ['transactions', wallet?.id],
     queryFn: async () => {
       if (!wallet) return [];
       const { data, error } = await supabase
         .from('transactions')
         .select('*')
         .or(`from_wallet_id.eq.${wallet.id},to_wallet_id.eq.${wallet.id}`)
         .order('created_at', { ascending: false })
         .limit(50);
       
       if (error) throw error;
       return data as Transaction[];
     },
     enabled: !!wallet,
   });
 }
 
 export function useCreateTransaction() {
   const queryClient = useQueryClient();
   
   return useMutation({
     mutationFn: async (tx: {
       from_wallet_id: string;
       to_wallet_id?: string;
       amount: number;
       tx_type: Transaction['tx_type'];
       description?: string;
     }) => {
       const { data, error } = await supabase
         .from('transactions')
         .insert({
           ...tx,
           status: 'pending',
         })
         .select()
         .single();
       
       if (error) throw error;
       return data;
     },
     onSuccess: () => {
       queryClient.invalidateQueries({ queryKey: ['transactions'] });
       queryClient.invalidateQueries({ queryKey: ['wallet'] });
     },
   });
 }
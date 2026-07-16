import { createSupabaseClient } from './supabase';

export interface RoleInput {
  name: string;
}

export interface RoleRecord extends RoleInput {
  id: string;
}

export async function listRoles(): Promise<RoleRecord[]> {
  const supabase = createSupabaseClient();
  const { data, error } = await supabase.from('roles').select('id, name').order('created_at', { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []).map((item) => ({
    id: item.id,
    name: item.name
  }));
}

export async function createRole(input: RoleInput): Promise<RoleRecord> {
  const supabase = createSupabaseClient();
  const { data, error } = await supabase.from('roles').insert({ name: input.name }).select('id, name').single();

  if (error) {
    throw new Error(error.message);
  }

  return {
    id: data.id,
    name: data.name
  };
}

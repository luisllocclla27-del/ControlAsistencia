import { createSupabaseClient, hasSupabaseCredentials } from './supabase';
import { generateLocalId, loadLocalDatabase, saveLocalDatabase } from './local-db';

export interface RoleInput {
  name: string;
}

export interface RoleRecord extends RoleInput {
  id: string;
}

export async function listRoles(): Promise<RoleRecord[]> {
  if (!hasSupabaseCredentials()) {
    const database = await loadLocalDatabase();
    return database.roles.map((item) => ({
      id: item.id,
      name: item.name
    }));
  }

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
  if (!hasSupabaseCredentials()) {
    const database = await loadLocalDatabase();
    const record: RoleRecord = {
      id: generateLocalId('role'),
      name: input.name
    };

    database.roles.unshift(record);
    await saveLocalDatabase(database);

    return record;
  }

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

import { createSupabaseClient, hasSupabaseCredentials } from './supabase';
import { generateLocalId, loadLocalDatabase, saveLocalDatabase } from './local-db';

export interface ShiftInput {
  name: string;
  startTime: string;
  endTime: string;
  toleranceMinutes: number;
}

export interface ShiftRecord extends ShiftInput {
  id: string;
}

export async function listShifts(): Promise<ShiftRecord[]> {
  if (!hasSupabaseCredentials()) {
    const database = await loadLocalDatabase();
    return database.shifts.map((item) => ({
      id: item.id,
      name: item.name,
      startTime: item.startTime,
      endTime: item.endTime,
      toleranceMinutes: item.toleranceMinutes
    }));
  }

  const supabase = createSupabaseClient();
  const { data, error } = await supabase.from('shifts').select('id, name, start_time, end_time, tolerance_minutes').order('created_at', { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []).map((item) => ({
    id: item.id,
    name: item.name,
    startTime: item.start_time,
    endTime: item.end_time,
    toleranceMinutes: item.tolerance_minutes
  }));
}

export async function createShift(input: ShiftInput): Promise<ShiftRecord> {
  if (!hasSupabaseCredentials()) {
    const database = await loadLocalDatabase();
    const record: ShiftRecord = {
      id: generateLocalId('shift'),
      name: input.name,
      startTime: input.startTime,
      endTime: input.endTime,
      toleranceMinutes: input.toleranceMinutes
    };

    database.shifts.unshift(record);
    await saveLocalDatabase(database);

    return record;
  }

  const supabase = createSupabaseClient();
  const { data, error } = await supabase
    .from('shifts')
    .insert({
      name: input.name,
      start_time: input.startTime,
      end_time: input.endTime,
      tolerance_minutes: input.toleranceMinutes
    })
    .select('id, name, start_time, end_time, tolerance_minutes')
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return {
    id: data.id,
    name: data.name,
    startTime: data.start_time,
    endTime: data.end_time,
    toleranceMinutes: data.tolerance_minutes
  };
}

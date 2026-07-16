import { createSupabaseClient } from './supabase';

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

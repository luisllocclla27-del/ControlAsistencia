import { createSupabaseClient } from './supabase';
import { buildAttendanceSummary, type AttendanceRecord, type AttendanceSummary } from './report';

export interface AttendanceEntryInput {
  employeeId: string;
  workDate: string;
  scheduledStart: string;
  clockIn: string;
  clockOut?: string;
  shiftId?: string;
  notes?: string;
}

export interface AttendanceEntryRecord {
  id: string;
  employeeId: string;
  workDate: string;
  scheduledStart: string;
  clockIn: string;
  clockOut: string | null;
  tardinessMinutes: number;
  notes: string | null;
}

export async function fetchAttendanceSummary(): Promise<AttendanceSummary> {
  const supabase = createSupabaseClient();

  const { data, error } = await supabase
    .from('attendance_records')
    .select('employee_id, work_date, tardiness_minutes, clock_in')
    .order('work_date', { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  const records = (data ?? []) as AttendanceRecord[];
  return buildAttendanceSummary(records);
}

export async function listAttendanceRecords(): Promise<AttendanceEntryRecord[]> {
  const supabase = createSupabaseClient();
  const { data, error } = await supabase
    .from('attendance_records')
    .select('id, employee_id, work_date, clock_in, clock_out, tardiness_minutes, notes')
    .order('work_date', { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []).map((item) => ({
    id: item.id,
    employeeId: item.employee_id,
    workDate: item.work_date,
    scheduledStart: '08:00',
    clockIn: item.clock_in,
    clockOut: item.clock_out,
    tardinessMinutes: item.tardiness_minutes,
    notes: item.notes
  }));
}

export async function createAttendanceRecord(input: AttendanceEntryInput): Promise<AttendanceEntryRecord> {
  const supabase = createSupabaseClient();
  const tardinessMinutes = Math.max(0, timeToMinutes(input.clockIn) - timeToMinutes(input.scheduledStart));

  const { data, error } = await supabase
    .from('attendance_records')
    .insert({
      employee_id: input.employeeId,
      work_date: input.workDate,
      clock_in: input.clockIn,
      clock_out: input.clockOut ?? null,
      tardiness_minutes: tardinessMinutes,
      notes: input.notes ?? null,
      shift_id: input.shiftId ?? null
    })
    .select('id, employee_id, work_date, clock_in, clock_out, tardiness_minutes, notes')
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return {
    id: data.id,
    employeeId: data.employee_id,
    workDate: data.work_date,
    scheduledStart: input.scheduledStart,
    clockIn: data.clock_in,
    clockOut: data.clock_out,
    tardinessMinutes: data.tardiness_minutes,
    notes: data.notes
  };
}

function timeToMinutes(time: string): number {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
}

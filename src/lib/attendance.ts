export type AttendanceStatus = 'on_time' | 'late';

export interface AttendanceInput {
  scheduledStart: string;
  clockIn: string;
  clockOut?: string;
}

function toMinutes(time: string): number {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
}

export function calculateTardinessMinutes(scheduledStart: string, clockIn: string): number {
  return Math.max(0, toMinutes(clockIn) - toMinutes(scheduledStart));
}

export function classifyAttendance(input: AttendanceInput): AttendanceStatus {
  return calculateTardinessMinutes(input.scheduledStart, input.clockIn) > 0 ? 'late' : 'on_time';
}

export function calculateWorkedMinutes(clockIn: string, clockOut: string): number {
  return Math.max(0, toMinutes(clockOut) - toMinutes(clockIn));
}

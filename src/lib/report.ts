export interface AttendanceRecord {
  employeeId: string;
  workDate: string;
  tardinessMinutes: number;
  clockIn: string;
}

export interface AttendanceSummary {
  totalRecords: number;
  lateRecords: number;
  onTimeRecords: number;
  totalTardinessMinutes: number;
}

export function buildAttendanceSummary(records: AttendanceRecord[]): AttendanceSummary {
  const totalRecords = records.length;
  const lateRecords = records.filter((record) => record.tardinessMinutes > 0).length;
  const totalTardinessMinutes = records.reduce((sum, record) => sum + record.tardinessMinutes, 0);

  return {
    totalRecords,
    lateRecords,
    onTimeRecords: totalRecords - lateRecords,
    totalTardinessMinutes
  };
}

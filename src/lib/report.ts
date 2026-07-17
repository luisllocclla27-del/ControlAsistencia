export interface AttendanceRecord {
  employeeId: string;
  employeeName?: string;
  workDate: string;
  tardinessMinutes: number;
  clockIn: string;
  clockOut?: string | null;
  notes?: string | null;
}

export interface EmployeeReportBreakdown {
  employeeId: string;
  employeeName: string;
  totalRecords: number;
  onTimeRecords: number;
  lateRecords: number;
  earlyDepartures: number;
  totalTardinessMinutes: number;
}

export interface AttendanceSummary {
  totalRecords: number;
  lateRecords: number;
  onTimeRecords: number;
  totalTardinessMinutes: number;
  employeeBreakdown: EmployeeReportBreakdown[];
}

export function buildAttendanceSummary(records: AttendanceRecord[]): AttendanceSummary {
  const totalRecords = records.length;
  const lateRecords = records.filter((record) => record.tardinessMinutes > 0).length;
  const totalTardinessMinutes = records.reduce((sum, record) => sum + record.tardinessMinutes, 0);

  const breakdownMap = new Map<string, EmployeeReportBreakdown>();

  for (const record of records) {
    const isLate = record.tardinessMinutes > 0;
    const isEarlyDeparture = record.notes ? record.notes.includes('Salida anticipada') : false;

    if (!breakdownMap.has(record.employeeId)) {
      breakdownMap.set(record.employeeId, {
        employeeId: record.employeeId,
        employeeName: record.employeeName || record.employeeId,
        totalRecords: 0,
        onTimeRecords: 0,
        lateRecords: 0,
        earlyDepartures: 0,
        totalTardinessMinutes: 0,
      });
    }

    const b = breakdownMap.get(record.employeeId)!;
    b.totalRecords++;
    b.totalTardinessMinutes += record.tardinessMinutes;
    if (isLate) b.lateRecords++;
    else b.onTimeRecords++;
    
    if (isEarlyDeparture) b.earlyDepartures++;
  }

  return {
    totalRecords,
    lateRecords,
    onTimeRecords: totalRecords - lateRecords,
    totalTardinessMinutes,
    employeeBreakdown: Array.from(breakdownMap.values()).sort((a, b) => a.employeeName.localeCompare(b.employeeName))
  };
}

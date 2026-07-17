import { DashboardShell } from '@/components/dashboard-shell';
import { fetchAttendanceSummary, listAttendanceRecords } from '@/lib/attendance-repository';
import { listEmployees } from '@/lib/employee-repository';
import { listShifts } from '@/lib/shift-repository';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const [employees, shifts, attendanceRecords, attendanceSummary] = await Promise.all([
    listEmployees(),
    listShifts(),
    listAttendanceRecords(),
    fetchAttendanceSummary()
  ]);

  return (
    <DashboardShell
      data={{
        employeeCount: employees.length,
        shiftCount: shifts.length,
        attendanceCount: attendanceRecords.length,
        lateCount: attendanceSummary.lateRecords,
        totalRecords: attendanceSummary.totalRecords,
        onTimeRecords: attendanceSummary.onTimeRecords,
        lateRecords: attendanceSummary.lateRecords,
        totalTardinessMinutes: attendanceSummary.totalTardinessMinutes,
      }}
    />
  );
}

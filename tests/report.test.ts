import { describe, expect, it } from 'vitest';
import { buildAttendanceSummary } from '../src/lib/report';

describe('attendance report summary', () => {
  it('builds a summary from attendance records', () => {
    const summary = buildAttendanceSummary([
      { employeeId: '1', workDate: '2026-07-15', tardinessMinutes: 0, clockIn: '08:00' },
      { employeeId: '2', workDate: '2026-07-15', tardinessMinutes: 12, clockIn: '08:12' },
      { employeeId: '3', workDate: '2026-07-15', tardinessMinutes: 0, clockIn: '07:59' }
    ]);

    expect(summary).toEqual({
      totalRecords: 3,
      lateRecords: 1,
      onTimeRecords: 2,
      totalTardinessMinutes: 12
    });
  });

  it('returns an empty summary when there are no records', () => {
    expect(buildAttendanceSummary([])).toEqual({
      totalRecords: 0,
      lateRecords: 0,
      onTimeRecords: 0,
      totalTardinessMinutes: 0
    });
  });
});

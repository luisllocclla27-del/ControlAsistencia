import { buildAttendanceSummary, AttendanceRecord } from '../src/lib/report';

describe('Funciones de Reporte de Asistencia', () => {
  it('debería calcular correctamente las tardanzas y asistencias puntuales', () => {
    const records: AttendanceRecord[] = [
      { employeeId: 'EMP-001', employeeName: 'Ana Perez', workDate: '2026-07-15', clockIn: '08:00', tardinessMinutes: 0 },
      { employeeId: 'EMP-001', employeeName: 'Ana Perez', workDate: '2026-07-16', clockIn: '08:30', tardinessMinutes: 30 },
      { employeeId: 'EMP-002', employeeName: 'Luis Gomez', workDate: '2026-07-15', clockIn: '08:05', tardinessMinutes: 5 },
    ];

    const summary = buildAttendanceSummary(records);

    expect(summary.totalRecords).toBe(3);
    expect(summary.lateRecords).toBe(2);
    expect(summary.onTimeRecords).toBe(1);
    expect(summary.totalTardinessMinutes).toBe(35);
  });

  it('debería consolidar correctamente los datos por empleado', () => {
    const records: AttendanceRecord[] = [
      { employeeId: 'EMP-001', employeeName: 'Ana Perez', workDate: '2026-07-15', clockIn: '08:00', tardinessMinutes: 0 },
      { employeeId: 'EMP-001', employeeName: 'Ana Perez', workDate: '2026-07-16', clockIn: '08:30', tardinessMinutes: 30 },
      { employeeId: 'EMP-002', employeeName: 'Luis Gomez', workDate: '2026-07-15', clockIn: '08:05', tardinessMinutes: 5 },
    ];

    const summary = buildAttendanceSummary(records);

    expect(summary.employeeBreakdown).toHaveLength(2);
    
    // Validar datos de Ana
    const ana = summary.employeeBreakdown.find(e => e.employeeId === 'EMP-001');
    expect(ana).toBeDefined();
    expect(ana?.totalRecords).toBe(2);
    expect(ana?.lateRecords).toBe(1);
    expect(ana?.onTimeRecords).toBe(1);
    expect(ana?.totalTardinessMinutes).toBe(30);

    // Validar datos de Luis
    const luis = summary.employeeBreakdown.find(e => e.employeeId === 'EMP-002');
    expect(luis).toBeDefined();
    expect(luis?.totalRecords).toBe(1);
    expect(luis?.lateRecords).toBe(1);
    expect(luis?.onTimeRecords).toBe(0);
    expect(luis?.totalTardinessMinutes).toBe(5);
  });

  it('debería detectar y contar correctamente las salidas anticipadas', () => {
    const records: AttendanceRecord[] = [
      { 
        employeeId: 'EMP-001', 
        workDate: '2026-07-15', 
        clockIn: '08:00', 
        tardinessMinutes: 0,
        notes: 'Salida anticipada (30 min)' 
      },
      { 
        employeeId: 'EMP-001', 
        workDate: '2026-07-16', 
        clockIn: '08:00', 
        tardinessMinutes: 0,
        notes: 'Marcado por kiosko' 
      },
    ];

    const summary = buildAttendanceSummary(records);
    const ana = summary.employeeBreakdown.find(e => e.employeeId === 'EMP-001');
    
    expect(ana?.earlyDepartures).toBe(1);
  });
});

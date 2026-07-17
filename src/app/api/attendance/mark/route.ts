import { NextResponse } from 'next/server';
import { getEmployeeByCode } from '@/lib/employee-repository';
import { getTodayAttendanceByEmployee, createAttendanceRecord, updateAttendanceClockOut } from '@/lib/attendance-repository';

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      employeeCode?: string;
      type?: 'entrada' | 'salida';
    };

    if (!body.employeeCode || !body.type) {
      return NextResponse.json({ error: 'Faltan campos requeridos' }, { status: 400 });
    }

    // Buscar al empleado
    const employee = await getEmployeeByCode(body.employeeCode);
    if (!employee) {
      return NextResponse.json({ error: 'Empleado no encontrado' }, { status: 404 });
    }

    // Fecha actual para el registro
    const ahora = new Date();
    // Ajustar a hora local (aproximado usando toISOString y quitando parte de la fecha/hora)
    const year = ahora.getFullYear();
    const month = String(ahora.getMonth() + 1).padStart(2, '0');
    const day = String(ahora.getDate()).padStart(2, '0');
    const workDate = `${year}-${month}-${day}`;
    
    const hours = String(ahora.getHours()).padStart(2, '0');
    const minutes = String(ahora.getMinutes()).padStart(2, '0');
    const timeString = `${hours}:${minutes}`;

    const existingRecord = await getTodayAttendanceByEmployee(employee.id, workDate);

    if (body.type === 'entrada') {
      if (existingRecord) {
        return NextResponse.json({ error: 'Ya marcaste entrada el día de hoy' }, { status: 400 });
      }

      const record = await createAttendanceRecord({
        employeeId: employee.id,
        workDate,
        scheduledStart: '08:00', // Valor por defecto para la demo
        clockIn: timeString,
        notes: 'Marcado por Kiosko'
      });
      return NextResponse.json(record, { status: 201 });
      
    } else if (body.type === 'salida') {
      if (!existingRecord) {
        return NextResponse.json({ error: 'Debes marcar entrada antes de salir' }, { status: 400 });
      }
      
      if (existingRecord.clockOut) {
        return NextResponse.json({ error: 'Ya marcaste tu salida el día de hoy' }, { status: 400 });
      }

      await updateAttendanceClockOut(existingRecord.id, timeString);
      return NextResponse.json({ success: true }, { status: 200 });
    }

    return NextResponse.json({ error: 'Tipo de marcación inválido' }, { status: 400 });

  } catch (error) {
    const message = error instanceof Error ? error.message : 'Error inesperado';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

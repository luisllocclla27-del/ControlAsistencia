import { NextResponse } from 'next/server';
import { getEmployeeByCode } from '@/lib/employee-repository';
import { getTodayAttendanceByEmployee, createAttendanceRecord, updateAttendanceClockOut } from '@/lib/attendance-repository';
import { z } from 'zod';

const markAttendanceSchema = z.object({
  employeeCode: z.string().min(1, 'El código de empleado es requerido'),
  type: z.enum(['entrada', 'salida'], {
    message: "El tipo debe ser 'entrada' o 'salida'"
  })
});

export async function POST(request: Request) {
  try {
    const json = await request.json();
    
    const result = markAttendanceSchema.safeParse(json);
    if (!result.success) {
      return NextResponse.json({ error: result.error.errors[0].message }, { status: 400 });
    }
    
    const body = result.data;

    // Buscar al empleado
    const employee = await getEmployeeByCode(body.employeeCode);
    if (!employee) {
      return NextResponse.json({ error: 'Empleado no encontrado' }, { status: 404 });
    }

    // America/Lima es UTC-5
    const now = new Date();
    const limaTime = new Date(now.getTime() - 5 * 60 * 60 * 1000);
    const year = limaTime.getUTCFullYear();
    const month = String(limaTime.getUTCMonth() + 1).padStart(2, '0');
    const day = String(limaTime.getUTCDate()).padStart(2, '0');
    const workDate = `${year}-${month}-${day}`;
    
    const hours = String(limaTime.getUTCHours()).padStart(2, '0');
    const minutes = String(limaTime.getUTCMinutes()).padStart(2, '0');
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

      let notes = existingRecord.notes || '';
      const scheduledEnd = '17:00';
      const [hOut, mOut] = timeString.split(':').map(Number);
      const [shOut, smOut] = scheduledEnd.split(':').map(Number);
      const earlyDiff = (shOut * 60 + smOut) - (hOut * 60 + mOut);
      
      if (earlyDiff > 0) {
        const earlyNote = `Salida anticipada (${earlyDiff} min)`;
        notes = notes ? `${notes} | ${earlyNote}` : earlyNote;
      }

      await updateAttendanceClockOut(existingRecord.id, timeString, notes);
      return NextResponse.json({ success: true }, { status: 200 });
    }

    return NextResponse.json({ error: 'Tipo de marcación inválido' }, { status: 400 });

  } catch (error) {
    const message = error instanceof Error ? error.message : 'Error inesperado';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

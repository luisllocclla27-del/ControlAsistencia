import { NextResponse } from 'next/server';
import { createAttendanceRecord, listAttendanceRecords } from '@/lib/attendance-repository';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const employeeId = searchParams.get('employeeId') || undefined;
    const records = await listAttendanceRecords(employeeId);
    return NextResponse.json(records);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unexpected error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      employeeId?: string;
      workDate?: string;
      scheduledStart?: string;
      clockIn?: string;
      clockOut?: string;
      shiftId?: string;
      notes?: string;
    };

    if (!body.employeeId || !body.workDate || !body.scheduledStart || !body.clockIn) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const record = await createAttendanceRecord({
      employeeId: body.employeeId,
      workDate: body.workDate,
      scheduledStart: body.scheduledStart,
      clockIn: body.clockIn,
      clockOut: body.clockOut,
      shiftId: body.shiftId,
      notes: body.notes
    });

    return NextResponse.json(record, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unexpected error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

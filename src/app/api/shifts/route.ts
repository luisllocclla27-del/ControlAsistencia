import { NextResponse } from 'next/server';
import { createShift, listShifts } from '@/lib/shift-repository';

export async function GET() {
  try {
    const shifts = await listShifts();
    return NextResponse.json(shifts);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unexpected error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      name?: string;
      startTime?: string;
      endTime?: string;
      toleranceMinutes?: number;
    };

    if (!body.name || !body.startTime || !body.endTime || typeof body.toleranceMinutes !== 'number') {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const shift = await createShift({
      name: body.name,
      startTime: body.startTime,
      endTime: body.endTime,
      toleranceMinutes: body.toleranceMinutes
    });

    return NextResponse.json(shift, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unexpected error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

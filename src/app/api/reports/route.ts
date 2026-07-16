import { NextResponse } from 'next/server';
import { fetchAttendanceSummary } from '@/lib/attendance-repository';

export async function GET() {
  try {
    const summary = await fetchAttendanceSummary();
    return NextResponse.json(summary);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unexpected error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

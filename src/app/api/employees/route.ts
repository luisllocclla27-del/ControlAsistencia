import { NextResponse } from 'next/server';
import { createEmployee, listEmployees } from '@/lib/employee-repository';

export async function GET() {
  try {
    const employees = await listEmployees();
    return NextResponse.json(employees);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unexpected error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      employeeCode?: string;
      fullName?: string;
      email?: string;
    };

    if (!body.employeeCode || !body.fullName || !body.email) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const employee = await createEmployee({
      employeeCode: body.employeeCode,
      fullName: body.fullName,
      email: body.email
    });

    return NextResponse.json(employee, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unexpected error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

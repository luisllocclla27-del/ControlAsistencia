import { NextResponse } from 'next/server';
import { createRole, listRoles } from '@/lib/role-repository';

export async function GET() {
  try {
    const roles = await listRoles();
    return NextResponse.json(roles);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unexpected error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { name?: string };

    if (!body.name) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const role = await createRole({ name: body.name });
    return NextResponse.json(role, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unexpected error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

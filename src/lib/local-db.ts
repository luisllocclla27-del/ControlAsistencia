import { promises as fs } from 'node:fs';
import path from 'node:path';

export interface LocalEmployee {
  id: string;
  employeeCode: string;
  fullName: string;
  email: string;
  active: boolean;
}

export interface LocalShift {
  id: string;
  name: string;
  startTime: string;
  endTime: string;
  toleranceMinutes: number;
}

export interface LocalRole {
  id: string;
  name: string;
}

export interface LocalAttendanceRecord {
  id: string;
  employeeId: string;
  workDate: string;
  scheduledStart: string;
  clockIn: string;
  clockOut: string | null;
  tardinessMinutes: number;
  notes: string | null;
  shiftId: string | null;
}

export interface LocalDatabase {
  employees: LocalEmployee[];
  shifts: LocalShift[];
  roles: LocalRole[];
  attendanceRecords: LocalAttendanceRecord[];
}

const dataDir = path.join(process.cwd(), '.data');
const dataFile = path.join(dataDir, 'control-asistencia.json');

const seedData: LocalDatabase = {
  roles: [
    { id: 'role-admin', name: 'Administrador' },
    { id: 'role-supervisor', name: 'Supervisor' }
  ],
  employees: [
    { id: 'emp-001', employeeCode: 'EMP-001', fullName: 'Ana Perez', email: 'ana.perez@empresa.com', active: true },
    { id: 'emp-002', employeeCode: 'EMP-002', fullName: 'Luis Gomez', email: 'luis.gomez@empresa.com', active: true },
    { id: 'emp-003', employeeCode: 'EMP-003', fullName: 'Maria Torres', email: 'maria.torres@empresa.com', active: true }
  ],
  shifts: [
    { id: 'shift-morning', name: 'Turno mañana', startTime: '08:00', endTime: '17:00', toleranceMinutes: 10 },
    { id: 'shift-afternoon', name: 'Turno tarde', startTime: '13:00', endTime: '22:00', toleranceMinutes: 10 }
  ],
  attendanceRecords: [
    {
      id: 'att-001',
      employeeId: 'emp-001',
      workDate: '2026-07-15',
      scheduledStart: '08:00',
      clockIn: '08:00',
      clockOut: '17:00',
      tardinessMinutes: 0,
      notes: 'Ingreso puntual',
      shiftId: 'shift-morning'
    },
    {
      id: 'att-002',
      employeeId: 'emp-002',
      workDate: '2026-07-15',
      scheduledStart: '08:00',
      clockIn: '08:12',
      clockOut: '17:02',
      tardinessMinutes: 12,
      notes: 'Llego con retraso',
      shiftId: 'shift-morning'
    },
    {
      id: 'att-003',
      employeeId: 'emp-003',
      workDate: '2026-07-15',
      scheduledStart: '13:00',
      clockIn: '13:00',
      clockOut: '22:00',
      tardinessMinutes: 0,
      notes: 'Turno normal',
      shiftId: 'shift-afternoon'
    }
  ]
};

async function ensureFile(): Promise<void> {
  await fs.mkdir(dataDir, { recursive: true });

  try {
    await fs.access(dataFile);
  } catch {
    await fs.writeFile(dataFile, JSON.stringify(seedData, null, 2), 'utf8');
  }
}

export async function loadLocalDatabase(): Promise<LocalDatabase> {
  await ensureFile();
  const content = await fs.readFile(dataFile, 'utf8');
  return JSON.parse(content) as LocalDatabase;
}

export async function saveLocalDatabase(database: LocalDatabase): Promise<void> {
  await fs.mkdir(dataDir, { recursive: true });
  await fs.writeFile(dataFile, JSON.stringify(database, null, 2), 'utf8');
}

export function generateLocalId(prefix: string): string {
  return `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2, 8)}`;
}

export function isSupabaseConfigured(): boolean {
  return Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
}

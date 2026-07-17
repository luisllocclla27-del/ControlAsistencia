import { EmployeeForm } from '@/components/employee-form';
import { AttendanceForm } from '@/components/attendance-form';
import { ShiftForm } from '@/components/shift-form';
import { RoleForm } from '@/components/role-form';
import { ReportSummary } from '@/components/report-summary';
import { ResourceList } from '@/components/resource-list';
import { fetchAttendanceSummary, listAttendanceRecords } from '@/lib/attendance-repository';
import { listEmployees } from '@/lib/employee-repository';
import { listRoles } from '@/lib/role-repository';
import { listShifts } from '@/lib/shift-repository';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const [employees, shifts, roles, attendanceRecords, attendanceSummary] = await Promise.all([
    listEmployees(),
    listShifts(),
    listRoles(),
    listAttendanceRecords(),
    fetchAttendanceSummary()
  ]);

  const stats = [
    { value: employees.length, label: 'empleados registrados' },
    { value: shifts.length, label: 'turnos configurados' },
    { value: attendanceRecords.length, label: 'asistencias cargadas' },
    { value: attendanceSummary.lateRecords, label: 'tardanzas detectadas' }
  ];

  return (
    <main className="page-shell">
      <section className="hero-card">
        <div className="eyebrow">Panel operativo</div>
        <h1>Control de asistencia y retardos</h1>
        <p className="hero-copy">
          Registra empleados, turnos, asistencia y roles. Las listas se cargan desde la base de datos o desde el respaldo local para que la demo funcione siempre.
        </p>

        <div className="metric-grid">
          {stats.map((stat) => (
            <article key={stat.label} className="metric-card">
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </article>
          ))}
        </div>
      </section>

      <section className="content-grid" style={{ marginTop: '18px' }}>
        <article className="panel">
          <h2>Resumen actual</h2>
          <ul>
            <li>Registros totales: {attendanceSummary.totalRecords}</li>
            <li>Registros puntuales: {attendanceSummary.onTimeRecords}</li>
            <li>Registros tardios: {attendanceSummary.lateRecords}</li>
            <li>Minutos acumulados de tardanza: {attendanceSummary.totalTardinessMinutes}</li>
          </ul>
        </article>

        <article className="panel accent">
          <h2>Uso rapido</h2>
          <ol>
            <li>Registra empleados y turnos.</li>
            <li>Captura la asistencia diaria.</li>
            <li>Consulta los listados y filtros.</li>
            <li>Revisa el resumen de reportes.</li>
          </ol>
        </article>
      </section>

      <section className="content-grid" style={{ marginTop: '18px' }}>
        <article className="panel">
          <h2>Registrar empleado</h2>
          <EmployeeForm />
        </article>

        <article className="panel">
          <h2>Registrar asistencia</h2>
          <AttendanceForm />
        </article>
      </section>

      <section className="content-grid" style={{ marginTop: '18px' }}>
        <article className="panel">
          <h2>Crear turno</h2>
          <ShiftForm />
        </article>

        <article className="panel">
          <h2>Crear rol</h2>
          <RoleForm />
        </article>
      </section>

      <section className="panel" style={{ marginTop: '18px' }}>
        <ReportSummary />
      </section>

      <section className="content-grid" style={{ marginTop: '18px' }}>
        <ResourceList
          title="Empleados"
          description="Listado con filtro de los empleados guardados."
          endpoint="/api/employees"
          primaryField="fullName"
          secondaryFields={['employeeCode', 'email']}
        />

        <ResourceList
          title="Turnos"
          description="Horarios disponibles para calcular asistencia."
          endpoint="/api/shifts"
          primaryField="name"
          secondaryFields={['startTime', 'endTime', 'toleranceMinutes']}
        />
      </section>

      <section className="content-grid" style={{ marginTop: '18px' }}>
        <ResourceList
          title="Asistencias"
          description="Registros historicos de entrada y tardanza."
          endpoint="/api/attendance"
          primaryField="workDate"
          secondaryFields={['clockIn', 'clockOut', 'tardinessMinutes']}
        />

        <ResourceList
          title="Roles"
          description="Roles disponibles para acceso al sistema."
          endpoint="/api/roles"
          primaryField="name"
        />
      </section>
    </main>
  );
}

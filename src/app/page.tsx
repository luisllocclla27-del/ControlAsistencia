import { buildAttendanceSummary } from '@/lib/report';
import { EmployeeForm } from '@/components/employee-form';
import { ReportSummary } from '@/components/report-summary';
import { AttendanceForm } from '@/components/attendance-form';
import { ShiftForm } from '@/components/shift-form';
import { RoleForm } from '@/components/role-form';
import { ResourceList } from '@/components/resource-list';

const metrics = [
  { value: '4', label: 'sprints planificados' },
  { value: '6', label: 'modulos iniciales' },
  { value: '1', label: 'base de datos central' },
  { value: '2', label: 'tipos de pruebas' }
];

const milestones = [
  'Analisis del problema y requisitos',
  'Diseno de base de datos y trazabilidad',
  'Implementacion del MVP',
  'Pruebas y despliegue'
];

const modules = [
  'Administracion de empleados',
  'Gestion de turnos',
  'Registro de asistencia',
  'Calculo de tardanzas',
  'Reportes basicos',
  'Autenticacion y roles'
];

const sampleSummary = buildAttendanceSummary([
  { employeeId: 'EMP-001', workDate: '2026-07-15', tardinessMinutes: 0, clockIn: '08:00' },
  { employeeId: 'EMP-002', workDate: '2026-07-15', tardinessMinutes: 9, clockIn: '08:09' },
  { employeeId: 'EMP-003', workDate: '2026-07-15', tardinessMinutes: 0, clockIn: '07:58' }
]);

export default function HomePage() {
  return (
    <main className="page-shell">
      <section className="hero-card">
        <div className="eyebrow">Proyecto final de calidad de software</div>
        <h1>Sistema de control de asistencia y retardos para empleados</h1>
        <p className="hero-copy">
          Una aplicacion web con base de datos, documentacion en Markdown, pruebas automatizadas y despliegue en Vercel para demostrar SDD y Scrum de forma completa.
        </p>

        <div className="metric-grid">
          {metrics.map((metric) => (
            <article key={metric.label} className="metric-card">
              <strong>{metric.value}</strong>
              <span>{metric.label}</span>
            </article>
          ))}
        </div>
      </section>

      <section className="content-grid">
        <article className="panel">
          <h2>Alcance inicial</h2>
          <ul>
            <li>Registro de empleados y turnos.</li>
            <li>Captura de entradas, salidas y tardanzas.</li>
            <li>Consultas por empleado y reportes basicos.</li>
            <li>Persistencia en Supabase PostgreSQL.</li>
          </ul>
        </article>

        <article className="panel accent">
          <h2>Hitos del desarrollo</h2>
          <ol>
            {milestones.map((milestone) => (
              <li key={milestone}>{milestone}</li>
            ))}
          </ol>
        </article>
      </section>

      <section className="panel" style={{ marginTop: '18px' }}>
        <h2>Modulos del MVP</h2>
        <ul>
          {modules.map((module) => (
            <li key={module}>{module}</li>
          ))}
        </ul>
      </section>

      <section className="content-grid" style={{ marginTop: '18px' }}>
        <article className="panel">
          <h2>Resumen de asistencia de ejemplo</h2>
          <ul>
            <li>Registros totales: {sampleSummary.totalRecords}</li>
            <li>Registros tardios: {sampleSummary.lateRecords}</li>
            <li>Registros puntuales: {sampleSummary.onTimeRecords}</li>
            <li>Minutos totales de tardanza: {sampleSummary.totalTardinessMinutes}</li>
          </ul>
        </article>

        <article className="panel accent">
          <h2>Evidencia academica</h2>
          <ul>
            <li>Documentacion en Markdown por seccion.</li>
            <li>Base de datos disenada desde requisitos.</li>
            <li>Pruebas unitarias e integracion planificadas.</li>
            <li>Despliegue en Vercel con Supabase.</li>
          </ul>
        </article>
      </section>

      <section className="panel" style={{ marginTop: '18px' }}>
        <h2>Registro rapido de empleados</h2>
        <p className="hero-copy" style={{ marginTop: '8px' }}>
          Este formulario conecta con la ruta <code>/api/employees</code> para preparar el flujo de registro del MVP.
        </p>
        <EmployeeForm />
      </section>

      <section className="panel" style={{ marginTop: '18px' }}>
        <h2>Registro de asistencia</h2>
        <p className="hero-copy" style={{ marginTop: '8px' }}>
          Este formulario conecta con la ruta <code>/api/attendance</code> y calcula la tardanza segun la hora programada.
        </p>
        <AttendanceForm />
      </section>

      <section className="panel" style={{ marginTop: '18px' }}>
        <h2>Gestion de turnos</h2>
        <p className="hero-copy" style={{ marginTop: '8px' }}>
          Este formulario conecta con la ruta <code>/api/shifts</code> para definir horarios y tolerancias.
        </p>
        <ShiftForm />
      </section>

      <section className="panel" style={{ marginTop: '18px' }}>
        <h2>Gestion de roles</h2>
        <p className="hero-copy" style={{ marginTop: '8px' }}>
          Este formulario conecta con la ruta <code>/api/roles</code> para organizar el acceso al sistema.
        </p>
        <RoleForm />
      </section>

      <ReportSummary />

      <section className="content-grid" style={{ marginTop: '18px' }}>
        <ResourceList
          title="Empleados registrados"
          description="Consulta rapida de los empleados guardados en la base de datos."
          endpoint="/api/employees"
          renderItem={(item) => (
            <>
              <strong>{String(item.fullName ?? 'Sin nombre')}</strong> - {String(item.employeeCode ?? 'sin codigo')}
            </>
          )}
        />

        <ResourceList
          title="Turnos definidos"
          description="Horarios disponibles para asociar asistencia y calcular tardanzas."
          endpoint="/api/shifts"
          renderItem={(item) => (
            <>
              <strong>{String(item.name ?? 'Sin nombre')}</strong> - {String(item.startTime ?? '--:--')} a {String(item.endTime ?? '--:--')}
            </>
          )}
        />
      </section>

      <section className="content-grid" style={{ marginTop: '18px' }}>
        <ResourceList
          title="Asistencias registradas"
          description="Registros historicos de entrada, salida y tardanza."
          endpoint="/api/attendance"
          renderItem={(item) => (
            <>
              <strong>{String(item.workDate ?? 'sin fecha')}</strong> - {String(item.clockIn ?? '--:--')} / tardanza {String(item.tardinessMinutes ?? 0)} min
            </>
          )}
        />

        <ResourceList
          title="Roles creados"
          description="Permite verificar la estructura de acceso del sistema."
          endpoint="/api/roles"
          renderItem={(item) => <strong>{String(item.name ?? 'Sin nombre')}</strong>}
        />
      </section>
    </main>
  );
}

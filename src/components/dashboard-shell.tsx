'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

/* ===== SVG Icons ===== */
const icons = {
  chart: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 3v18h18" /><path d="M7 16l4-8 4 4 6-6" />
    </svg>
  ),
  users: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 00-3-3.87" /><path d="M16 3.13a4 4 0 010 7.75" />
    </svg>
  ),
  calendar: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4" /><path d="M8 2v4" /><path d="M3 10h18" />
    </svg>
  ),
  clock: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" />
    </svg>
  ),
  key: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 11-7.778 7.778 5.5 5.5 0 017.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4" />
    </svg>
  ),
  barChart: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="12" width="4" height="8" rx="1" /><rect x="10" y="8" width="4" height="12" rx="1" /><rect x="17" y="4" width="4" height="16" rx="1" />
    </svg>
  ),
  building: (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="2" width="16" height="20" rx="2" /><path d="M9 22v-4h6v4" /><path d="M8 6h.01" /><path d="M16 6h.01" /><path d="M12 6h.01" /><path d="M12 10h.01" /><path d="M12 14h.01" /><path d="M16 10h.01" /><path d="M16 14h.01" /><path d="M8 10h.01" /><path d="M8 14h.01" />
    </svg>
  ),
  menu: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 6h16" /><path d="M4 12h16" /><path d="M4 18h16" />
    </svg>
  ),
  timer: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" />
    </svg>
  ),
  alertTriangle: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" /><path d="M12 9v4" /><path d="M12 17h.01" />
    </svg>
  ),
} as const;

/* ===== Types ===== */
interface DashboardData {
  employeeCount: number;
  shiftCount: number;
  attendanceCount: number;
  lateCount: number;
  totalRecords: number;
  onTimeRecords: number;
  lateRecords: number;
  totalTardinessMinutes: number;
}

type TabId = 'dashboard' | 'employees' | 'attendance' | 'shifts' | 'roles' | 'reports';

interface TabDef {
  id: TabId;
  label: string;
  icon: React.ReactNode;
  section: 'principal' | 'registros' | 'sistema';
}

const TABS: TabDef[] = [
  { id: 'dashboard',  label: 'Dashboard',   icon: icons.chart,    section: 'principal' },
  { id: 'employees',  label: 'Empleados',   icon: icons.users,    section: 'registros' },
  { id: 'attendance', label: 'Asistencia',  icon: icons.calendar, section: 'registros' },
  { id: 'shifts',     label: 'Turnos',      icon: icons.clock,    section: 'registros' },
  { id: 'roles',      label: 'Roles',       icon: icons.key,      section: 'sistema' },
  { id: 'reports',    label: 'Reportes',    icon: icons.barChart, section: 'sistema' },
];

const TAB_TITLES: Record<TabId, string> = {
  dashboard:  'Dashboard',
  employees:  'Gestion de Empleados',
  attendance: 'Registro de Asistencia',
  shifts:     'Turnos de Trabajo',
  roles:      'Roles del Sistema',
  reports:    'Reportes y Estadisticas',
};

/* ===== Sub-components ===== */
import { EmployeeForm } from './employee-form';
import { AttendanceForm } from './attendance-form';
import { ShiftForm } from './shift-form';
import { RoleForm } from './role-form';
import { ReportSummary } from './report-summary';
import { ResourceList } from './resource-list';

/* ===== Clock Hook ===== */
function useClock() {
  const [now, setNow] = useState('');
  useEffect(() => {
    function tick() {
      setNow(
        new Date().toLocaleString('es-PE', {
          weekday: 'long',
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        })
      );
    }
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return now;
}

/* ===== Main Shell ===== */
export function DashboardShell({ data }: { data: DashboardData }) {
  const [activeTab, setActiveTab] = useState<TabId>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sectionKey, setSectionKey] = useState(0);
  const clock = useClock();
  const router = useRouter();

  useEffect(() => {
    const role = localStorage.getItem('userRole');
    if (role !== 'admin') {
      router.push('/login');
    }
  }, [router]);

  function navigate(tab: TabId) {
    setActiveTab(tab);
    setSectionKey((k) => k + 1);
    setSidebarOpen(false);
  }

  const pctOnTime =
    data.totalRecords > 0
      ? Math.round((data.onTimeRecords / data.totalRecords) * 100)
      : 100;

  return (
    <div className="app-layout">
      {/* Mobile overlay */}
      <div
        className={`sidebar-overlay${sidebarOpen ? ' visible' : ''}`}
        onClick={() => setSidebarOpen(false)}
      />

      {/* Mobile burger */}
      <button
        className="mobile-menu-btn"
        onClick={() => setSidebarOpen(!sidebarOpen)}
        aria-label="Abrir menu"
      >
        {icons.menu}
      </button>

      {/* Sidebar */}
      <aside className={`sidebar${sidebarOpen ? ' open' : ''}`}>
        <div className="sidebar-brand">
          <h2>
            <span className="brand-icon">{icons.timer}</span>
            <div>
              AsistControl
              <span>Panel de gestion</span>
            </div>
          </h2>
        </div>

        <nav className="sidebar-nav">
          <div className="sidebar-section-label">Principal</div>
          {TABS.filter((t) => t.section === 'principal').map((tab) => (
            <button
              key={tab.id}
              className={`nav-item${activeTab === tab.id ? ' active' : ''}`}
              onClick={() => navigate(tab.id)}
            >
              <span className="nav-icon">{tab.icon}</span>
              {tab.label}
            </button>
          ))}

          <div className="sidebar-section-label">Registros</div>
          {TABS.filter((t) => t.section === 'registros').map((tab) => (
            <button
              key={tab.id}
              className={`nav-item${activeTab === tab.id ? ' active' : ''}`}
              onClick={() => navigate(tab.id)}
            >
              <span className="nav-icon">{tab.icon}</span>
              {tab.label}
            </button>
          ))}

          <div className="sidebar-section-label">Sistema</div>
          {TABS.filter((t) => t.section === 'sistema').map((tab) => (
            <button
              key={tab.id}
              className={`nav-item${activeTab === tab.id ? ' active' : ''}`}
              onClick={() => navigate(tab.id)}
            >
              <span className="nav-icon">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </nav>

        <div className="sidebar-footer" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <button 
            onClick={() => { localStorage.removeItem('userRole'); router.push('/login'); }} 
            style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', padding: 0 }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><path d="M16 17l5-5-5-5"/><path d="M21 12H9"/></svg>
            Cerrar Sesión
          </button>
          <span style={{ fontSize: '0.75rem' }}>v1.0.0 — Proyecto Calidad de Software</span>
        </div>
      </aside>

      {/* Main content */}
      <div className="main-content">
        <header className="content-header">
          <h1>{TAB_TITLES[activeTab]}</h1>
          <div className="header-clock">{clock}</div>
        </header>

        <div className="content-body">
          <div key={sectionKey} className="section-enter">
            {/* ===== DASHBOARD ===== */}
            {activeTab === 'dashboard' && (
              <>
                <div className="metrics-row">
                  <article className="metric-card">
                    <div className="metric-icon blue">{icons.users}</div>
                    <strong>{data.employeeCount}</strong>
                    <span className="metric-label">Empleados</span>
                  </article>
                  <article className="metric-card">
                    <div className="metric-icon green">{icons.clock}</div>
                    <strong>{data.shiftCount}</strong>
                    <span className="metric-label">Turnos</span>
                  </article>
                  <article className="metric-card">
                    <div className="metric-icon amber">{icons.calendar}</div>
                    <strong>{data.attendanceCount}</strong>
                    <span className="metric-label">Asistencias</span>
                  </article>
                  <article className="metric-card">
                    <div className="metric-icon red">{icons.alertTriangle}</div>
                    <strong>{data.lateCount}</strong>
                    <span className="metric-label">Tardanzas</span>
                  </article>
                </div>

                <div className="quick-guide">
                  <h2>Uso rapido</h2>
                  <div className="quick-guide-steps">
                    <div className="quick-step">
                      <span className="quick-step-num">1</span>
                      <span>Registra empleados y turnos de trabajo.</span>
                    </div>
                    <div className="quick-step">
                      <span className="quick-step-num">2</span>
                      <span>Captura la asistencia diaria de cada empleado.</span>
                    </div>
                    <div className="quick-step">
                      <span className="quick-step-num">3</span>
                      <span>Consulta listados y aplica filtros.</span>
                    </div>
                    <div className="quick-step">
                      <span className="quick-step-num">4</span>
                      <span>Revisa reportes de puntualidad y tardanza.</span>
                    </div>
                  </div>
                </div>

                <div className="content-grid">
                  <div className="panel">
                    <div className="panel-header">
                      <div>
                        <h2>Resumen actual</h2>
                        <p className="panel-description">Datos cargados en el sistema</p>
                      </div>
                    </div>
                    <div className="report-grid">
                      <div className="report-card">
                        <span className="report-label">Registros totales</span>
                        <div className="report-value text-blue">{data.totalRecords}</div>
                      </div>
                      <div className="report-card">
                        <span className="report-label">Puntuales</span>
                        <div className="report-value text-green">{data.onTimeRecords}</div>
                      </div>
                      <div className="report-card">
                        <span className="report-label">Tardios</span>
                        <div className="report-value text-red">{data.lateRecords}</div>
                      </div>
                      <div className="report-card">
                        <span className="report-label">Min. de tardanza</span>
                        <div className="report-value text-amber">{data.totalTardinessMinutes}</div>
                      </div>
                    </div>

                    <div className="progress-section">
                      <h3>Tasa de puntualidad</h3>
                      <div className="progress-bar-wrapper">
                        <div
                          className="progress-bar-fill"
                          style={{ width: `${pctOnTime}%` }}
                        />
                      </div>
                      <div className="progress-labels">
                        <span>{pctOnTime}% puntual</span>
                        <span>{100 - pctOnTime}% tardanza</span>
                      </div>
                    </div>
                  </div>

                  <div className="panel" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', gap: 12, minHeight: 200 }}>
                    <div style={{ color: 'var(--text-muted)' }}>{icons.building}</div>
                    <h2>Control de Asistencia</h2>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', maxWidth: '36ch' }}>
                      Registra empleados, turnos y asistencia. El sistema calcula automaticamente las tardanzas.
                    </p>
                  </div>
                </div>
              </>
            )}

            {/* ===== EMPLOYEES ===== */}
            {activeTab === 'employees' && (
              <div className="content-grid">
                <div className="panel">
                  <div className="panel-header">
                    <div>
                      <h2>Registrar empleado</h2>
                      <p className="panel-description">Completa los campos para agregar un nuevo empleado</p>
                    </div>
                  </div>
                  <EmployeeForm />
                </div>
                <ResourceList
                  title="Empleados registrados"
                  description="Listado con filtro de los empleados guardados."
                  endpoint="/api/employees"
                  primaryField="fullName"
                  secondaryFields={['employeeCode', 'email']}
                />
              </div>
            )}

            {/* ===== ATTENDANCE ===== */}
            {activeTab === 'attendance' && (
              <div className="content-grid">
                <div className="panel">
                  <div className="panel-header">
                    <div>
                      <h2>Registrar asistencia</h2>
                      <p className="panel-description">Captura la entrada y salida del empleado</p>
                    </div>
                  </div>
                  <AttendanceForm />
                </div>
                <ResourceList
                  title="Historial de asistencia"
                  description="Registros historicos de entrada y tardanza."
                  endpoint="/api/attendance"
                  primaryField="workDate"
                  secondaryFields={['clockIn', 'clockOut', 'tardinessMinutes']}
                />
              </div>
            )}

            {/* ===== SHIFTS ===== */}
            {activeTab === 'shifts' && (
              <div className="content-grid">
                <div className="panel">
                  <div className="panel-header">
                    <div>
                      <h2>Crear turno</h2>
                      <p className="panel-description">Define el horario y la tolerancia</p>
                    </div>
                  </div>
                  <ShiftForm />
                </div>
                <ResourceList
                  title="Turnos configurados"
                  description="Horarios disponibles para calcular asistencia."
                  endpoint="/api/shifts"
                  primaryField="name"
                  secondaryFields={['startTime', 'endTime', 'toleranceMinutes']}
                />
              </div>
            )}

            {/* ===== ROLES ===== */}
            {activeTab === 'roles' && (
              <div className="content-grid">
                <div className="panel">
                  <div className="panel-header">
                    <div>
                      <h2>Crear rol</h2>
                      <p className="panel-description">Agrega roles de acceso al sistema</p>
                    </div>
                  </div>
                  <RoleForm />
                </div>
                <ResourceList
                  title="Roles del sistema"
                  description="Roles disponibles para acceso al sistema."
                  endpoint="/api/roles"
                  primaryField="name"
                />
              </div>
            )}

            {/* ===== REPORTS ===== */}
            {activeTab === 'reports' && <ReportSummary />}
          </div>
        </div>
      </div>
    </div>
  );
}

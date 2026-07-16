insert into roles (id, name) values
  ('11111111-1111-1111-1111-111111111111', 'Administrador'),
  ('22222222-2222-2222-2222-222222222222', 'Supervisor')
on conflict (name) do nothing;

insert into employees (id, employee_code, full_name, email, active) values
  ('33333333-3333-3333-3333-333333333333', 'EMP-001', 'Ana Perez', 'ana.perez@empresa.com', true),
  ('44444444-4444-4444-4444-444444444444', 'EMP-002', 'Luis Gomez', 'luis.gomez@empresa.com', true),
  ('55555555-5555-5555-5555-555555555555', 'EMP-003', 'Maria Torres', 'maria.torres@empresa.com', true)
on conflict (employee_code) do nothing;

insert into shifts (id, name, start_time, end_time, tolerance_minutes) values
  ('66666666-6666-6666-6666-666666666666', 'Turno mañana', '08:00', '17:00', 10),
  ('77777777-7777-7777-7777-777777777777', 'Turno tarde', '13:00', '22:00', 10)
on conflict (name) do nothing;

insert into attendance_records (employee_id, shift_id, work_date, clock_in, clock_out, tardiness_minutes, notes) values
  ('33333333-3333-3333-3333-333333333333', '66666666-6666-6666-6666-666666666666', '2026-07-15', '08:00', '17:00', 0, 'Ingreso puntual'),
  ('44444444-4444-4444-4444-444444444444', '66666666-6666-6666-6666-666666666666', '2026-07-15', '08:12', '17:02', 12, 'Llego con retraso'),
  ('55555555-5555-5555-5555-555555555555', '77777777-7777-7777-7777-777777777777', '2026-07-15', '13:00', '22:00', 0, 'Turno normal')
on conflict (employee_id, work_date) do nothing;

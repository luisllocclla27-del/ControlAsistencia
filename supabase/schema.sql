create extension if not exists pgcrypto;

create table if not exists roles (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  created_at timestamptz not null default now()
);

create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null,
  role_id uuid references roles(id),
  created_at timestamptz not null default now()
);

create table if not exists employees (
  id uuid primary key default gen_random_uuid(),
  employee_code text not null unique,
  full_name text not null,
  email text not null unique,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists shifts (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  start_time time not null,
  end_time time not null,
  tolerance_minutes integer not null default 10,
  created_at timestamptz not null default now()
);

create table if not exists attendance_records (
  id uuid primary key default gen_random_uuid(),
  employee_id uuid not null references employees(id) on delete cascade,
  shift_id uuid references shifts(id),
  work_date date not null,
  clock_in timestamptz not null,
  clock_out timestamptz,
  tardiness_minutes integer not null default 0,
  notes text,
  created_at timestamptz not null default now(),
  unique (employee_id, work_date)
);

create table if not exists audit_logs (
  id uuid primary key default gen_random_uuid(),
  actor_id uuid references profiles(id),
  action text not null,
  details jsonb,
  created_at timestamptz not null default now()
);

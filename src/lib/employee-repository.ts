import { createSupabaseClient } from './supabase';

export interface EmployeeInput {
  employeeCode: string;
  fullName: string;
  email: string;
}

export interface EmployeeRecord extends EmployeeInput {
  id: string;
  active: boolean;
}

export async function listEmployees(): Promise<EmployeeRecord[]> {
  const supabase = createSupabaseClient();
  const { data, error } = await supabase.from('employees').select('id, employee_code, full_name, email, active').order('created_at', { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []).map((item) => ({
    id: item.id,
    employeeCode: item.employee_code,
    fullName: item.full_name,
    email: item.email,
    active: item.active
  }));
}

export async function createEmployee(input: EmployeeInput): Promise<EmployeeRecord> {
  const supabase = createSupabaseClient();
  const { data, error } = await supabase
    .from('employees')
    .insert({ employee_code: input.employeeCode, full_name: input.fullName, email: input.email })
    .select('id, employee_code, full_name, email, active')
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return {
    id: data.id,
    employeeCode: data.employee_code,
    fullName: data.full_name,
    email: data.email,
    active: data.active
  };
}

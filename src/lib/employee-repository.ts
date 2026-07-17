import { createSupabaseClient, hasSupabaseCredentials } from './supabase';
import { generateLocalId, loadLocalDatabase, saveLocalDatabase } from './local-db';

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
  if (!hasSupabaseCredentials()) {
    const database = await loadLocalDatabase();
    return database.employees.map((item) => ({
      id: item.id,
      employeeCode: item.employeeCode,
      fullName: item.fullName,
      email: item.email,
      active: item.active
    }));
  }

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
  if (!hasSupabaseCredentials()) {
    const database = await loadLocalDatabase();
    const record: EmployeeRecord = {
      id: generateLocalId('emp'),
      employeeCode: input.employeeCode,
      fullName: input.fullName,
      email: input.email,
      active: true
    };

    database.employees.unshift(record);
    await saveLocalDatabase(database);

    return record;
  }

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

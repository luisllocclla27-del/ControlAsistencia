import { describe, expect, it } from 'vitest';
import { calculateTardinessMinutes, calculateWorkedMinutes, classifyAttendance } from '../src/lib/attendance';

describe('attendance helpers', () => {
  it('returns zero tardiness when the employee arrives on time', () => {
    expect(calculateTardinessMinutes('08:00', '08:00')).toBe(0);
  });

  it('calculates tardiness in minutes', () => {
    expect(calculateTardinessMinutes('08:00', '08:17')).toBe(17);
  });

  it('classifies a punctual entry', () => {
    expect(classifyAttendance({ scheduledStart: '09:00', clockIn: '08:55' })).toBe('on_time');
  });

  it('calculates worked minutes between clock-in and clock-out', () => {
    expect(calculateWorkedMinutes('08:00', '16:30')).toBe(510);
  });

  it('does not return negative worked minutes when the clock-out is earlier', () => {
    expect(calculateWorkedMinutes('16:30', '08:00')).toBe(0);
  });

  it('classifies a late entry when the clock-in is after the schedule', () => {
    expect(classifyAttendance({ scheduledStart: '08:00', clockIn: '08:01' })).toBe('late');
  });
});

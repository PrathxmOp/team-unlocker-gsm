import { Database, LegalData, PaymentsData } from './types';

export async function fetchDatabase(): Promise<Database> {
  const response = await fetch('./db.json');
  if (!response.ok) {
    throw new Error('Failed to load database');
  }
  return await response.json();
}

export async function fetchLegalData(): Promise<LegalData> {
  const response = await fetch('./legal.json');
  if (!response.ok) {
    throw new Error('Failed to load legal data');
  }
  return await response.json();
}

export async function fetchPaymentMethods(): Promise<PaymentsData> {
  const response = await fetch('./paymentMethods.json');
  if (!response.ok) {
    throw new Error('Failed to load payment methods');
  }
  return await response.json();
}
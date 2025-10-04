export type ExpenseStatus = 'draft' | 'pending' | 'approved' | 'rejected';

export type ExpenseCategory = 
  | 'meals'
  | 'transport'
  | 'accommodation'
  | 'office'
  | 'entertainment'
  | 'other';

export interface Expense {
  id: string;
  description: string;
  amount: number;
  currency: string;
  category: ExpenseCategory;
  date: string;
  vendor: string;
  remarks?: string;
  status: ExpenseStatus;
  receiptUrl?: string;
  submittedAt?: string;
  approvedAt?: string;
}

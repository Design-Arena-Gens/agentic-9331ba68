export type ExpenseCategory =
  | 'materials'
  | 'labor'
  | 'equipment'
  | 'permits'
  | 'subcontractors'
  | 'utilities'
  | 'transportation'
  | 'other';

export interface Expense {
  id: string;
  date: string;
  category: ExpenseCategory;
  description: string;
  amount: number;
  vendor?: string;
  projectPhase?: string;
  notes?: string;
}

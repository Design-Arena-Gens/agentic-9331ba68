'use client';

import { Expense, ExpenseCategory } from '@/types/expense';

interface ExpenseSummaryProps {
  expenses: Expense[];
}

const categoryEmojis: Record<ExpenseCategory, string> = {
  materials: '🧱',
  labor: '👷',
  equipment: '🔨',
  permits: '📋',
  subcontractors: '👥',
  utilities: '⚡',
  transportation: '🚚',
  other: '📦',
};

const categoryLabels: Record<ExpenseCategory, string> = {
  materials: 'Materials',
  labor: 'Labor',
  equipment: 'Equipment',
  permits: 'Permits',
  subcontractors: 'Subcontractors',
  utilities: 'Utilities',
  transportation: 'Transportation',
  other: 'Other',
};

export function ExpenseSummary({ expenses }: ExpenseSummaryProps) {
  const total = expenses.reduce((sum, exp) => sum + exp.amount, 0);

  const categoryTotals = expenses.reduce((acc, exp) => {
    acc[exp.category] = (acc[exp.category] || 0) + exp.amount;
    return acc;
  }, {} as Record<ExpenseCategory, number>);

  const sortedCategories = Object.entries(categoryTotals)
    .sort(([, a], [, b]) => b - a);

  return (
    <div className="bg-slate-800 rounded-lg shadow-xl p-6 border border-slate-700">
      <h2 className="text-2xl font-bold text-white mb-4">💰 Summary</h2>

      <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-lg p-4 mb-6">
        <p className="text-green-100 text-sm font-medium mb-1">Total Expenses</p>
        <p className="text-3xl font-bold text-white">${total.toFixed(2)}</p>
      </div>

      {sortedCategories.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-slate-300 mb-2">By Category</h3>
          {sortedCategories.map(([category, amount]) => {
            const percentage = total > 0 ? (amount / total) * 100 : 0;
            return (
              <div key={category} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-300">
                    {categoryEmojis[category as ExpenseCategory]}{' '}
                    {categoryLabels[category as ExpenseCategory]}
                  </span>
                  <span className="text-white font-semibold">
                    ${amount.toFixed(2)}
                  </span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full transition-all"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <p className="text-xs text-slate-500 text-right">
                  {percentage.toFixed(1)}%
                </p>
              </div>
            );
          })}
        </div>
      )}

      <div className="mt-6 pt-4 border-t border-slate-700">
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <p className="text-slate-400 text-xs mb-1">Total Entries</p>
            <p className="text-xl font-bold text-white">{expenses.length}</p>
          </div>
          <div>
            <p className="text-slate-400 text-xs mb-1">Avg. Expense</p>
            <p className="text-xl font-bold text-white">
              ${expenses.length > 0 ? (total / expenses.length).toFixed(2) : '0.00'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

'use client';

import { useState } from 'react';
import { Expense, ExpenseCategory } from '@/types/expense';

interface ExpenseListProps {
  expenses: Expense[];
  onDelete: (id: string) => void;
  onEdit: (expense: Expense) => void;
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

export function ExpenseList({ expenses, onDelete, onEdit }: ExpenseListProps) {
  const [filterCategory, setFilterCategory] = useState<ExpenseCategory | 'all'>('all');
  const [sortBy, setSortBy] = useState<'date' | 'amount'>('date');

  const filteredExpenses = expenses.filter(
    exp => filterCategory === 'all' || exp.category === filterCategory
  );

  const sortedExpenses = [...filteredExpenses].sort((a, b) => {
    if (sortBy === 'date') {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    }
    return b.amount - a.amount;
  });

  return (
    <div className="bg-slate-800 rounded-lg shadow-xl p-6 border border-slate-700">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h2 className="text-2xl font-bold text-white">📊 Expense Records</h2>
        <div className="flex gap-2 flex-wrap">
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value as ExpenseCategory | 'all')}
            className="px-3 py-1.5 bg-slate-700 border border-slate-600 rounded-md text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Categories</option>
            {Object.entries(categoryLabels).map(([key, label]) => (
              <option key={key} value={key}>
                {categoryEmojis[key as ExpenseCategory]} {label}
              </option>
            ))}
          </select>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'date' | 'amount')}
            className="px-3 py-1.5 bg-slate-700 border border-slate-600 rounded-md text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="date">Sort by Date</option>
            <option value="amount">Sort by Amount</option>
          </select>
        </div>
      </div>

      {sortedExpenses.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-slate-400 text-lg">No expenses recorded yet</p>
          <p className="text-slate-500 text-sm mt-2">Add your first expense to get started</p>
        </div>
      ) : (
        <div className="space-y-3">
          {sortedExpenses.map((expense) => (
            <div
              key={expense.id}
              className="bg-slate-700 rounded-lg p-4 border border-slate-600 hover:border-slate-500 transition-colors"
            >
              <div className="flex justify-between items-start gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">{categoryEmojis[expense.category]}</span>
                    <div>
                      <h3 className="text-white font-semibold">{expense.description}</h3>
                      <p className="text-slate-400 text-sm">
                        {categoryLabels[expense.category]}
                        {expense.projectPhase && ` • ${expense.projectPhase}`}
                      </p>
                    </div>
                  </div>
                  <div className="text-sm text-slate-400 space-y-1">
                    <p>📅 {new Date(expense.date).toLocaleDateString()}</p>
                    {expense.vendor && <p>🏪 {expense.vendor}</p>}
                    {expense.notes && <p className="text-slate-500 italic">💭 {expense.notes}</p>}
                  </div>
                </div>
                <div className="text-right flex flex-col items-end gap-2">
                  <p className="text-2xl font-bold text-green-400">
                    ${expense.amount.toFixed(2)}
                  </p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => onEdit(expense)}
                      className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        if (confirm('Are you sure you want to delete this expense?')) {
                          onDelete(expense.id);
                        }
                      }}
                      className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white text-sm rounded transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

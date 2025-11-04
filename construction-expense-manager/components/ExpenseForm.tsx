'use client';

import { useState, useEffect } from 'react';
import { Expense, ExpenseCategory } from '@/types/expense';

interface ExpenseFormProps {
  onSubmit: (expense: Omit<Expense, 'id'>) => void;
  editingExpense?: Expense | null;
  onCancel?: () => void;
}

const categories: { value: ExpenseCategory; label: string; emoji: string }[] = [
  { value: 'materials', label: 'Materials', emoji: '🧱' },
  { value: 'labor', label: 'Labor', emoji: '👷' },
  { value: 'equipment', label: 'Equipment', emoji: '🔨' },
  { value: 'permits', label: 'Permits', emoji: '📋' },
  { value: 'subcontractors', label: 'Subcontractors', emoji: '👥' },
  { value: 'utilities', label: 'Utilities', emoji: '⚡' },
  { value: 'transportation', label: 'Transportation', emoji: '🚚' },
  { value: 'other', label: 'Other', emoji: '📦' },
];

export function ExpenseForm({ onSubmit, editingExpense, onCancel }: ExpenseFormProps) {
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    category: 'materials' as ExpenseCategory,
    description: '',
    amount: '',
    vendor: '',
    projectPhase: '',
    notes: '',
  });

  useEffect(() => {
    if (editingExpense) {
      setFormData({
        date: editingExpense.date,
        category: editingExpense.category,
        description: editingExpense.description,
        amount: editingExpense.amount.toString(),
        vendor: editingExpense.vendor || '',
        projectPhase: editingExpense.projectPhase || '',
        notes: editingExpense.notes || '',
      });
    }
  }, [editingExpense]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      date: formData.date,
      category: formData.category,
      description: formData.description,
      amount: parseFloat(formData.amount),
      vendor: formData.vendor || undefined,
      projectPhase: formData.projectPhase || undefined,
      notes: formData.notes || undefined,
    });
    setFormData({
      date: new Date().toISOString().split('T')[0],
      category: 'materials',
      description: '',
      amount: '',
      vendor: '',
      projectPhase: '',
      notes: '',
    });
  };

  const handleCancel = () => {
    setFormData({
      date: new Date().toISOString().split('T')[0],
      category: 'materials',
      description: '',
      amount: '',
      vendor: '',
      projectPhase: '',
      notes: '',
    });
    onCancel?.();
  };

  return (
    <div className="bg-slate-800 rounded-lg shadow-xl p-6 mb-6 border border-slate-700">
      <h2 className="text-2xl font-bold text-white mb-4">
        {editingExpense ? '✏️ Edit Expense' : '➕ Add New Expense'}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1">
            Date
          </label>
          <input
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1">
            Category
          </label>
          <select
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value as ExpenseCategory })}
            className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            {categories.map((cat) => (
              <option key={cat.value} value={cat.value}>
                {cat.emoji} {cat.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1">
            Description
          </label>
          <input
            type="text"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., Cement bags"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1">
            Amount ($)
          </label>
          <input
            type="number"
            step="0.01"
            value={formData.amount}
            onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
            className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="0.00"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1">
            Vendor (Optional)
          </label>
          <input
            type="text"
            value={formData.vendor}
            onChange={(e) => setFormData({ ...formData, vendor: e.target.value })}
            className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., ABC Supplies"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1">
            Project Phase (Optional)
          </label>
          <input
            type="text"
            value={formData.projectPhase}
            onChange={(e) => setFormData({ ...formData, projectPhase: e.target.value })}
            className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., Foundation, Framing"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1">
            Notes (Optional)
          </label>
          <textarea
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Additional details..."
            rows={3}
          />
        </div>

        <div className="flex gap-2">
          <button
            type="submit"
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
          >
            {editingExpense ? 'Update Expense' : 'Add Expense'}
          </button>
          {editingExpense && onCancel && (
            <button
              type="button"
              onClick={handleCancel}
              className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white font-medium rounded-md transition-colors"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

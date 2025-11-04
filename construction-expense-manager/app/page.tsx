'use client';

import { useState, useEffect } from 'react';
import { ExpenseForm } from '@/components/ExpenseForm';
import { ExpenseList } from '@/components/ExpenseList';
import { ExpenseSummary } from '@/components/ExpenseSummary';
import { Expense } from '@/types/expense';

export default function Home() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem('construction-expenses');
    if (stored) {
      setExpenses(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('construction-expenses', JSON.stringify(expenses));
  }, [expenses]);

  const addExpense = (expense: Omit<Expense, 'id'>) => {
    const newExpense: Expense = {
      ...expense,
      id: Date.now().toString(),
    };
    setExpenses([newExpense, ...expenses]);
  };

  const updateExpense = (id: string, updatedExpense: Omit<Expense, 'id'>) => {
    setExpenses(expenses.map(exp =>
      exp.id === id ? { ...updatedExpense, id } : exp
    ));
    setEditingExpense(null);
  };

  const deleteExpense = (id: string) => {
    setExpenses(expenses.filter(exp => exp.id !== id));
  };

  const handleEdit = (expense: Expense) => {
    setEditingExpense(expense);
  };

  const handleCancelEdit = () => {
    setEditingExpense(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2 flex items-center gap-3">
            <span className="text-5xl">🏗️</span>
            Construction Expense Manager
          </h1>
          <p className="text-slate-400">Track and manage your construction project expenses</p>
        </header>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <ExpenseForm
              onSubmit={editingExpense
                ? (expense) => updateExpense(editingExpense.id, expense)
                : addExpense
              }
              editingExpense={editingExpense}
              onCancel={handleCancelEdit}
            />
            <ExpenseSummary expenses={expenses} />
          </div>

          <div className="lg:col-span-2">
            <ExpenseList
              expenses={expenses}
              onDelete={deleteExpense}
              onEdit={handleEdit}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

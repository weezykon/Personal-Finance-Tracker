export interface Transaction {
  id: string;
  type: 'income' | 'expense';
  amount: number;
  date: string;
  category: string;
  notes?: string;
}

export interface Category {
  id: string;
  name: string;
  type: 'income' | 'expense';
}

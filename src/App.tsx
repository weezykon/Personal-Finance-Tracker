import { useState } from 'react'
import Dashboard from './components/Dashboard'
import CategoryManager from './components/CategoryManager'
import TransactionForm from './components/TransactionForm'
import FilterControls from './components/FilterControls'
import TransactionList from './components/TransactionList'
import Modal from './components/Modal'
import useLocalStorage from './hooks/useLocalStorage'
import { Transaction, Category } from './types'

function App() {
  const [transactions, setTransactions] = useLocalStorage<Transaction[]>('transactions', [])
  const [categories, setCategories] = useLocalStorage<Category[]>('categories', [])
  const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>(transactions)
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false)

  return (
    <div className="min-h-screen px-4 py-6 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-semibold text-gray-900 tracking-tight">
                Finance Tracker
              </h1>
              <p className="text-sm text-gray-500 mt-1">Track your income and expenses</p>
            </div>
            <button
              onClick={() => setIsCategoryModalOpen(true)}
              className="px-4 py-2 bg-black text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-smooth"
            >
              Categories
            </button>
          </div>
        </header>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column - Dashboard & Transaction Form */}
          <div className="lg:col-span-8 space-y-6">
            <Dashboard transactions={transactions} />
            <TransactionForm
              categories={categories}
              addTransaction={(transaction) => setTransactions([...transactions, transaction])}
            />
          </div>

          {/* Right Column - Filters & Transactions */}
          <div className="lg:col-span-4 space-y-6">
            <FilterControls
              categories={categories}
              transactions={transactions}
              setFilteredTransactions={setFilteredTransactions}
            />
            <TransactionList transactions={filteredTransactions} />
          </div>
        </div>

        {/* Category Modal */}
        <Modal
          isOpen={isCategoryModalOpen}
          onClose={() => setIsCategoryModalOpen(false)}
          title="Manage Categories"
        >
          <CategoryManager
            categories={categories}
            addCategory={(category) => setCategories([...categories, category])}
            onClose={() => setIsCategoryModalOpen(false)}
          />
        </Modal>
      </div>
    </div>
  )
}

export default App
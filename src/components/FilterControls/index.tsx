import { useState, useEffect } from 'react'
import { Transaction, Category } from '../../types'

interface FilterControlsProps {
  categories: Category[]
  transactions: Transaction[]
  setFilteredTransactions: (transactions: Transaction[]) => void
}

const FilterControls = ({
  categories,
  transactions,
  setFilteredTransactions,
}: FilterControlsProps) => {
  const [category, setCategory] = useState('')
  const [sortBy, setSortBy] = useState('date-desc')

  useEffect(() => {
    let filtered = transactions
    if (category) {
      filtered = filtered.filter((t) => t.category === category)
    }

    let sorted = [...filtered]
    switch (sortBy) {
      case 'date-asc':
        sorted.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
        break
      case 'date-desc':
        sorted.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        break
      case 'amount-asc':
        sorted.sort((a, b) => a.amount - b.amount)
        break
      case 'amount-desc':
        sorted.sort((a, b) => b.amount - a.amount)
        break
      default:
        break
    }

    setFilteredTransactions(sorted)
  }, [category, sortBy, transactions, setFilteredTransactions])

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Filters</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-smooth bg-white"
          >
            <option value="">All</option>
            {categories.map((c) => (
              <option key={c.id} value={c.name}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-smooth bg-white"
          >
            <option value="date-desc">Newest First</option>
            <option value="date-asc">Oldest First</option>
            <option value="amount-desc">Highest Amount</option>
            <option value="amount-asc">Lowest Amount</option>
          </select>
        </div>
      </div>
    </div>
  )
}

export default FilterControls

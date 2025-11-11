import { useState } from 'react'
import { Category } from '../../types'

interface CategoryManagerProps {
  categories: Category[]
  addCategory: (category: Category) => void
  onClose?: () => void
}

const CategoryManager = ({ categories, addCategory, onClose }: CategoryManagerProps) => {
  const [name, setName] = useState('')
  const [type, setType] = useState<'income' | 'expense'>('expense')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name) {
      alert('Please enter a category name')
      return
    }
    addCategory({
      id: crypto.randomUUID(),
      name,
      type,
    })
    setName('')
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g., Groceries, Salary"
            className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-smooth"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setType('income')}
              className={`py-2.5 px-4 text-sm font-medium rounded-lg border transition-smooth ${
                type === 'income'
                  ? 'bg-black text-white border-black'
                  : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400'
              }`}
            >
              Income
            </button>
            <button
              type="button"
              onClick={() => setType('expense')}
              className={`py-2.5 px-4 text-sm font-medium rounded-lg border transition-smooth ${
                type === 'expense'
                  ? 'bg-black text-white border-black'
                  : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400'
              }`}
            >
              Expense
            </button>
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-black text-white text-sm font-medium py-2.5 px-4 rounded-lg hover:bg-gray-800 transition-smooth"
        >
          Add Category
        </button>
      </form>

      {categories.length > 0 && (
        <div className="mt-6 pt-6 border-t border-gray-200">
          <h3 className="text-sm font-medium text-gray-700 mb-3">Your Categories</h3>
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {categories.map((c) => (
              <div
                key={c.id}
                className="flex items-center justify-between py-2.5 px-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-smooth"
              >
                <span className="text-sm font-medium text-gray-900">{c.name}</span>
                <span
                  className={`px-2 py-0.5 rounded text-xs font-medium ${
                    c.type === 'income'
                      ? 'bg-green-50 text-green-700'
                      : 'bg-red-50 text-red-700'
                  }`}
                >
                  {c.type}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default CategoryManager

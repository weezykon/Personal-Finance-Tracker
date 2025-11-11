import { Transaction } from '../../types'

interface TransactionItemProps {
  transaction: Transaction
}

const TransactionItem = ({ transaction }: TransactionItemProps) => {
  const { type, amount, date, category, notes } = transaction

  return (
    <li className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0 transition-smooth hover:bg-gray-50 -mx-4 px-4">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <p className="text-sm font-medium text-gray-900">{category}</p>
          <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
            type === 'income' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
          }`}>
            {type}
          </span>
        </div>
        <p className="text-xs text-gray-500 mt-0.5">
          {new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
        </p>
        {notes && <p className="text-xs text-gray-600 mt-1 truncate">{notes}</p>}
      </div>
      <p className={`text-sm font-semibold ml-4 ${type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
        {type === 'income' ? '+' : '-'}₦{amount.toFixed(2)}
      </p>
    </li>
  )
}

export default TransactionItem

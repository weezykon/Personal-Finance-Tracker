import { Transaction } from '../../types'
import TransactionItem from '../TransactionItem'

interface TransactionListProps {
  transactions: Transaction[]
}

const TransactionList = ({ transactions }: TransactionListProps) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Transactions</h2>
      {transactions.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-sm text-gray-500">No transactions</p>
        </div>
      ) : (
        <ul className="list-none">
          {transactions.map((transaction) => (
            <TransactionItem key={transaction.id} transaction={transaction} />
          ))}
        </ul>
      )}
    </div>
  )
}

export default TransactionList

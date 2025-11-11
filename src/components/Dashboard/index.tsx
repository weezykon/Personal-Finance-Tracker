import { Transaction } from '../../types'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

interface DashboardProps {
  transactions: Transaction[]
}

const Dashboard = ({ transactions }: DashboardProps) => {
  const totalIncome = transactions
    .filter((t) => t.type === 'income')
    .reduce((acc, t) => acc + t.amount, 0)

  const totalExpenses = transactions
    .filter((t) => t.type === 'expense')
    .reduce((acc, t) => acc + t.amount, 0)

  const balance = totalIncome - totalExpenses

  const chartData = [
    {
      name: 'Income vs Expense',
      income: totalIncome,
      expense: totalExpenses,
    },
  ]

  const exportToCsv = () => {
    const headers = ['ID', 'Type', 'Amount', 'Date', 'Category', 'Notes']
    const rows = transactions.map((t) =>
      [t.id, t.type, t.amount, t.date, t.category, t.notes].join(',')
    )
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows].join('\n')
    const encodedUri = encodeURI(csvContent)
    const link = document.createElement('a')
    link.setAttribute('href', encodedUri)
    link.setAttribute('download', 'transactions.csv')
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className='flex justify-between items-center mb-6'>
        <h2 className="text-lg font-semibold text-gray-900">Overview</h2>
        <button
          onClick={exportToCsv}
          className="px-3 py-1.5 text-sm text-gray-700 hover:text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-50 transition-smooth"
        >
          Export CSV
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="p-4 border border-gray-200 rounded-lg">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Income</p>
          <p className="text-2xl font-semibold text-gray-900">₦{totalIncome.toFixed(2)}</p>
        </div>
        <div className="p-4 border border-gray-200 rounded-lg">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Expenses</p>
          <p className="text-2xl font-semibold text-gray-900">₦{totalExpenses.toFixed(2)}</p>
        </div>
        <div className="p-4 border border-gray-200 rounded-lg">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Balance</p>
          <p className={`text-2xl font-semibold ${balance >= 0 ? 'text-gray-900' : 'text-red-600'}`}>
            ₦{balance.toFixed(2)}
          </p>
        </div>
      </div>

      <div className="pt-4">
        <ResponsiveContainer width="100%" height={240}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
            <XAxis
              dataKey="name"
              stroke="#9ca3af"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#9ca3af"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                fontSize: '12px'
              }}
            />
            <Legend
              wrapperStyle={{ fontSize: '12px' }}
            />
            <Bar dataKey="income" fill="#10b981" radius={[4, 4, 0, 0]} />
            <Bar dataKey="expense" fill="#ef4444" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default Dashboard

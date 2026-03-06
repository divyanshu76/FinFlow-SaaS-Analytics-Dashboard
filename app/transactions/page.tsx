'use client'

import { useState, useEffect, useMemo, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Search, Filter } from 'lucide-react'
import { toast } from 'sonner'
import { Sidebar } from '@/components/sidebar'
import { Navbar } from '@/components/navbar'
import { PageTransition } from '@/components/page-transition'
import { TableSkeleton } from '@/components/table-skeleton'
import { EmptyState } from '@/components/empty-state'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const transactions = [
  { id: 1, date: '2024-01-15', customer: 'Alice Johnson', amount: '$2,500', status: 'Success', method: 'Credit Card', type: 'Payment' },
  { id: 2, date: '2024-01-14', customer: 'Bob Smith', amount: '$1,250', status: 'Pending', method: 'Bank Transfer', type: 'Refund' },
  { id: 3, date: '2024-01-13', customer: 'Carol White', amount: '$3,100', status: 'Success', method: 'Credit Card', type: 'Payment' },
  { id: 4, date: '2024-01-12', customer: 'David Brown', amount: '$890', status: 'Failed', method: 'PayPal', type: 'Payment' },
  { id: 5, date: '2024-01-11', customer: 'Emma Wilson', amount: '$4,200', status: 'Success', method: 'Credit Card', type: 'Payment' },
  { id: 6, date: '2024-01-10', customer: 'Frank Miller', amount: '$1,800', status: 'Success', method: 'Bank Transfer', type: 'Refund' },
  { id: 7, date: '2024-01-09', customer: 'Grace Lee', amount: '$2,100', status: 'Pending', method: 'Credit Card', type: 'Payment' },
  { id: 8, date: '2024-01-08', customer: 'Henry Chen', amount: '$3,500', status: 'Success', method: 'Credit Card', type: 'Payment' },
]

export default function TransactionsPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [methodFilter, setMethodFilter] = useState('all')
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const handleExport = useCallback(() => {
    toast.success('Transactions exported', {
      description: 'CSV file has been downloaded',
    })
  }, [])

  const handleStatusChange = useCallback((value: string) => {
    setStatusFilter(value)
    toast.info(`Filtering by ${value === 'all' ? 'all statuses' : value}`, {
      description: 'Results updated',
    })
  }, [])

  const filteredTransactions = useMemo(() => {
    return transactions.filter((tx) => {
      const matchesSearch = tx.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           tx.id.toString().includes(searchQuery)
      const matchesStatus = statusFilter === 'all' || tx.status === statusFilter
      const matchesMethod = methodFilter === 'all' || tx.method === methodFilter
      return matchesSearch && matchesStatus && matchesMethod
    })
  }, [searchQuery, statusFilter, methodFilter])

  return (
    <div suppressHydrationWarning className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black">
      <Sidebar />
      <Navbar />

      <PageTransition>
        <main className="ml-64 min-h-[calc(100vh-73px)] p-8">
          <div className="max-w-7xl mx-auto space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-white">Transactions</h1>
                <p className="mt-1 text-white/50">Manage and track all financial transactions</p>
              </div>
              <Button
                onClick={handleExport}
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
              >
                Export
              </Button>
            </div>

            {/* Filters */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="text-sm text-white/70 mb-2 block">Search</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
                  <Input
                    placeholder="Search customer or ID..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-white/5 border-white/10 pl-10 text-white placeholder:text-white/40 focus:bg-white/10 focus:border-white/20"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm text-white/70 mb-2 block">Status</label>
                <Select value={statusFilter} onValueChange={handleStatusChange}>
                  <SelectTrigger className="bg-white/5 border-white/10 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-950 border-white/10">
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="Success">Success</SelectItem>
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="Failed">Failed</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm text-white/70 mb-2 block">Method</label>
                <Select value={methodFilter} onValueChange={setMethodFilter}>
                  <SelectTrigger className="bg-white/5 border-white/10 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-950 border-white/10">
                    <SelectItem value="all">All Methods</SelectItem>
                    <SelectItem value="Credit Card">Credit Card</SelectItem>
                    <SelectItem value="Bank Transfer">Bank Transfer</SelectItem>
                    <SelectItem value="PayPal">PayPal</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-end">
                <Button
                  onClick={() => {
                    setSearchQuery('')
                    setStatusFilter('all')
                    setMethodFilter('all')
                    toast.info('Filters reset', { description: 'Showing all transactions' })
                  }}
                  variant="outline"
                  className="w-full border-purple-500/50 hover:border-purple-400 hover:bg-purple-500/10 text-purple-400 font-medium"
                >
                  <Filter className="mr-2 h-4 w-4" />
                  Reset
                </Button>
              </div>
            </div>

            {/* Transactions Table */}
            <motion.div
              whileHover={{ y: -4 }}
              className="group rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.02] p-6 backdrop-blur-xl hover:border-white/20 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-blue-500/10"
            >
              {!isLoading ? (
                <div className="overflow-x-auto">
                  {filteredTransactions.length > 0 ? (
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-white/10">
                          <th className="px-4 py-3 text-left text-sm font-medium text-white/70">ID</th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-white/70">Date</th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-white/70">Customer</th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-white/70">Amount</th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-white/70">Status</th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-white/70">Method</th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-white/70">Type</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredTransactions.map((tx, idx) => (
                          <motion.tr
                            key={tx.id}
                            whileHover={{ backgroundColor: 'rgba(255,255,255,0.05)' }}
                            className="border-b border-white/5 transition-colors duration-200"
                          >
                            <td className="px-4 py-4 text-sm text-white/70">#{tx.id}</td>
                            <td className="px-4 py-4 text-sm text-white/70">{tx.date}</td>
                            <td className="px-4 py-4 text-sm text-white">{tx.customer}</td>
                            <td className="px-4 py-4 text-sm font-medium text-white">{tx.amount}</td>
                            <td className="px-4 py-4 text-sm">
                              <Badge
                                variant={
                                  tx.status === 'Success'
                                    ? 'default'
                                    : tx.status === 'Pending'
                                      ? 'secondary'
                                      : 'destructive'
                                }
                              >
                                {tx.status}
                              </Badge>
                            </td>
                            <td className="px-4 py-4 text-sm text-white/70">{tx.method}</td>
                            <td className="px-4 py-4 text-sm text-white/70">{tx.type}</td>
                          </motion.tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <EmptyState
                      icon={<Search className="h-12 w-12" />}
                      title="No transactions found"
                      description="Try adjusting your search or filter criteria"
                    />
                  )}
                </div>
              ) : (
                <TableSkeleton rows={8} />
              )}
            </motion.div>

            {/* Summary */}
            {filteredTransactions.length > 0 && (
              <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.02] p-6 backdrop-blur-xl">
                <p className="text-sm text-white/70">
                  Showing <span className="font-semibold text-white">{filteredTransactions.length}</span> transaction{filteredTransactions.length !== 1 ? 's' : ''}
                </p>
              </div>
            )}
          </div>
        </main>
      </PageTransition>
    </div>
  )
}

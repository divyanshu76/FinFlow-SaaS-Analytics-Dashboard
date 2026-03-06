'use client'

import { useState, useEffect, useMemo, useCallback } from 'react'
import { motion } from 'framer-motion'
import { BarChart3, Users, TrendingUp, CreditCard, Search, MoreVertical } from 'lucide-react'
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { toast } from 'sonner'
import { Sidebar } from '@/components/sidebar'
import { Navbar } from '@/components/navbar'
import { AnalyticsCard } from '@/components/analytics-card'
import { PageTransition } from '@/components/page-transition'
import { ChartSkeleton } from '@/components/chart-skeleton'
import { TableSkeleton } from '@/components/table-skeleton'
import { EmptyState } from '@/components/empty-state'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

// Mock data
const revenueData = [
  { month: 'Jan', revenue: 4000 },
  { month: 'Feb', revenue: 3000 },
  { month: 'Mar', revenue: 2000 },
  { month: 'Apr', revenue: 2780 },
  { month: 'May', revenue: 1890 },
  { month: 'Jun', revenue: 2390 },
  { month: 'Jul', revenue: 3490 },
]

const userGrowthData = [
  { month: 'Jan', users: 400 },
  { month: 'Feb', users: 600 },
  { month: 'Mar', users: 800 },
  { month: 'Apr', users: 1200 },
  { month: 'May', users: 1600 },
  { month: 'Jun', users: 2000 },
  { month: 'Jul', users: 2400 },
]

const transactions = [
  { id: 1, date: '2024-01-15', customer: 'Alice Johnson', amount: '$2,500', status: 'Success', method: 'Credit Card' },
  { id: 2, date: '2024-01-14', customer: 'Bob Smith', amount: '$1,250', status: 'Pending', method: 'Bank Transfer' },
  { id: 3, date: '2024-01-13', customer: 'Carol White', amount: '$3,100', status: 'Success', method: 'Credit Card' },
  { id: 4, date: '2024-01-12', customer: 'David Brown', amount: '$890', status: 'Failed', method: 'PayPal' },
  { id: 5, date: '2024-01-11', customer: 'Emma Wilson', amount: '$4,200', status: 'Success', method: 'Credit Card' },
]

const topCustomers = [
  { id: 1, name: 'Acme Corporation', revenue: '$125,000', status: 'Active' },
  { id: 2, name: 'Global Tech Inc', revenue: '$98,500', status: 'Active' },
  { id: 3, name: 'Innovation Labs', revenue: '$76,200', status: 'Active' },
  { id: 4, name: 'Digital Ventures', revenue: '$54,800', status: 'Inactive' },
]

export default function Dashboard() {
  const [isLoading, setIsLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const handleExport = useCallback(() => {
    toast.success('Report exported', {
      description: 'Dashboard report has been downloaded',
    })
  }, [])

  const handleRefresh = useCallback(() => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      toast.success('Data refreshed', {
        description: 'All metrics have been updated',
      })
    }, 1500)
  }, [])

  const filteredTransactions = useMemo(() => {
    if (!searchQuery) return transactions
    return transactions.filter((tx) =>
      tx.customer.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }, [searchQuery])

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
                <h1 className="text-3xl font-bold text-white">Dashboard</h1>
                <p className="mt-1 text-white/50">Welcome back to your analytics</p>
              </div>
              <div className="flex items-center gap-3">
                <Button
                  onClick={handleRefresh}
                  variant="outline"
                  className="border-blue-500/50 hover:border-blue-400 hover:bg-blue-500/10 text-blue-400 font-medium"
                >
                  Refresh
                </Button>
                <Button
                  onClick={handleExport}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
                >
                  Export
                </Button>
              </div>
            </div>

            {/* Analytics Cards */}
            {!isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <AnalyticsCard
                  title="Total Revenue"
                  value="$124,530"
                  icon={<CreditCard className="h-6 w-6" />}
                  trend={12.5}
                  trendLabel="vs last month"
                  delay={0}
                />
                <AnalyticsCard
                  title="Active Users"
                  value="3,240"
                  icon={<Users className="h-6 w-6" />}
                  trend={8.2}
                  trendLabel="vs last month"
                  delay={0.1}
                />
                <AnalyticsCard
                  title="Monthly Growth"
                  value="+18%"
                  icon={<TrendingUp className="h-6 w-6" />}
                  trend={3.1}
                  trendLabel="vs last month"
                  delay={0.2}
                />
                <AnalyticsCard
                  title="Transactions"
                  value="1,245"
                  icon={<BarChart3 className="h-6 w-6" />}
                  trend={-2.4}
                  trendLabel="vs last month"
                  delay={0.3}
                />
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="h-24 rounded-2xl bg-white/5 animate-pulse" />
                ))}
              </div>
            )}

            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Revenue Chart */}
              <motion.div
                whileHover={{ y: -4 }}
                className="group rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.02] p-6 backdrop-blur-xl hover:border-white/20 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-blue-500/10"
              >
                <div className="mb-6 flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-white">Revenue Growth</h3>
                  <div className="text-white/40 group-hover:text-white/60 transition-colors">
                    <MoreVertical className="h-4 w-4" />
                  </div>
                </div>
                {!isLoading ? (
                  <ResponsiveContainer width="100%" height={250}>
                    <LineChart data={revenueData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                      <XAxis stroke="rgba(255,255,255,0.4)" />
                      <YAxis stroke="rgba(255,255,255,0.4)" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: 'rgba(15, 23, 42, 0.95)',
                          border: '1px solid rgba(255,255,255,0.2)',
                          borderRadius: '8px',
                          color: '#ffffff',
                        }}
                        labelStyle={{ color: '#ffffff' }}
                      />
                      <Line
                        type="monotone"
                        dataKey="revenue"
                        stroke="url(#colorRevenue)"
                        strokeWidth={2}
                        dot={false}
                        isAnimationActive={true}
                      />
                      <defs>
                        <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                          <stop offset="95%" stopColor="#9333ea" stopOpacity={0.1} />
                        </linearGradient>
                      </defs>
                    </LineChart>
                  </ResponsiveContainer>
                ) : (
                  <ChartSkeleton />
                )}
              </motion.div>

              {/* User Growth Chart */}
              <motion.div
                whileHover={{ y: -4 }}
                className="group rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.02] p-6 backdrop-blur-xl hover:border-white/20 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-purple-500/10"
              >
                <div className="mb-6 flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-white">User Growth</h3>
                  <div className="text-white/40 group-hover:text-white/60 transition-colors">
                    <MoreVertical className="h-4 w-4" />
                  </div>
                </div>
                {!isLoading ? (
                  <ResponsiveContainer width="100%" height={250}>
                    <AreaChart data={userGrowthData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                      <XAxis stroke="rgba(255,255,255,0.4)" />
                      <YAxis stroke="rgba(255,255,255,0.4)" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: 'rgba(15, 23, 42, 0.95)',
                          border: '1px solid rgba(255,255,255,0.2)',
                          borderRadius: '8px',
                          color: '#ffffff',
                        }}
                        labelStyle={{ color: '#ffffff' }}
                      />
                      <Area
                        type="monotone"
                        dataKey="users"
                        stroke="#a855f7"
                        fill="url(#colorUsers)"
                        isAnimationActive={true}
                      />
                      <defs>
                        <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#a855f7" stopOpacity={0.8} />
                          <stop offset="95%" stopColor="#a855f7" stopOpacity={0.1} />
                        </linearGradient>
                      </defs>
                    </AreaChart>
                  </ResponsiveContainer>
                ) : (
                  <ChartSkeleton />
                )}
              </motion.div>
            </div>

            {/* Transactions Table */}
            <motion.div
              whileHover={{ y: -4 }}
              className="group rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.02] p-6 backdrop-blur-xl hover:border-white/20 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-green-500/10"
            >
              <div className="mb-6 flex items-center justify-between">
                <h3 className="text-lg font-semibold text-white">Recent Transactions</h3>
              </div>

              {/* Search */}
              <div className="mb-6 relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
                <Input
                  placeholder="Search transactions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-white/5 border-white/10 pl-10 text-white placeholder:text-white/40 focus:bg-white/10 focus:border-white/20"
                />
              </div>

              {!isLoading ? (
                <div className="overflow-x-auto">
                  {filteredTransactions.length > 0 ? (
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-white/10">
                          <th className="px-4 py-3 text-left text-sm font-medium text-white/70">Date</th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-white/70">Customer</th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-white/70">Amount</th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-white/70">Status</th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-white/70">Method</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredTransactions.map((tx) => (
                          <motion.tr
                            key={tx.id}
                            whileHover={{ backgroundColor: 'rgba(255,255,255,0.05)' }}
                            className="border-b border-white/5 transition-colors duration-200"
                          >
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
                          </motion.tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <EmptyState
                      icon={<CreditCard className="h-12 w-12" />}
                      title="No transactions found"
                      description="Try adjusting your search filters"
                    />
                  )}
                </div>
              ) : (
                <TableSkeleton rows={5} />
              )}
            </motion.div>

            {/* Top Customers */}
            <motion.div
              whileHover={{ y: -4 }}
              className="group rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.02] p-6 backdrop-blur-xl hover:border-white/20 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-amber-500/10"
            >
              <h3 className="mb-6 text-lg font-semibold text-white">Top Customers</h3>
              {!isLoading ? (
                <div className="space-y-4">
                  {topCustomers.length > 0 ? (
                    topCustomers.map((customer) => (
                      <motion.div
                        key={customer.id}
                        whileHover={{ x: 4 }}
                        className="flex items-center justify-between rounded-lg border border-white/5 bg-white/[0.02] p-4 transition-all duration-300 hover:border-white/10 hover:bg-white/[0.04]"
                      >
                        <div>
                          <p className="font-medium text-white">{customer.name}</p>
                          <p className="text-sm text-white/50">{customer.revenue}</p>
                        </div>
                        <Badge variant={customer.status === 'Active' ? 'default' : 'secondary'}>
                          {customer.status}
                        </Badge>
                      </motion.div>
                    ))
                  ) : (
                    <EmptyState
                      icon={<Users className="h-12 w-12" />}
                      title="No customers found"
                      description="Your top customers will appear here"
                    />
                  )}
                </div>
              ) : (
                <TableSkeleton rows={4} />
              )}
            </motion.div>
          </div>
        </main>
      </PageTransition>
    </div>
  )
}

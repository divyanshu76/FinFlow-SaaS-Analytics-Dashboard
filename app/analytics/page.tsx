'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { MoreVertical } from 'lucide-react'
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { Sidebar } from '@/components/sidebar'
import { Navbar } from '@/components/navbar'
import { PageTransition } from '@/components/page-transition'
import { ChartSkeleton } from '@/components/chart-skeleton'

const revenueData = [
  { month: 'Jan', revenue: 4000 },
  { month: 'Feb', revenue: 3000 },
  { month: 'Mar', revenue: 2000 },
  { month: 'Apr', revenue: 2780 },
  { month: 'May', revenue: 1890 },
  { month: 'Jun', revenue: 2390 },
  { month: 'Jul', revenue: 3490 },
]

const trafficData = [
  { source: 'Direct', value: 400 },
  { source: 'Organic', value: 300 },
  { source: 'Referral', value: 200 },
  { source: 'Social', value: 278 },
]

const conversionData = [
  { month: 'Jan', conversion: 2.4 },
  { month: 'Feb', conversion: 1.3 },
  { month: 'Mar', conversion: 2.0 },
  { month: 'Apr', conversion: 9.8 },
  { month: 'May', conversion: 3.9 },
  { month: 'Jun', conversion: 3.8 },
  { month: 'Jul', conversion: 4.3 },
]

const sessionData = [
  { week: 'Week 1', sessions: 400 },
  { week: 'Week 2', sessions: 300 },
  { week: 'Week 3', sessions: 200 },
  { week: 'Week 4', sessions: 278 },
  { week: 'Week 5', sessions: 190 },
]

const COLORS = ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b']

export default function AnalyticsPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [isClient, setIsClient] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <div suppressHydrationWarning className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <Navbar onMenuClick={() => setSidebarOpen(true)} />

      <PageTransition>
        <main className="ml-0 md:ml-[260px] min-h-[calc(100vh-73px)] p-4 md:p-8">
          <div className="max-w-7xl mx-auto space-y-6 md:space-y-8">
            {/* Header */}
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-white">Analytics</h1>
              <p className="mt-1 text-sm sm:text-base text-white/50">Comprehensive performance metrics</p>
            </div>

            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
              {/* Revenue Chart */}
              <motion.div
                whileHover={{ y: -4 }}
                className="group rounded-xl md:rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.02] p-4 md:p-6 backdrop-blur-xl hover:border-white/20 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-blue-500/10"
              >
                <div className="mb-4 md:mb-6 flex items-center justify-between">
                  <h3 className="text-base md:text-lg font-semibold text-white">Revenue Chart</h3>
                  <div className="text-white/40 group-hover:text-white/60 transition-colors">
                    <MoreVertical className="h-4 w-4" />
                  </div>
                </div>
                {!isLoading ? (
                  <ResponsiveContainer width="100%" height={300}>
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
                        stroke="#3b82f6"
                        strokeWidth={2}
                        dot={{ fill: '#3b82f6', r: 4 }}
                        isAnimationActive={true}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                ) : (
                  <ChartSkeleton />
                )}
              </motion.div>

              {/* Traffic Sources */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                whileHover={{ y: -4 }}
                className="group rounded-xl md:rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.02] p-4 md:p-6 backdrop-blur-xl hover:border-white/20 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-purple-500/10"
              >
                <div className="mb-4 md:mb-6 flex items-center justify-between">
                  <h3 className="text-base md:text-lg font-semibold text-white">Traffic Sources</h3>
                  <div className="text-white/40 group-hover:text-white/60 transition-colors">
                    <MoreVertical className="h-4 w-4" />
                  </div>
                </div>
                {!isLoading ? (
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={trafficData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ source, value }) => `${source}: ${value}`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        isAnimationActive={true}
                      >
                        {trafficData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(15, 23, 42, 0.95)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    borderRadius: '8px',
                    color: '#ffffff',
                  }}
                  labelStyle={{ color: '#ffffff' }}
                />
                    </PieChart>
                  </ResponsiveContainer>
                ) : (
                  <ChartSkeleton />
                )}
              </motion.div>

              {/* Conversion Rate */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                whileHover={{ y: -4 }}
                className="group rounded-xl md:rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.02] p-4 md:p-6 backdrop-blur-xl hover:border-white/20 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-green-500/10"
              >
                <div className="mb-4 md:mb-6 flex items-center justify-between">
                  <h3 className="text-base md:text-lg font-semibold text-white">Conversion Rate</h3>
                  <div className="text-white/40 group-hover:text-white/60 transition-colors">
                    <MoreVertical className="h-4 w-4" />
                  </div>
                </div>
                {!isLoading ? (
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={conversionData}>
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
                      <Bar dataKey="conversion" fill="#10b981" radius={[8, 8, 0, 0]} isAnimationActive={true} />
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <ChartSkeleton />
                )}
              </motion.div>

              {/* Session Trends */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                whileHover={{ y: -4 }}
                className="group rounded-xl md:rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.02] p-4 md:p-6 backdrop-blur-xl hover:border-white/20 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-amber-500/10"
              >
                <div className="mb-4 md:mb-6 flex items-center justify-between">
                  <h3 className="text-base md:text-lg font-semibold text-white">Session Trends</h3>
                  <div className="text-white/40 group-hover:text-white/60 transition-colors">
                    <MoreVertical className="h-4 w-4" />
                  </div>
                </div>
                {!isLoading ? (
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={sessionData}>
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
                      <Bar dataKey="sessions" fill="#f59e0b" radius={[8, 8, 0, 0]} isAnimationActive={true} />
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <ChartSkeleton />
                )}
              </motion.div>
            </div>
          </div>
        </main>
      </PageTransition>
    </div>
  )
}

'use client'

import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { TrendingUp, TrendingDown } from 'lucide-react'

interface AnalyticsCardProps {
  title: string
  value: string | number
  icon: ReactNode
  trend?: number
  trendLabel?: string
  delay?: number
}

export function AnalyticsCard({
  title,
  value,
  icon,
  trend,
  trendLabel,
  delay = 0,
}: AnalyticsCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.4, delay, ease: 'easeOut' }}
      whileHover={{ scale: 1.02, y: -6 }}
      className="group relative overflow-hidden rounded-2xl bg-slate-900/70 backdrop-blur-md border border-white/10 hover:border-white/20 transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-indigo-500/10 cursor-pointer"
    >
      {/* Animated gradient glow on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-purple-500/5 to-pink-500/5" />
      </div>
      
      {/* Subtle inner border glow */}
      <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/5 group-hover:ring-white/10 transition-all duration-300" />

      <div className="relative z-10 p-5 md:p-6 space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs md:text-sm font-medium text-slate-400 group-hover:text-slate-300 transition-colors">{title}</span>
          <div className="text-slate-500 group-hover:text-slate-400 transition-colors duration-300 scale-110">
            {icon}
          </div>
        </div>

        <div className="space-y-3">
          <motion.h3 
            className="text-3xl md:text-4xl font-bold text-white tracking-tight"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: delay + 0.2, duration: 0.6 }}
          >
            {value}
          </motion.h3>
          {trend !== undefined && (
            <motion.div 
              className="flex items-center gap-1.5"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: delay + 0.3, duration: 0.4 }}
            >
              <div className={`flex items-center gap-1 text-xs md:text-sm font-semibold ${trend >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                {trend >= 0 ? (
                  <TrendingUp className="h-3.5 w-3.5" />
                ) : (
                  <TrendingDown className="h-3.5 w-3.5" />
                )}
                <span>
                  {trend >= 0 ? '+' : ''}{trend}%
                </span>
              </div>
              {trendLabel && <span className="text-xs text-slate-500 hidden sm:inline">{trendLabel}</span>}
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  )
}

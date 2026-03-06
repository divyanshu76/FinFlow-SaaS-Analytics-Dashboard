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
      whileHover={{ scale: 1.02, y: -4 }}
      className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-white/[0.08] to-white/[0.02] p-6 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-blue-500/10"
    >
      {/* Glow effect on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/0 via-blue-500/5 to-purple-500/0" />
      </div>

      <div className="relative z-10 space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-white/70">{title}</span>
          <div className="text-white/50 group-hover:text-white/70 transition-colors duration-300">
            {icon}
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-3xl font-bold text-white">{value}</h3>
          {trend !== undefined && (
            <div className="flex items-center gap-1">
              <div className={`flex items-center gap-1 text-sm font-medium ${trend >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                {trend >= 0 ? (
                  <TrendingUp className="h-4 w-4" />
                ) : (
                  <TrendingDown className="h-4 w-4" />
                )}
                <span>
                  {trend >= 0 ? '+' : ''}{trend}%
                </span>
              </div>
              {trendLabel && <span className="text-xs text-white/50">{trendLabel}</span>}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}

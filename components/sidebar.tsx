'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { LayoutDashboard, BarChart3, CreditCard, Users, FileText, Settings } from 'lucide-react'
import { cn } from '@/lib/utils'

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/' },
  { icon: BarChart3, label: 'Analytics', href: '/analytics' },
  { icon: CreditCard, label: 'Transactions', href: '/transactions' },
  { icon: Users, label: 'Customers', href: '/customers' },
  { icon: FileText, label: 'Reports', href: '/reports' },
  { icon: Settings, label: 'Settings', href: '/settings' },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <motion.aside
      initial={{ x: -250 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-white/10 bg-gradient-to-b from-slate-950/80 to-black/80 backdrop-blur-xl"
    >
      <div className="flex flex-col h-full p-6">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-8 flex items-center gap-3"
        >
          <div className="rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 p-2">
            <BarChart3 className="h-5 w-5 text-white" />
          </div>
          <span className="text-lg font-bold text-white">FinFlow</span>
        </motion.div>

        {/* Navigation */}
        <nav className="flex-1 space-y-2">
          {menuItems.map((item, idx) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            return (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + idx * 0.05 }}
              >
                <Link
                  href={item.href}
                  className={cn(
                    'group relative flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-all duration-300',
                    isActive
                      ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-white shadow-lg shadow-blue-500/10'
                      : 'text-white/70 hover:text-white hover:bg-white/5'
                  )}
                >
                  {isActive && (
                    <motion.div
                      layoutId="sidebar-active"
                      className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500/20 to-purple-500/20"
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                  <Icon className="relative z-10 h-5 w-5" />
                  <span className="relative z-10">{item.label}</span>
                </Link>
              </motion.div>
            )
          })}
        </nav>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="border-t border-white/10 pt-4 text-xs text-white/40"
        >
          <p>© 2024 FinFlow. All rights reserved.</p>
        </motion.div>
      </div>
    </motion.aside>
  )
}

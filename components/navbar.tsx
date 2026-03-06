'use client'

import { motion } from 'framer-motion'
import { Bell, Search, LogOut, User, Settings, Menu } from 'lucide-react'
import { useState, useEffect, useCallback } from 'react'
import { toast } from 'sonner'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export function Navbar() {
  const [notificationCount, setNotificationCount] = useState(3)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const handleNotifications = useCallback(() => {
    toast.info('You have 3 new notifications', {
      description: '2 alerts and 1 report ready',
    })
  }, [])

  const handleLogout = useCallback(() => {
    toast.success('Logged out successfully', {
      description: 'You have been signed out',
    })
  }, [])

  return (
    <nav
      suppressHydrationWarning
      className="sticky top-0 z-30 border-b border-white/10 bg-gradient-to-r from-slate-950/50 via-slate-900/50 to-black/50 backdrop-blur-xl"
    >
      <div className="ml-64 flex items-center justify-between px-8 py-4">
        {/* Left - Search */}
        <div className="flex flex-1 items-center gap-4">
          <div className="relative max-w-xs hidden md:flex">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
            <Input
              placeholder="Search..."
              className="bg-white/5 border-white/10 pl-10 text-white placeholder:text-white/40 focus:bg-white/10 focus:border-white/20"
            />
          </div>
        </div>

        {/* Right - Actions */}
        <div className="flex items-center gap-4">
          {/* Notifications */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleNotifications}
            className="relative rounded-lg p-2 text-white/70 hover:bg-white/5 hover:text-white transition-all duration-300"
          >
            <Bell className="h-5 w-5" />
            {notificationCount > 0 && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-r from-red-500 to-orange-500 text-xs font-bold text-white"
              >
                {notificationCount}
              </motion.div>
            )}
          </motion.button>

          {/* Profile Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="rounded-lg p-2 hover:bg-white/5 transition-all duration-300"
              >
                <Avatar className="h-8 w-8">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
              </motion.button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 bg-slate-950/95 border-white/10 backdrop-blur-xl">
              <DropdownMenuLabel className="text-white">John Doe</DropdownMenuLabel>
              <DropdownMenuLabel className="text-xs font-normal text-white/50">john@finflow.com</DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-white/10" />
              <DropdownMenuItem
                className="text-white/70 hover:text-white hover:bg-white/10 cursor-pointer"
                onClick={() => toast.info('Navigating to profile')}
              >
                <User className="mr-2 h-4 w-4" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-white/70 hover:text-white hover:bg-white/10 cursor-pointer"
                onClick={() => toast.info('Navigating to settings')}
              >
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-white/10" />
              <DropdownMenuItem
                className="text-red-400 hover:text-red-300 hover:bg-red-500/10 cursor-pointer"
                onClick={handleLogout}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  )
}

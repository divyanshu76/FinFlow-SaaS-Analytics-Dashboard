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

interface NavbarProps {
  onMenuClick?: () => void
}

export function Navbar({ onMenuClick }: NavbarProps) {
  const [notificationCount, setNotificationCount] = useState(3)
  const [isClient, setIsClient] = useState(false)
  const [searchValue, setSearchValue] = useState('')

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
      className="sticky top-0 z-30 border-b border-slate-800 bg-gradient-to-r from-slate-950/80 via-slate-900/80 to-black/80 backdrop-blur-xl shadow-lg shadow-slate-950/50"
    >
      <div className="ml-0 md:ml-64 flex items-center justify-between px-4 md:px-8 py-4">
        {/* Left - Hamburger + Search */}
        <div className="flex flex-1 items-center gap-4">
          {/* Hamburger Menu (Mobile) */}
          <Button
            variant="ghost"
            size="icon"
            onClick={onMenuClick}
            className="md:hidden h-10 w-10 text-white/70 hover:text-white hover:bg-white/10"
          >
            <Menu className="h-5 w-5" />
          </Button>

          {/* Search Bar */}
          <div className="relative flex-1 max-w-md hidden md:block">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
            <Input
              placeholder="Search..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="bg-slate-800/50 border-slate-700 pl-10 text-sm text-slate-100 placeholder:text-slate-500 focus:bg-slate-800 focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/20 transition-all duration-300 h-10"
            />
          </div>

          {/* Mobile Search Icon */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden h-10 w-10 text-white/70 hover:text-white hover:bg-white/10"
            onClick={() => toast.info('Search', { description: 'Search feature coming soon' })}
          >
            <Search className="h-5 w-5" />
          </Button>
        </div>

        {/* Right - Actions */}
        <div className="flex items-center gap-2 md:gap-4">
          {/* Notifications */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleNotifications}
            className="relative rounded-lg p-2 text-white/70 hover:bg-white/5 hover:text-white transition-all duration-300 h-10 w-10 flex items-center justify-center"
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
                className="rounded-lg p-1.5 hover:bg-white/5 transition-all duration-300"
              >
                <Avatar className="h-8 w-8 ring-2 ring-slate-700 ring-offset-2 ring-offset-slate-900">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white text-xs font-bold">JD</AvatarFallback>
                </Avatar>
              </motion.button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" sideOffset={8} className="w-56 !bg-[#0f172a]/95 !text-[#e5e7eb] !border-white/[0.08] shadow-[0_20px_40px_rgba(0,0,0,0.5)] backdrop-blur-xl">
              <DropdownMenuLabel className="!text-[#e5e7eb]">John Doe</DropdownMenuLabel>
              <DropdownMenuLabel className="text-xs font-normal !text-slate-400">john@finflow.com</DropdownMenuLabel>
              <DropdownMenuSeparator className="!bg-white/[0.08]" />
              <DropdownMenuItem
                className="!text-[#e5e7eb] hover:!bg-[rgba(255,255,255,0.06)] cursor-pointer"
                onClick={() => toast.info('Navigating to profile')}
              >
                <User className="mr-2 h-4 w-4" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem
                className="!text-[#e5e7eb] hover:!bg-[rgba(255,255,255,0.06)] cursor-pointer"
                onClick={() => toast.info('Navigating to settings')}
              >
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator className="!bg-white/[0.08]" />
              <DropdownMenuItem
                className="!text-red-400 hover:!bg-red-500/10 cursor-pointer"
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

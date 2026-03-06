'use client'

import { motion } from 'framer-motion'
import { toast } from 'sonner'
import { useState, useEffect, useCallback } from 'react'
import { Sidebar } from '@/components/sidebar'
import { Navbar } from '@/components/navbar'
import { PageTransition } from '@/components/page-transition'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { User, Lock, Bell, CreditCard } from 'lucide-react'

export default function SettingsPage() {
  const [isClient, setIsClient] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const handleSave = useCallback((section: string) => {
    toast.success(`${section} updated`, {
      description: 'Your changes have been saved',
    })
  }, [])

  return (
    <div suppressHydrationWarning className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <Navbar onMenuClick={() => setSidebarOpen(true)} />

      <PageTransition>
        <main className="ml-0 md:ml-[260px] min-h-[calc(100vh-73px)] p-4 md:p-8">
          <div className="max-w-4xl mx-auto space-y-6 md:space-y-8">
            {/* Header */}
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-white">Settings</h1>
              <p className="mt-1 text-sm sm:text-base text-white/50">Manage your account and preferences</p>
            </div>

            {/* Tabs */}
            <div className="rounded-xl md:rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-xl overflow-hidden">
              <Tabs defaultValue="profile" className="w-full">
                <TabsList className="w-full rounded-none border-b border-white/10 bg-transparent px-4 md:px-6 overflow-x-auto">
                  <TabsTrigger
                    value="profile"
                    className="flex items-center gap-2 text-xs md:text-sm text-white/70 hover:text-white data-[state=active]:text-white data-[state=active]:border-b-2 data-[state=active]:border-blue-500 whitespace-nowrap"
                  >
                    <User className="h-3 w-3 md:h-4 md:w-4" />
                    Profile
                  </TabsTrigger>
                  <TabsTrigger
                    value="account"
                    className="flex items-center gap-2 text-xs md:text-sm text-white/70 hover:text-white data-[state=active]:text-white data-[state=active]:border-b-2 data-[state=active]:border-blue-500 whitespace-nowrap"
                  >
                    <Lock className="h-3 w-3 md:h-4 md:w-4" />
                    Account
                  </TabsTrigger>
                  <TabsTrigger
                    value="notifications"
                    className="flex items-center gap-2 text-xs md:text-sm text-white/70 hover:text-white data-[state=active]:text-white data-[state=active]:border-b-2 data-[state=active]:border-blue-500 whitespace-nowrap"
                  >
                    <Bell className="h-3 w-3 md:h-4 md:w-4" />
                    Notifications
                  </TabsTrigger>
                  <TabsTrigger
                    value="billing"
                    className="flex items-center gap-2 text-xs md:text-sm text-white/70 hover:text-white data-[state=active]:text-white data-[state=active]:border-b-2 data-[state=active]:border-blue-500 whitespace-nowrap"
                  >
                    <CreditCard className="h-3 w-3 md:h-4 md:w-4" />
                    Billing
                  </TabsTrigger>
                </TabsList>

                {/* Profile Tab */}
                <TabsContent value="profile" className="p-4 md:p-6 space-y-4 md:space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-14 w-14 md:h-16 md:w-16">
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>JD</AvatarFallback>
                      </Avatar>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => toast.info('Upload avatar', { description: 'Feature coming soon' })}
                        className="px-3 md:px-4 py-1.5 md:py-2 rounded-lg bg-blue-500/20 border border-blue-500/20 hover:border-blue-500/40 text-blue-400 hover:text-blue-300 transition-all duration-300 text-xs md:text-sm font-medium"
                      >
                        Change Avatar
                      </motion.button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label className="text-xs md:text-sm text-white/70 mb-2 block">First Name</Label>
                        <Input
                          defaultValue="John"
                          className="bg-white/5 border-white/10 text-sm md:text-base text-white placeholder:text-white/40 focus:bg-white/10 focus:border-white/20"
                        />
                      </div>
                      <div>
                        <Label className="text-xs md:text-sm text-white/70 mb-2 block">Last Name</Label>
                        <Input
                          defaultValue="Doe"
                          className="bg-white/5 border-white/10 text-sm md:text-base text-white placeholder:text-white/40 focus:bg-white/10 focus:border-white/20"
                        />
                      </div>
                    </div>

                    <div>
                      <Label className="text-xs md:text-sm text-white/70 mb-2 block">Email</Label>
                      <Input
                        defaultValue="john@finflow.com"
                        className="bg-white/5 border-white/10 text-sm md:text-base text-white placeholder:text-white/40 focus:bg-white/10 focus:border-white/20"
                      />
                    </div>

                    <div>
                      <Label className="text-xs md:text-sm text-white/70 mb-2 block">Company</Label>
                      <Input
                        defaultValue="FinFlow Inc."
                        className="bg-white/5 border-white/10 text-sm md:text-base text-white placeholder:text-white/40 focus:bg-white/10 focus:border-white/20"
                      />
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleSave('Profile')}
                      className="w-full sm:w-auto px-4 md:px-6 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-sm md:text-base text-white font-medium transition-all duration-300"
                    >
                      Save Changes
                    </motion.button>
                  </div>
                </TabsContent>

                {/* Account Tab */}
                <TabsContent value="account" className="p-6 space-y-6">
                  <div className="space-y-4">
                    <div>
                      <Label className="text-white/70 mb-2 block">Current Password</Label>
                      <Input
                        type="password"
                        placeholder="••••••••"
                        className="bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:bg-white/10 focus:border-white/20"
                      />
                    </div>

                    <div>
                      <Label className="text-white/70 mb-2 block">New Password</Label>
                      <Input
                        type="password"
                        placeholder="••••••••"
                        className="bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:bg-white/10 focus:border-white/20"
                      />
                    </div>

                    <div>
                      <Label className="text-white/70 mb-2 block">Confirm Password</Label>
                      <Input
                        type="password"
                        placeholder="••••••••"
                        className="bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:bg-white/10 focus:border-white/20"
                      />
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleSave('Password')}
                      className="px-6 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium transition-all duration-300"
                    >
                      Update Password
                    </motion.button>

                    <div className="border-t border-white/10 pt-6 mt-6">
                      <h4 className="text-white font-semibold mb-4">Danger Zone</h4>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => toast.info('Account deletion', { description: 'Please contact support' })}
                        className="px-6 py-2 rounded-lg border border-red-500/20 hover:border-red-500/40 bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 font-medium transition-all duration-300"
                      >
                        Delete Account
                      </motion.button>
                    </div>
                  </div>
                </TabsContent>

                {/* Notifications Tab */}
                <TabsContent value="notifications" className="p-6 space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between rounded-lg border border-white/10 bg-white/[0.02] p-4">
                      <div>
                        <p className="font-medium text-white">Email Notifications</p>
                        <p className="text-sm text-white/50">Receive updates via email</p>
                      </div>
                      <Switch defaultChecked className="data-[state=checked]:bg-blue-500" />
                    </div>

                    <div className="flex items-center justify-between rounded-lg border border-white/10 bg-white/[0.02] p-4">
                      <div>
                        <p className="font-medium text-white">Transaction Alerts</p>
                        <p className="text-sm text-white/50">Alert for all transactions</p>
                      </div>
                      <Switch defaultChecked className="data-[state=checked]:bg-blue-500" />
                    </div>

                    <div className="flex items-center justify-between rounded-lg border border-white/10 bg-white/[0.02] p-4">
                      <div>
                        <p className="font-medium text-white">Weekly Reports</p>
                        <p className="text-sm text-white/50">Get weekly performance reports</p>
                      </div>
                      <Switch defaultChecked className="data-[state=checked]:bg-blue-500" />
                    </div>

                    <div className="flex items-center justify-between rounded-lg border border-white/10 bg-white/[0.02] p-4">
                      <div>
                        <p className="font-medium text-white">Security Alerts</p>
                        <p className="text-sm text-white/50">Important security notifications</p>
                      </div>
                      <Switch defaultChecked className="data-[state=checked]:bg-blue-500" />
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleSave('Notification preferences')}
                      className="px-6 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium transition-all duration-300"
                    >
                      Save Preferences
                    </motion.button>
                  </div>
                </TabsContent>

                {/* Billing Tab */}
                <TabsContent value="billing" className="p-6 space-y-6">
                  <div className="space-y-4">
                    <div className="rounded-lg border border-white/10 bg-white/[0.02] p-4">
                      <p className="text-sm text-white/50 mb-2">Current Plan</p>
                      <p className="text-2xl font-bold text-white mb-2">Professional</p>
                      <p className="text-sm text-white/50">$99/month • Renews on Feb 15, 2024</p>
                    </div>

                    <div>
                      <Label className="text-white/70 mb-2 block">Card Number</Label>
                      <Input
                        value="•••• •••• •••• 4242"
                        disabled
                        className="bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:bg-white/10 focus:border-white/20 disabled:opacity-50"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-white/70 mb-2 block">Expiry</Label>
                        <Input
                          value="12/25"
                          disabled
                          className="bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:bg-white/10 focus:border-white/20 disabled:opacity-50"
                        />
                      </div>
                      <div>
                        <Label className="text-white/70 mb-2 block">CVV</Label>
                        <Input
                          value="•••"
                          disabled
                          className="bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:bg-white/10 focus:border-white/20 disabled:opacity-50"
                        />
                      </div>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => toast.info('Update payment method', { description: 'Feature coming soon' })}
                      className="px-6 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium transition-all duration-300"
                    >
                      Update Payment Method
                    </motion.button>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </main>
      </PageTransition>
    </div>
  )
}

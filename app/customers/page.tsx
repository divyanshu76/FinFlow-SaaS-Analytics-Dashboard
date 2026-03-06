'use client'

import { useState, useEffect, useMemo, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Search, Mail, Phone } from 'lucide-react'
import { toast } from 'sonner'
import { Sidebar } from '@/components/sidebar'
import { Navbar } from '@/components/navbar'
import { PageTransition } from '@/components/page-transition'
import { EmptyState } from '@/components/empty-state'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

const customers = [
  {
    id: 1,
    name: 'Acme Corporation',
    email: 'contact@acme.com',
    phone: '+1 (555) 123-4567',
    revenue: '$125,000',
    status: 'Active',
    avatar: 'https://github.com/shadcn.png',
  },
  {
    id: 2,
    name: 'Global Tech Inc',
    email: 'hello@globaltech.com',
    phone: '+1 (555) 234-5678',
    revenue: '$98,500',
    status: 'Active',
    avatar: 'https://github.com/shadcn.png',
  },
  {
    id: 3,
    name: 'Innovation Labs',
    email: 'info@innolabs.com',
    phone: '+1 (555) 345-6789',
    revenue: '$76,200',
    status: 'Active',
    avatar: 'https://github.com/shadcn.png',
  },
  {
    id: 4,
    name: 'Digital Ventures',
    email: 'support@digitalventures.com',
    phone: '+1 (555) 456-7890',
    revenue: '$54,800',
    status: 'Inactive',
    avatar: 'https://github.com/shadcn.png',
  },
  {
    id: 5,
    name: 'CloudSoft Solutions',
    email: 'admin@cloudsoft.com',
    phone: '+1 (555) 567-8901',
    revenue: '$89,300',
    status: 'Active',
    avatar: 'https://github.com/shadcn.png',
  },
  {
    id: 6,
    name: 'Data Analytics Pro',
    email: 'team@datapro.com',
    phone: '+1 (555) 678-9012',
    revenue: '$112,400',
    status: 'Active',
    avatar: 'https://github.com/shadcn.png',
  },
  {
    id: 7,
    name: 'NextGen Systems',
    email: 'contact@nextgen.com',
    phone: '+1 (555) 789-0123',
    revenue: '$45,600',
    status: 'Pending',
    avatar: 'https://github.com/shadcn.png',
  },
  {
    id: 8,
    name: 'Enterprise Solutions',
    email: 'business@enterprise.com',
    phone: '+1 (555) 890-1234',
    revenue: '$156,700',
    status: 'Active',
    avatar: 'https://github.com/shadcn.png',
  },
]

export default function CustomersPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const handleAddCustomer = useCallback(() => {
    toast.success('Customer added', {
      description: 'New customer has been created',
    })
  }, [])

  const handleContactCustomer = useCallback((name: string) => {
    toast.info(`Contacting ${name}`, {
      description: 'Email will be sent shortly',
    })
  }, [])

  const filteredCustomers = useMemo(() => {
    return customers.filter((customer) => {
      const matchesSearch = customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           customer.email.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesStatus = statusFilter === 'all' || customer.status === statusFilter
      return matchesSearch && matchesStatus
    })
  }, [searchQuery, statusFilter])

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
                <h1 className="text-3xl font-bold text-white">Customers</h1>
                <p className="mt-1 text-white/50">Manage your customer relationships</p>
              </div>
              <Button
                onClick={handleAddCustomer}
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
              >
                Add Customer
              </Button>
            </div>

            {/* Filters */}
            <div className="flex gap-4 items-end">
              <div className="flex-1">
                <label className="text-sm text-white/70 mb-2 block">Search customers</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
                  <Input
                    placeholder="Search by name or email..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-white/5 border-white/10 pl-10 text-white placeholder:text-white/40 focus:bg-white/10 focus:border-white/20"
                  />
                </div>
              </div>

              <Button
                onClick={() => {
                  setSearchQuery('')
                  setStatusFilter('all')
                  toast.info('Filters reset', { description: 'Showing all customers' })
                }}
                variant="outline"
                className="border-white/20 hover:bg-white/10 text-white"
              >
                Reset
              </Button>
            </div>

            {/* Customers Grid */}
            {!isLoading ? (
              filteredCustomers.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredCustomers.map((customer) => (
                    <motion.div
                      key={customer.id}
                      whileHover={{ y: -4 }}
                      className="group rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.02] p-6 backdrop-blur-xl hover:border-white/20 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-blue-500/10 cursor-pointer"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-4">
                          <Avatar className="h-12 w-12">
                            <AvatarImage src={customer.avatar} />
                            <AvatarFallback>{customer.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="font-semibold text-white">{customer.name}</h3>
                            <p className="text-sm text-white/50">{customer.email}</p>
                          </div>
                        </div>
                        <Badge variant={customer.status === 'Active' ? 'default' : customer.status === 'Pending' ? 'secondary' : 'destructive'}>
                          {customer.status}
                        </Badge>
                      </div>

                      <div className="space-y-3 mb-4">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-white/50">Total Revenue</span>
                          <span className="font-semibold text-white">{customer.revenue}</span>
                        </div>
                        <div className="flex items-center gap-2 text-white/70">
                          <Phone className="h-4 w-4" />
                          <span className="text-sm">{customer.phone}</span>
                        </div>
                      </div>

                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleContactCustomer(customer.name)}
                        className="w-full rounded-lg bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/20 hover:border-blue-500/40 py-2 text-sm font-medium text-blue-400 hover:text-blue-300 transition-all duration-300"
                      >
                        <Mail className="inline mr-2 h-4 w-4" />
                        Send Email
                      </motion.button>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <EmptyState
                  icon={<Search className="h-12 w-12" />}
                  title="No customers found"
                  description="Try adjusting your search criteria"
                />
              )
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="h-48 rounded-2xl bg-white/5 animate-pulse" />
                ))}
              </div>
            )}

            {/* Summary */}
            {filteredCustomers.length > 0 && (
              <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.02] p-6 backdrop-blur-xl">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-sm text-white/50">Total Customers</p>
                    <p className="text-2xl font-bold text-white">{filteredCustomers.length}</p>
                  </div>
                  <div>
                    <p className="text-sm text-white/50">Active</p>
                    <p className="text-2xl font-bold text-green-400">
                      {filteredCustomers.filter((c) => c.status === 'Active').length}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-white/50">Inactive</p>
                    <p className="text-2xl font-bold text-red-400">
                      {filteredCustomers.filter((c) => c.status === 'Inactive').length}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-white/50">Pending</p>
                    <p className="text-2xl font-bold text-yellow-400">
                      {filteredCustomers.filter((c) => c.status === 'Pending').length}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </PageTransition>
    </div>
  )
}

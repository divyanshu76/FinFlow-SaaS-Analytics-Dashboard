'use client'

import { motion } from 'framer-motion'
import { Download, MoreVertical } from 'lucide-react'
import { toast } from 'sonner'
import { useState, useEffect, useCallback } from 'react'
import { Sidebar } from '@/components/sidebar'
import { Navbar } from '@/components/navbar'
import { PageTransition } from '@/components/page-transition'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

const reports = [
  {
    id: 1,
    name: 'Monthly Revenue Report',
    description: 'Comprehensive revenue analysis for January 2024',
    date: '2024-02-01',
    size: '2.4 MB',
    type: 'PDF',
    status: 'Ready',
  },
  {
    id: 2,
    name: 'Customer Acquisition Report',
    description: 'New customer metrics and trends',
    date: '2024-01-28',
    size: '1.8 MB',
    type: 'PDF',
    status: 'Ready',
  },
  {
    id: 3,
    name: 'Transaction Summary',
    description: 'Detailed transaction breakdown by category',
    date: '2024-01-25',
    size: '3.1 MB',
    type: 'Excel',
    status: 'Ready',
  },
  {
    id: 4,
    name: 'Annual Financial Report',
    description: 'Year-end financial summary and projections',
    date: '2024-01-15',
    size: '4.5 MB',
    type: 'PDF',
    status: 'Generating',
  },
  {
    id: 5,
    name: 'Performance Analytics',
    description: 'KPI tracking and performance metrics',
    date: '2024-01-10',
    size: '2.1 MB',
    type: 'PDF',
    status: 'Ready',
  },
]

export default function ReportsPage() {
  const [isClient, setIsClient] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const handleDownload = useCallback((reportName: string) => {
    toast.success(`${reportName} downloaded`, {
      description: 'File has been saved to your downloads folder',
    })
  }, [])

  const handleGenerateReport = useCallback(() => {
    toast.loading('Generating report...', {
      description: 'This may take a few moments',
    })
    setTimeout(() => {
      toast.success('Report generated', {
        description: 'New report is ready for download',
      })
    }, 2000)
  }, [])

  return (
    <div suppressHydrationWarning className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <Navbar onMenuClick={() => setSidebarOpen(true)} />

      <PageTransition>
        <main className="ml-0 md:ml-[260px] min-h-[calc(100vh-73px)] p-4 md:p-8">
          <div className="max-w-7xl mx-auto space-y-6 md:space-y-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-white">Reports</h1>
                <p className="mt-1 text-sm sm:text-base text-white/50">Download and manage your financial reports</p>
              </div>
              <Button
                onClick={handleGenerateReport}
                className="w-full sm:w-auto bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white text-sm sm:text-base"
              >
                Generate Report
              </Button>
            </div>

            {/* Reports List */}
            <div className="space-y-4">
              {reports.map((report, idx) => (
                <motion.div
                  key={report.id}
                  whileHover={{ y: -4 }}
                  className="group rounded-xl md:rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.02] p-4 md:p-6 backdrop-blur-xl hover:border-white/20 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-blue-500/10"
                >
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-sm md:text-base font-semibold text-white">{report.name}</h3>
                        <Badge variant={report.status === 'Ready' ? 'default' : 'secondary'} className="text-xs">
                          {report.status}
                        </Badge>
                      </div>
                      <p className="text-xs md:text-sm text-white/50 mb-3">{report.description}</p>
                      <div className="flex gap-4 text-xs text-white/40">
                        <span>{report.date}</span>
                        <span>•</span>
                        <span>{report.size}</span>
                        <span>•</span>
                        <span>{report.type}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 w-full sm:w-auto">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleDownload(report.name)}
                        disabled={report.status !== 'Ready'}
                        className="flex-1 sm:flex-none p-2 text-white/70 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Download className="h-5 w-5" />
                      </motion.button>
                      <div className="text-white/40 group-hover:text-white/60 transition-colors p-2">
                        <MoreVertical className="h-5 w-5" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </main>
      </PageTransition>
    </div>
  )
}

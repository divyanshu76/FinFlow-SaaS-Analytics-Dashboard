import { Skeleton } from '@/components/ui/skeleton'

export function ChartSkeleton() {
  return (
    <div className="h-80 w-full">
      <div className="flex h-full items-end justify-between gap-2 p-6">
        {Array.from({ length: 12 }).map((_, i) => (
          <Skeleton key={i} className="h-full flex-1" />
        ))}
      </div>
    </div>
  )
}

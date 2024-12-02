import { PopupData } from '@/types/map'

interface LocationDrawerProps {
  data: PopupData
}

export default function LocationDrawer({ data }: LocationDrawerProps) {
  return (
    <div>
      <pre>{JSON.stringify(data)}</pre>
    </div>
  )
}

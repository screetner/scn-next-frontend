
export type ActivityLogsResponse = {
  success: boolean
  data: ActivityLogs[]
}

export type ActivityLogs = {
  _id: string
  userId: string
  description: string
  status: string
  timestamp: string
}
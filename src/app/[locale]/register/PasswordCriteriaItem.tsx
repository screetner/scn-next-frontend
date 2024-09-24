import { CheckCircle, XCircle } from 'lucide-react'

export default function PasswordCriteriaItem({
  label,
  isMet,
}: {
  label: string
  isMet: boolean
}) {
  return (
    <li className="flex items-center space-x-2 text-sm">
      {isMet ? (
        <CheckCircle className="text-green-500" size={16} />
      ) : (
        <XCircle className="text-red-500" size={16} />
      )}
      <span>{label}</span>
    </li>
  )
}

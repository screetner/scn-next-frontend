import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Eye, EyeOff } from 'lucide-react'

interface PasswordInputProps {
  field: any
  placeholder?: string
  autoComplete?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const PasswordInput = ({
  field,
  placeholder = 'Password',
  autoComplete = 'current-password',
  onChange,
}: PasswordInputProps) => {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="relative">
      <Input
        {...field}
        placeholder={placeholder}
        type={showPassword ? 'text' : 'password'}
        autoComplete={autoComplete}
        autoCapitalize="none"
        onChange={e => {
          field.onChange(e)
          if (onChange) onChange(e)
        }}
      />
      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="absolute right-3 top-3 text-gray-500"
      >
        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
      </button>
    </div>
  )
}

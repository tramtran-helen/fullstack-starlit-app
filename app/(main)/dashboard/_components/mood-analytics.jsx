'use client'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useState } from 'react'





const timeOptions = [
  { value: '7d', label: 'Last 7 Days' },
  { value: '15d', label: 'Last 15 Days' },
  { value: '30d', label: 'Last 30 Days' },
]

const MoodAnalytics = () => {
  const [period, setPeriod] = useState('')

  return (
    <div>
      <h2 className="text-3xl text-purple-400 md:text-5xl lg:text-8xl mb-6 gradient-title">
        Dashboard
      </h2>

      <label className="text-purple-400 md:text-5xl lg:text-xl mb-6 gradient-title">Time Period</label>

      <Select value={period} onValueChange={setPeriod}>
        <SelectTrigger className="w-[160px] bg-purple-100 text-white focus:ring-2 focus:ring-purple-500 rounded-xl px-4 py-2">
          <SelectValue placeholder="Select days"/>
        </SelectTrigger>
        <SelectContent>
          {timeOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}

export default MoodAnalytics

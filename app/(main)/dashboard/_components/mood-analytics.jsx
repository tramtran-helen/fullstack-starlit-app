'use client'

import { getAnalytics } from "@/actions/analytics"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import useFetch from "@/hooks/use-fetch"
import { useUser } from "@clerk/nextjs"
import { useEffect, useState } from 'react'
import MoodAnalyticsSkeleton from "./analytics-loading"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getMoodById, getMoodTrend } from "@/app/lib/moods"
import { CartesianGrid, LineChart, ResponsiveContainer } from "recharts"
import { format, parseISO } from "date-fns"
import { XAxis, YAxis, Line, Tooltip, Legend } from "recharts"





const timeOptions = [
  { value: '7d', label: 'Last 7 Days' },
  { value: '15d', label: 'Last 15 Days' },
  { value: '30d', label: 'Last 30 Days' },
]

const MoodAnalytics = () => {
  const [period, setPeriod] = useState('7d')

  const {
    loading,
    data: analytics,
    fn: fetchAnalytics
  } = useFetch(getAnalytics)

  const { isLoaded } = useUser()

  useEffect(() => {
    fetchAnalytics(period)
  }, [period])

  if (loading || !analytics?.data || !isLoaded) {
    return <MoodAnalyticsSkeleton />
  }

  const { timeline, stats } = analytics.data

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload?.length) {
      return (
        <div className='bg-purple-50 p-4 border border-purple-300 rounded-lg shadow-lg'>
          <p className='text-purple-900 font-semibold'>{format(parseISO(label), 'MMM d, yyyy')}</p>
          <p className='text-purple-700'>Average Mood: {payload[0].value}</p>
          <p className='text-purple-600'>Entries: {payload[1].value}</p>
        </div>
      )
    }
    return null
  }

  return (
    <>
      <div>
        <h2 className="text-3xl text-purple-400 md:text-5xl lg:text-8xl mb-6 gradient-title">
          Dashboard
        </h2>

        <label className="text-3xl text-purple-400 md:text-5xl lg:text-xl mb-6 gradient-title">
          Time Period
        </label>

        <Select value={period} onValueChange={setPeriod}>
          <SelectTrigger className="w-[160px] bg-purple-100 text-purple-800 focus:ring-2 focus:ring-purple-500 rounded-xl px-4 py-2 hover:bg-purple-200 transition">
            <SelectValue placeholder="Select days" />
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

      <div className='grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-8'>
        <Card className="hover:shadow-lg hover:border-purple-400 transition duration-300">
          <CardHeader className='pb-2'>
            <CardTitle className='text-sm font-medium text-purple-700'>Total Entries</CardTitle>
          </CardHeader>
          <CardContent>
            <p className='text-3xl font-extrabold text-purple-800'>{stats.totalEntries}</p>
            <p className='text-xs text-purple-500'>~{stats.dailyAverage} entries per day</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg hover:border-purple-400 transition duration-300">
          <CardHeader className='pb-2'>
            <CardTitle className='text-sm font-medium text-purple-700'>Average Mood</CardTitle>
          </CardHeader>
          <CardContent>
            <p className='text-3xl font-extrabold text-purple-800'>{stats.averageScore}/10</p>
            <p className='text-xs text-purple-500'>~{stats.dailyAverage} entries per day</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg hover:border-purple-400 transition duration-300">
          <CardHeader className='pb-2'>
            <CardTitle className='text-sm font-medium text-purple-700'>Mood Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-purple-700 font-semibold text-lg flex items-center gap-2">
              {getMoodById(stats.mostFrequentMood)?.emoji ?? '❓'}{' '}
              {getMoodTrend(stats.averageScore)}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle className="text-purple-700 font-semibold">Mood Timeline</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='h-[300px] w-full'>
            <ResponsiveContainer width='100%' height='100%'>
              <LineChart data={timeline} margin={{ top: 5, right: 30, left: 30, bottom: 5 }}>
                <CartesianGrid strokeDasharray='3 3' stroke="#ddd6fe" />
                <XAxis
                  dataKey='date'
                  tickFormatter={(date) => format(parseISO(date), 'MMM d')}
                  tick={{ fill: '#6b21a8' }} // purple-800
                  axisLine={{ stroke: '#a78bfa' }} // purple-400
                  tickLine={{ stroke: '#a78bfa' }}
                />
                <YAxis
                  yAxisId='left'
                  domain={[0, 10]}
                  tick={{ fill: '#6b21a8' }}
                  axisLine={{ stroke: '#a78bfa' }}
                  tickLine={{ stroke: '#a78bfa' }}
                />
                <YAxis
                  yAxisId='right'
                  orientation='right'
                  domain={[0, 'auto']}
                  tick={{ fill: '#6b21a8' }}
                  axisLine={{ stroke: '#a78bfa' }}
                  tickLine={{ stroke: '#a78bfa' }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend wrapperStyle={{ color: '#6b21a8', fontWeight: 'bold' }} />
                <Line
                  yAxisId='left'
                  type='monotone'
                  dataKey='averageScore'
                  stroke='#7c3aed' // violet-600
                  name='Average Mood'
                  strokeWidth={3}
                  dot={{ stroke: '#7c3aed', strokeWidth: 2, fill: '#c4b5fd' }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </>
  )
}

export default MoodAnalytics

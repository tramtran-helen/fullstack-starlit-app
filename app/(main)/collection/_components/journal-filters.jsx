'use client'

import { useState, useEffect } from "react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { MOODS } from "@/app/lib/moods"
import { Input } from "@/components/ui/input"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import EntryCard from "../../dashboard/entry-card"
import { Search, Calendar1Icon } from "lucide-react"





const JournalFilters = ({ entries }) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedMood, setSelectedMood] = useState('')
  const [date, setDate] = useState(null)
  const [filteredEntries, setFilteredEntries] = useState(entries)

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedMood('');
    setDate(null);
  }

  useEffect(() => {
    const filtered = entries.filter(entry => {
      const matchesSearch = entry.title?.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesMood = selectedMood ? entry.mood === selectedMood : true;
      const matchesDate = date
        ? new Date(entry.createdAt).toDateString() === date.toDateString()
        : true;
      return matchesSearch && matchesMood && matchesDate;
    });
    setFilteredEntries(filtered);
  }, [searchQuery, selectedMood, date, entries]);

  return (
    <>
      <div className='flex flex-wrap gap-4'>
        <div className='flex-1 min-w-[200px]'>
          <Input
            placeholder='Search for your entries...'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className='w-full'
          />
        </div>

        <Select value={selectedMood} onValueChange={setSelectedMood}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Filter by Mood" />
          </SelectTrigger>
          <SelectContent>
            {Object.values(MOODS).map((mood) => (
              <SelectItem key={mood.id} value={mood.id}>
                <span className='flex items-center gap-2'>{mood.emoji} {mood.label}</span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant='outline'
              className={cn(
                'justify-start text-left font-normal',
                !date && 'text-muted-foreground'
              )}
            >
              <Calendar1Icon className='h-4 w-4 mr-2' />
              {date ? format(date, 'PPP') : <span>Pick a Date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className='w-auto p-0'>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              initialFocus
            />
          </PopoverContent>
        </Popover>

        {(searchQuery || selectedMood || date) && (
          <Button variant='ghost' className='text-purple-600' onClick={clearFilters}>
            Clear Filters
          </Button>
        )}
      </div>

      <div className='text-sm gradient-title mt-4'>
        Showing {filteredEntries.length} of {entries.length} entries
      </div>

      {filteredEntries.length === 0 ? (
        <div className='text-center p-8'>
          <p className='text-purple-500'>No entries found</p>
        </div>
      ) : (
        <div className='grid gap-4 mt-4'>
          {filteredEntries.map((entry) => (
            <EntryCard key={entry.id} entry={entry} />
          ))}
        </div>
      )}
    </>
  )
}

export default JournalFilters

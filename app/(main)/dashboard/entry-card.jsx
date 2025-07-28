import { Card, CardContent } from '@/components/ui/card'
import Link from 'next/link'
import { format } from 'date-fns'





const EntryCard = ({ entry }) => {
    return <Link href={`/journal/${entry.id}`}>
        <Card className='hover:shadow-md transition-shadow'>
            <CardContent className='p-6'>
                <div className='flex items-start justify-between'>
                    <div className='space-y-2'>
                        <div className='flex items-center gap-2'>
                            <span className='text-2xl'>{entry.moodData.emoji}</span>
                            <h3 className='font-semibold text-lg'>{entry.title}</h3>
                        </div>
                    </div>
                    <div dangerouslySetInnerHTML={{ __html: entry.content }}/>
                    <time className='text-sm text-purple-500'>{format(new Date(entry.createdAt), 'MMM d, yyyy')}</time>
                </div>
            </CardContent>
        </Card>
    </Link>
}

export default EntryCard
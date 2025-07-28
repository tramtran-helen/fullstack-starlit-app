'use client'

import react, { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import 'react-quill-new/dist/quill.snow.css'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { journalSchema } from '@/app/lib/schema'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { getMoodById, MOODS } from '@/app/lib/moods'
import { BarLoader } from 'react-spinners'
import { Button } from '@/components/ui/button'
import useFetch from '@/hooks/use-fetch'
import { createJournalEntry } from '@/actions/journal'
import { toast } from 'sonner'
import { getCollections } from '@/actions/collection'
import { createCollection } from '@/actions/collection'
import CollectionForm from '@/components/forms'
import { useRouter } from 'next/navigation'





const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false })



const JournalEntryPage = () => {

  const {loading: actionLoading, fn: actionFn, data: actionResult} = useFetch(createJournalEntry)
  const [isCollectionDialogOpen, setIsCollectionDialogOpen] = useState(false)
  const {loading: collectionsLoading, fn: fetchCollections, data: collections} = useFetch(getCollections)
  const {loading: createCollectionLoading, fn: createCollectionFn, data: createdCollection} = useFetch(createCollection)
  const router = useRouter()


  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    getValues
  } = useForm({
    resolver: zodResolver(journalSchema),
    defaultValues: {
      title: '',
      content: '',
      mood: '',
      collectionId: '',
    },
  })


  useEffect(() => {
    fetchCollections()
  }, [])

  useEffect(() => {
    if (actionResult && !actionLoading) {
        router.push(`/collection/${actionResult.collectionId?actionResult.collectionId:'unorganized'}`)

        toast.success(`Entry created successfully`)
    }
  }, [actionResult, actionLoading])

  const onSubmit = handleSubmit(async(data) => {
    const mood = getMoodById(data.mood)
    actionFn({
        ...data, 
        moodScore: mood.score,
        moodQuery: mood.pixabayQuery,
    })
  })

  const handleCreateCollection = async(data) => {
    createCollection(data)
  }

  const isLoading = actionLoading || collectionsLoading



  return (
  
    <div className='py-8'> 
      <form onSubmit={onSubmit}>
        <h1 className='text-3xl text-purple-400 md:text-5xl lg:text-8xl mb-6 gradient-title'>
          💫 What little star of a thought is shining today?
        </h1>



        {isLoading && <BarLoader color='purple' width={'100%'} />}



        <div className='max-w-full bg-purple-100 bg-opacity-30 rounded-2xl shadow-md p-4 space-y-2'>
          <label className='text-purple-800 font-semibold text-sm font-bold'>Title</label>
          <Input
            disabled={isLoading}
            {...register('title')}
            placeholder='Name your little story 🧸'
            className={`w-full py-5 text-md rounded-xl border-2 bg-white bg-opacity-70 placeholder:text-purple-300 focus:ring-4 focus:ring-purple-300 focus:border-purple-500 focus:outline-none transition-shadow duration-200 ${
              errors.title ? 'border-purple-500' : 'border-purple-700'
            }`}
            />
            {
                errors.title && (
                    <p className='text-purple-500 text-sm'>{errors.title.message}</p>
                )
            }
        </div>



        <div className='max-w-full bg-purple-100 bg-opacity-30 rounded-2xl shadow-md p-4 mt-6 space-y-2'>
          <label className='text-purple-800 font-semibold text-sm font-bold'>
            What’s been quietly shining or stirring in you lately?
          </label>

          <Controller
            control={control}
            name='mood'
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value || ''}>
                <SelectTrigger className="w-full py-5 text-md font-normal rounded-xl border-2 border-purple-700 bg-white bg-opacity-70 focus:ring-2 focus:ring-purple-400 focus:outline-none">
                  <SelectValue placeholder={<span className="text-purple-300 font-semibold text-sm">Select your theme of the day 🌿</span>}/>
                </SelectTrigger>
                <SelectContent>
                  {Object.values(MOODS).map((mood) => (
                    <SelectItem key={mood.id} value={mood.id}>
                      <span>
                        {mood.emoji} {mood.label}
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {
                errors.mood && (
                    <p className='text-purple-500 text-sm'>{errors.mood.message}</p>
                )
            }
        </div>



        <div className='max-w-full bg-purple-100 bg-opacity-30 rounded-2xl shadow-md p-4 mt-6 space-y-2'>
          <label className='text-purple-800 font-semibold text-sm font-bold'>
            {getMoodById(getValues('mood'))?.prompt??'Let your thoughts wander here ✨'}
          </label>

          <Controller
            control={control}
            name='content'
            render={({ field }) => (
                <ReactQuill readOnly={isLoading} theme='snow' value={field.value} onChange={field.onChange} 
                modules={{
                    toolbar: [
                        [{ font: [] }],                             
                        [{ size: ['small', false, 'large', 'huge'] }],  
                        ['bold', 'italic', 'underline', 'strike'],  
                        [{ script: 'sub' }, { script: 'super' }],   
                        [{ color: [] }, { background: [] }],        
                        [{ list: 'ordered' }, { list: 'bullet' }],  
                        [{ indent: '-1' }, { indent: '+1' }],       
                        [{ direction: 'rtl' }],                    
                        [{ align: [] }],                           
                        ['blockquote', 'code-block'],               
                        ['link', 'image', 'video'],            
                        ['clean']                             
                    ]
                }} className="quill-editor"/>
            )}
          />
          {
                errors.content && (
                    <p className='text-purple-500 text-sm'>{errors.content.message}</p>
                )
            }
        </div>



        <div className='max-w-full bg-purple-100 bg-opacity-30 rounded-2xl shadow-md p-4 mt-6 space-y-2'>
          <label className='text-purple-800 font-semibold text-sm font-bold'>
            Choose Your Collection Here (Optional)
          </label>

          <Controller
            control={control}
            name='collectionId'
            render={({ field }) => (
                <Select onValueChange={(value) => {
                    if (value === 'new') {
                        setIsCollectionDialogOpen(true)
                    } else {
                        field.onChange(value)
                    }
                }} value = {field.value}>
                <SelectTrigger className="w-full py-5 text-md font-normal rounded-xl border-2 border-purple-700 bg-white bg-opacity-70 focus:ring-2 focus:ring-purple-400 focus:outline-none">
                  <SelectValue placeholder={<span className="text-purple-300 font-semibold text-sm">Select or create new collection here 🌸</span>}/>
                </SelectTrigger>
                <SelectContent>
                  {(collections ?? []).map((collection) => (
                    <SelectItem key={collection.id} value={collection.id}>
                        {collection.name}
                    </SelectItem>
                  ))}
                <SelectItem value='new'>
                    <span>
                        Create New Collection!
                    </span>
                </SelectItem>
                </SelectContent>
              </Select>
            )}
            />
          {
                errors.collectionId && (
                    <p className='text-purple-500 text-sm'>{errors.collectionId.message}</p>
                )
            }
        </div>



        <div className='space-y-4 flex mt-6'>
            <Button type='submit' className='px-6 py-3 bg-purple-600 text-white font-semibold rounded-xl hover:bg-purple-700 transition'>Go Live</Button>
        </div>
      </form>



      <CollectionForm 
      loading={createCollectionLoading} 
      onSuccess={handleCreateCollection}
      open={isCollectionDialogOpen} 
      setOpen={setIsCollectionDialogOpen}/>
    </div>
  )
}

export default JournalEntryPage

'use client'

import react from 'react'
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





const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false })



const JournalEntryPage = () => {
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



  const isLoading = false
  const onSubmit = handleSubmit(async(data) => {
    console.log(data)
  })



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
            className={`w-full py-5 text-md rounded-xl border-2 bg-white bg-opacity-70 placeholder:text-purple-300 focus:ring-2 focus:ring-purple-400 focus:outline-none ${
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
                <Input
                disabled={isLoading}
                {...field}
                placeholder='Optional Collection ID'
                className='w-full py-5 text-md rounded-xl border-2 bg-white bg-opacity-70 placeholder:text-purple-300 focus:ring-2 focus:ring-purple-400 focus:outline-none border-purple-700'
                />
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
    </div>
  )
}

export default JournalEntryPage

import { Button } from "@/components/ui/button"
import { Image, Lock, Sparkles } from "lucide-react"
import Link from 'next/link'




const features = [
  {
    icon: Image,
    title: 'Quick Entry & AI-Powered Images',
    description: 'Easily capture your thoughts on the go with fast text entry and AI-created images that reflect your emotions visually.'
  },
  {
    icon: Sparkles,
    title: 'Mood Analytics',
    description: 'Track your emotional patterns over time with built-in mood logging and insightful visualizations to help you understand and improve your mental well-being.'
  },
  {
    icon: Lock,
    title: 'Secure & Private',
    description: 'Your journal and mood data are protected with security and privacy, ensuring only you have access to your personal reflections.'
  }
]



export default function Home() {
  return(
    <div className='relative container mx-auto px-4 pt-16 pb-16'>
      <div className='max-w-5xl mx-auto text-center space-y-8'>
        <h1 className='text-5xl text-purple-400 md:text-7xl lg:text-8xl mb-6 gradient-title'>Every Star Has A Story - Write Yours</h1>
        <p className='text-purple-400 gradient-title'>StarLit is a cozy space to capture your thoughts, reflect on your feelings, and gently track your mood over time. 
          <br />Your inner world, beautifully illuminated.</p>

        

        <div className='flex justify-center gap-4'>
          <Link href='/dashboard'>
            <Button variant='outline' className='px-8 py-6 rounded-full flex items-center gap-2'>
                Start Journaling
            </Button>
          </Link>
          <Link href='#features'>
            <Button variant='outline' className='px-8 py-6 rounded-full flex items-center gap-2'>
                More About StarLit
            </Button>
          </Link>
        </div>
      </div>



      <section id='features'>
        {features.map((feature, index) => (
          
        ))}
      </section>
    </div>
  )
}

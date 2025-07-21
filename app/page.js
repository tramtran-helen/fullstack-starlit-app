import { Button } from "@/components/ui/button"
import { Image, Lock, Sparkles } from "lucide-react"
import Link from 'next/link'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"





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



      <section id='features' className='mt-24 grid md:grid-cols-3 gap-8'>
        {features.map((feature, index) => (
          <Card key={feature.title} className='shadow-lg'>
            <CardContent className='p-6'>
              <div className='h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center mb-4'>
                <feature.icon className='h-6 w-6 text-purple-600' />
              </div>
              <h3 className='font-semibold text-xl text-purple-900 mb-2'>{feature.title}</h3>
              <p className='text-black font-normal'>{feature.description}</p>
            </CardContent>
          </Card>
        ))}
      </section>



      <div className='mt-24'>
        <Card className='bg-gradient-to-r from-purple-100 to-purple-200'>
          <CardContent className='p-12 text-center'>
            <h2 className='text-3xl font-bold text-purple-900 mb-6'>
              It's Time to Document Your Sky
            </h2>
            <p className='text-lg font-normal text-black mb-8 max-w-2xl mx-auto'>
              Let the stars be your witness as you document your highs, your lows, and all the beautiful in-betweens. StarLit offers a calm digital retreat where your story is yours to write and revisit.
            </p>
            <Link href='/dashboard'>
              <Button size='lg' variant='outline' className='animate-bounce text-purple-900 font-semibold'>
                Get Started for Free!
              </Button>
            </Link>
          </CardContent>
        </Card>

      </div>
    </div>
  )
}

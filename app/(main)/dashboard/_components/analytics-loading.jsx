const { Card, CardHeader, CardContent } = require("@/components/ui/card")
const { Skeleton } = require("@/components/ui/skeleton")




const MoodAnalyticsSkeleton = () => {
    return(
        <div className='space-y-6'>
            <Skeleton className='h-12 w-60'/>

            <div className='grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
                {[1, 2, 3].map((i) => (
                    <Card key={i}>
                        <CardHeader className='pb-2'>
                            <Skeleton className='h-4 w-24' />
                        </CardHeader>
                        <CardContent>
                            <Skeleton className='h-8 w-16 mb-1'/>
                            <Skeleton className='h-3 w-32'/>
                        </CardContent>
                    </Card>
                ))} 
            </div>


            <Card>

            </Card>

        </div>
    )
}

export default MoodAnalyticsSkeleton
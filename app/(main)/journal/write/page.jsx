import react from 'react'
import 'react-quill-new/dist/quill.snow.css'
import dynamic from 'next/dynamic'





const ReactQuill = dynamic(() => import('react-quill-new'), {ssr: false})

const JournalEntryPage = () => {
    return(
        <div>
            <form></form>
        </div>
    )
}

export default JournalEntryPage
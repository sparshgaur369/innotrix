'use client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogClose, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Textarea } from '@/components/ui/textarea'
import useProject from '@/hooks/use-project'
// import { DialogContent } from '@radix-ui/react-dialog'
import { DialogContent } from '@/components/ui/dialog'
import Image from 'next/image'
import React from 'react'
import { askQuestion } from './actions'
import { readStreamableValue } from 'ai/rsc'
import MDEditor from '@uiw/react-md-editor'
import CodeReferences from './code-references'
import { api } from '@/trpc/react'
import { toast } from 'sonner'
import useRefetch from '@/hooks/use-refetch'

const AskQuestionCard = () => {
    const {project} = useProject()
    const [open,setOpen] = React.useState(false)
    const [loading,setLoading] = React.useState(false)
    const [question, setQuestion] = React.useState('')
    const [filesReferences,setFilesReferences] = React.useState<{fileName: string; sourceCode: string; summary: string}[]>([])
    const [answer,setAnswer] = React.useState('')
    const saveAnswer = api.project.saveAnswer.useMutation()
    
    const onSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
        setAnswer('')
        setFilesReferences([])
        e.preventDefault()
        if(!project?.id) return  
        setLoading(true)
        //window.alert(question)
        // setOpen(true)

        const {output, filesReferences} = await askQuestion(question,project.id)
        setOpen(true)
        setFilesReferences(filesReferences)

        for await ( const delta of readStreamableValue(output)){
            if(delta) {
                setAnswer(ans => ans+delta)
            }
        }
        setLoading(false)
    }
    const refetch = useRefetch()
  return (
    <>
    {/* <Dialog
        open={open}
        onOpenChange={setOpen}
         >

    
        <DialogContent className='sm:max-w-[80vw]'>

        <DialogHeader>
                <DialogTitle>
                    <Image src='/logo.png' alt='Innotrix' width={40} height={40}/>
                </DialogTitle>
        </DialogHeader> 
<MDEditor.Markdown source={answer} className='max-w-[70vw] !h-full max-h-[40vh] overflow-scroll'/>
<div className="h-4"></div>
<CodeReferences filesReferences={filesReferences}/>

<Button type='button' onClick={() => {setOpen(false)}}>
Close
</Button>
        
        
        
        </DialogContent>

    </Dialog> */}
    
    <Card className='relative col-span-3'>
    
        <CardHeader className='flex items-center justify-center'>
            <CardTitle>Ask a question!</CardTitle>
        </CardHeader>
        <Dialog
        open={open}
        onOpenChange={setOpen}
         >

    
        <DialogContent className='sm:max-w-[80vw] max-h-screen overflow-y-auto custom-scrollbar'>

        <DialogHeader>
            <div className='flex items-center gap-2'>
            <DialogTitle>
                    {/* <Image src='/logo.png' alt='Innotrix' width={40} height={40}/> */}
                    {/* <h2>Innotrix</h2> */}
                </DialogTitle>
                <Button disabled={saveAnswer.isPending} variant={'outline'} onClick={()=>{
                    saveAnswer.mutate({
                        projectId: project!.id,
                        question,
                        answer,
                        filesReferences
                    }, {
                        onSuccess: () => {
                            toast.success('Answer Saved!')
                            refetch()
                        }, 
                        onError: () => {
                            toast.error('Failed to save the answer!')
                        }
                    })
                }}>
                    Save Answer

                </Button>

            </div>
                
        </DialogHeader> 
        <div className="h-4"></div>
<MDEditor.Markdown source={answer} className='max-w-[70vw] ml-2 mr-2 rounded-md !h-full max-h-[40vh] overflow-y-auto !bg-white !text-black '/>
<div className="h-4"></div>
<CodeReferences filesReferences={filesReferences}/>
<div className="h-4"></div>

<div className="flex items-center justify-center">
  <Button type='button' onClick={() => {setOpen(false)}}>
    Close
  </Button>
</div>
        
<div className="h-4"></div>
        
        </DialogContent>

    </Dialog>
        <CardContent>
            <form onSubmit={onSubmit}>
                <Textarea placeholder='Which file should I edit to change the ' value={question} onChange={e=> setQuestion(e.target.value)}/>
                <div className="h-4"></div>
                <Button type='submit' disabled={loading}>
                    Ask Innotrix!
                </Button>
                
            </form>
        </CardContent>
    </Card>
    <style jsx global>{`
        .overflow-y-auto::-webkit-scrollbar {
          width: 8px;
        }

        .overflow-y-auto::-webkit-scrollbar-thumb {
          background-color: #4c4c4c;
          border-radius: 10px;
          border: 2px solid #ffffff;
        }

        .overflow-y-auto::-webkit-scrollbar-track {
          background-color: #f1f1f1;
          border-radius: 10px;
        }

        .overflow-y-auto::-webkit-scrollbar-thumb:hover {
          background-color: #888;
        }

        .overflow-y-auto::-webkit-scrollbar-thumb:active {
          background-color: #555;
        }
      `}</style>
    </>
  )
}

export default AskQuestionCard
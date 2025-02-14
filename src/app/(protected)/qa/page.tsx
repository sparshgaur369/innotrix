// 'use Client'

// import { Sheet } from '@/components/ui/sheet'
// import useProject from '@/hooks/use-project'
// import { api } from '@/trpc/react'
// import React from 'react'
// import AskQuestionCard from '../dashboard/ask-question-card'

// const QAPAge = () => {
//   const {projectId} = useProject()
//   const {data: questions} = api.project.getQuestions.useQuery({projectId})
//   return (
//     <Sheet> 
//       <AskQuestionCard/>
//     </Sheet>
//   )
// }

// export default QAPAge
'use client'

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import useProject from '@/hooks/use-project'
import { api } from '@/trpc/react'
import React from 'react'
import AskQuestionCard from '../dashboard/ask-question-card'
import MDEditor from '@uiw/react-md-editor'
import CodeReferences from '../dashboard/code-references'

const QAPAge = () => {
  const { projectId } = useProject()
  const [questionIndex,setQuestionIndex] = React.useState(0)

  // Only run the query if projectId is defined
  const { data: questions } = api.project.getQuestions.useQuery(
    { projectId },
    { enabled: !!projectId } // Query only runs if projectId is truthy
  )
  const question = questions?.[questionIndex]

  

  if (!projectId) {
    return <div>Loading...</div> // Show loading or error message if projectId is not available
  }
  

  return (
    <Sheet> 
      <AskQuestionCard />
      <div className="h-4"></div>
      <h1 className='text-xl font-semibold'>Saved Questions</h1>
      <div className="h-2"></div>
      <div className='flex flex-col gap-2'>
        {questions?.map((question,index)=> {
          return <React.Fragment key={question.id}>
            <SheetTrigger onClick={() => setQuestionIndex(index)}>

              <div className='flex items-center gap-4 bg-white rounded-lg p-4 shadow border'>
                <img className='rounded-full' height={30} width={30} src={question.user.imageUrl ?? ""}/>

                <div className='text-left flex flex-col'>
                  <div className='flex items-center gap-2'>
                    <p className='text-gray-700 line-clamp-1 text-lg font-medium'>
                      {question.question}
                    </p>
                    <span className='text-xs text-gray-400 whitespace-nowrap'> 
                      {question.createdAt.toLocaleDateString()}

                    </span>

                  </div>
                  <p className='text-gray-500 line-clamp-1 text-sm'>
                    {question.answer}

                  </p>

                </div>

              </div>

            </SheetTrigger>
          </React.Fragment>
        })}
      </div>

      {question && (
        <SheetContent className='sm:max-w-[80vw] overflow-y-auto'>
          <SheetHeader>
            <SheetTitle>
              {question.question}
            </SheetTitle>
            <MDEditor.Markdown source={question.answer} className='!bg-white !text-black '/>
            <CodeReferences filesReferences={(question.filesReferences ?? []) as any}/>
          </SheetHeader>

        </SheetContent>
      )}
    </Sheet>
  )
}

export default QAPAge

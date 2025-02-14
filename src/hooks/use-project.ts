import { api } from '@/trpc/react'
import React from 'react'
import { useLocalStorage} from 'usehooks-ts'

const useProject = () => {
  
    const {data: projects,error, isLoading } = api.project.getProjects.useQuery()
    const [projectId, setProjectId] =  useLocalStorage ('innotrix-projectId', ' ')
    const project = projects?.find((project) => project.id === projectId)
     return { 
      projects,
      project,
      projectId,
      setProjectId
     }
  
}

export default useProject

// import { api } from '@/trpc/react'
// import React from 'react'
// import { useLocalStorage } from 'usehooks-ts'

// const useProject = () => {
//   // Always call hooks in the same order
//   const { data: projects, error, isLoading } = api.project.getProjects.useQuery()

//   // Log error if any
//   React.useEffect(() => {
//     if (error) {
//       console.error('Error fetching projects:', error)
//     }
//   }, [error])

//   // Handle loading state
//   if (isLoading) return { projects: [], project: null, projectId: '', setProjectId: () => {} }

//   // Local storage hook (called unconditionally)
//   const [projectId, setProjectId] = useLocalStorage('innotrix-projectId', ' ')

//   // Find the project based on projectId
//   const project = projects?.find((project) => project.id === projectId)

//   return { 
//     projects,
//     project,
//     projectId,
//     setProjectId
//   }
// }

// export default useProject


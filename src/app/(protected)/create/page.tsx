'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { api } from '@/trpc/react'
import React from 'react'
import { useForm } from 'react-hook-form'
import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import { Toast } from '@radix-ui/react-toast'
import useRefetch from '@/hooks/use-refetch'




type FormInput = {
    repoUrl: string
    projectName: string
    githubToken?: string
}

const CreatePage = () => {
    const {register, handleSubmit, reset} = useForm<FormInput>()
    const createProject = api.project.createProject.useMutation()
    const refetch = useRefetch() 

    function onSubmit(data: FormInput) {
        // window.alert(JSON.stringify(data,null,2))
        createProject.mutate({
            githubUrl: data.repoUrl,
            name: data.projectName,
            githubToken: data.githubToken
        }, {
            onSuccess: () => {
                toast.success('Project Create Successfully')
                refetch()
            }, 
            onError: () => {
                toast.error('Failed to create project')
            } 

        })
        return true; 
    }
  return (
    <>
    
    <div className='flex items-center gap-12 h-full justify-center'>
        <img src='/undraw_programmer_raqr.svg' className='h-56 w-auto'/>
        <div >
            <div>
                <h1 className='font-semibold text-2xl'>
                    Link your GitHub Repository

                </h1>
                <p className='text-sm text-muted-foreground'>
                    Enter the URL of your repository to link it to Innotrix

                </p>
            </div>
            <div className='h-4'>

            </div>
            <div>
                <form onSubmit = {handleSubmit(onSubmit)} action="">
                    <Input required 
                    {...register('projectName',{required:true})}
                    placeholder='Project Name'
                    />
                    <div className="h-2"> </div>
                    <Input required 
                    {...register('repoUrl',{required:true})}
                    placeholder='Repository URL'
                    type='url'
                    />
                    <div className="h-2"> </div>
                    <Input  
                    {...register('githubToken')}
                    placeholder='Github Token(optional)'
                    />
                    <div className="h-4"></div>
                    <Button type='submit' disabled={createProject.isPending} >
                        Create Project
                    </Button>
                    

                </form>
            </div>
        </div>
    </div>
    </>
  )
}

export default CreatePage
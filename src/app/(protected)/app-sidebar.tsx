'use client'

import {Sidebar, SidebarHeader,SidebarContent,SidebarGroup, SidebarGroupLabel, SidebarGroupContent, SidebarMenuItem, SidebarMenuButton, SidebarMenu, useSidebar } from "@/components/ui/sidebar"
// import { Sidebar } from "lucide-react"
import { Bot, CreditCard, LayoutDashboard, Plus, Presentation } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import useProject from "@/hooks/use-project"


const items = [
    {
        title:"Dashboard",
        url: "/dashboard",
        icon: LayoutDashboard,
    },
    {
        title:"QnA",
        url: "/qa",
        icon: Bot,
    },
    // {
    //     title:"Meetings",
    //     url: "/meetings",
    //     icon: Presentation,
    // },
    // {
    //     title:"Billing",
    //     url: "/billing",
    //     icon: CreditCard,
    // },

]

// const projects = [ 
//     {
//         name:'Project 1'
//     },
//     {
//         name:'Project 2'
//     },
//     {
//         name:'Project 3'
//     },
//     {
//         name:'Project 4'
//     },
// ]

export function AppSidebar(){
    const pathname = usePathname()
    const {open} = useSidebar()
    const {projects, projectId, setProjectId} = useProject()
    return (
        <Sidebar collapsible="icon" variant="floating"   > 
            <SidebarHeader>
                {open && (
                    <h2 className="pl-16">Innotrix</h2>

                )}
                
                {/* <div className="flex items-center gap-2">
                    <Image src='/logo.png '>
                        
                </div> */}
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>
                        Application
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                        {items.map(item=>{
                            return (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <Link href={item.url} className={cn({
                                            '!bg-primary !text-white' : pathname === item.url
                                        }, 'list-none')}> 
                                        <item.icon/>
                                        <span>{item.title}</span>
                                        </Link>

                                    </SidebarMenuButton>

                                </SidebarMenuItem>
                            )
                        })}
                        </SidebarMenu>

                    </SidebarGroupContent>
                </SidebarGroup>

                <SidebarGroup>
                    <SidebarGroupLabel>
                        Your Projects
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {projects?.map(project=>{
                                return (
                                    <SidebarMenuItem key={project.name}>
                                        <SidebarMenuButton asChild>
                                            <div onClick={()=>{
                                                setProjectId(project.id)
                                            }}>
                                                <div className={cn(
                                                    'rounded-sm border size-6 flex items-center justify-center text-sm bg-white text-primary ',
                                                    { 
                                                        'bg-primary text-white' : project.id === projectId

                                                    }
                                                )}>
                                                    {project.name[0]}


                                                </div>
                                                <span>{project.name}</span>
                                            </div>

                                        </SidebarMenuButton>

                                    </SidebarMenuItem>
                                )
                            })}
                            <div className="h-2"> </div>
                            {open && (
                                <SidebarMenuItem>
                                <Link href='/create'>
                                <Button size='sm' variant={"outline"} className="w-fit">
                                    <Plus/>
                                    Create Project 
                                </Button>
                                </Link>
                                </SidebarMenuItem>

                            )}
                            
                            

                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>


            </SidebarContent>
        </Sidebar>

    )
}
'use client'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Presentation } from 'lucide-react'
import React from 'react'

const MeetingsCard = () => {
  const handleCreateMeeting = () => {
    // Redirect to Google Meet
    window.location.href = "https://meet.google.com"; // Or any specific Meet URL if available
  };

  return (
    <Card className='col-span-2 flex flex-col items-center justify-center'>
        <Presentation className='h-10 w-10 animate-bounce'/>
        <h3>Create a new meeting</h3>
        <Button onClick={handleCreateMeeting}>
            Create
        </Button>
    </Card>
  )
}

export default MeetingsCard

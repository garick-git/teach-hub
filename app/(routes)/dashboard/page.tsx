"use client"

import React, { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useSearchParams } from 'next/navigation';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import PeriodsTable from '@/components/Periods';
import Link from 'next/link'


export default function Dashboard() {
  const [periodName, setPeriodName] = useState('')
  const [periodNumber, setPeriodNumber] = useState(0)
  const searchParams = useSearchParams();
  const userId = searchParams.get('afhsfekhugda;ioh');
  
  const numbers = Array.from({ length: 12 }, (_, i) => i + 1);;

  const handleStringToInt = (value: string) => {
    setPeriodNumber(parseInt(value))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(userId)
  
    // Prepare the data object to be sent in the request body
    const data = {
      name: periodName,
      number: periodNumber,
      teacher: userId, // Replace 'user-id-here' with the actual user ID
      students: [], // Initially an empty array
    };
  
    try {
      // Make the API call to create a new period entry
      const response = await fetch('/api/edit-periods', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
  
      if (!response.ok) {
        throw new Error('Failed to create period entry');
      }
  
      // Period entry created successfully
      console.log('Period entry created successfully');
    } catch (error: any) {
      console.error('Error creating period entry:', error?.message);
    }
    window.location.href = userId ? `/dashboard?afhsfekhugda;ioh=${userId}` : '#';
  };
  

  return (
    <main>
      <h1>Dashboard for user {userId}</h1>
      <div className='flex justify-center'>
        {/* creates Users and Periods table */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <Input
            name='name'
            placeholder='Period Name'
            value={periodName}
            onChange={(e) => setPeriodName(e.target.value)}
            required
          />
          <Select onValueChange={handleStringToInt} required>
            <SelectTrigger className="w-3/5">
              <SelectValue placeholder="Period #" />
            </SelectTrigger>
            <SelectContent>
              {numbers.map((number) => (
                <SelectItem key={number} value={String(number)}>
                  {number}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button type="submit">Submit</Button>
        </form>
      </div>
      <PeriodsTable />
      <Button asChild>
        <Link href="/">Home</Link>
      </Button>
    </main>
  );
}
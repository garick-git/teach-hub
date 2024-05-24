"use client"

import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation';

interface Period {
    id: number;
    name: string;
    number: number;
    teacher: string;
    students: number[];
}
  
export default function Period() {
    const [period, setPeriod] = useState<Period | null>(null); // Change the initial state to null
    const searchParams = useSearchParams();
    const periodId = searchParams.get('0fa-pl;vh6ek,1gl');

    useEffect(() => {
        fetchPeriod()
    }, [])

    useEffect(() => {
        console.log("periodId is, ", periodId)
        fetchPeriod()
    }, [periodId])
  
    const fetchPeriod = async () => {
        try {
            const response = await fetch(`api/fetch-periods/?id=${periodId}`);
            if (!response.ok) {
            throw new Error('Failed to fetch period');
        }
        const data: Period = await response.json();
        setPeriod(data);
        console.log('period: ', data)
        } catch (error) {
            console.error('Error fetching period:', error);
        }
    }

    return (
        <div>
            {period && (
                <div>Period {period?.number}</div>
            )}
        </div>
    )    
}

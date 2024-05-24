"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import React, { useEffect, useState } from 'react'

interface Period {
  id: number;
  name: string;
  number: number;
  teacher: string;
  students: number[];
}

export default function PeriodsTable() {
  const [periods, setPeriods] = useState<Period[]>([]);

  useEffect(() => {
    const fetchPeriods = async () => {
      try {
        const response = await fetch('/api/fetch-periods');
        if (!response.ok) {
          throw new Error('Failed to fetch periods');
        }
        const data: Period[] = await response.json();
        setPeriods(data);
        console.log('periods: ', data)
      } catch (error) {
        console.error('Error fetching periods:', error);
      }
    };

    fetchPeriods();
  }, []);

  return (
    <div>
      <Table>
        <TableCaption>A list of your recent periods.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Number</TableHead>
            <TableHead>Teacher</TableHead>
            <TableHead>Students</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {periods.map((period) => (
            <TableRow key={period.id} onClick={() => window.location.href = period.id ? `/period?0fa-pl;vh6ek,1gl=${period.id}` : '#'}>
              <TableCell className="font-medium">{period.id}</TableCell>
              <TableCell>{period.name}</TableCell>
              <TableCell>{period.number}</TableCell>
              <TableCell>{period.teacher}</TableCell>
              <TableCell>{period.students.join(', ')}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
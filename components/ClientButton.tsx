"use client";

import React from 'react';
import { Button } from '@/components/ui/button';

interface ClientButtonProps {
  userId: string;
}

const ClientButton: React.FC<ClientButtonProps> = ({ userId }) => {
  const handleButtonClick = async () => {
    try {
      const response = await fetch('/api/edit-periods', {
        method: 'GET',
      });

      if (!response.ok) {
        throw new Error('Failed to set up tables');
      }

      // Redirect to the dashboard after successful table setup
      window.location.href = userId ? `/dashboard?afhsfekhugda;ioh=${userId}` : '#';
    } catch (error) {
      console.error('Error setting up tables:', error);
    }
  };

  return (
    <Button onClick={handleButtonClick}>
      Get started
    </Button>
  );
};

export default ClientButton;
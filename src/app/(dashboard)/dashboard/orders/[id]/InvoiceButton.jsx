'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { handleActionAlert } from '@/libs/handleAlert';
import { Download, RefreshCw } from 'lucide-react';

const InvoiceButton = () => {
  return (
    <>
      <Button
        onClick={() =>
          handleActionAlert(
            false,
            'Something went wrong Please try again later',
          )
        }
        className="bg-yellow px-6   uppercase cursor-pointer w-full"
        size="lg"
      >
        <Download size={14} />
        Download invoice
      </Button>
      <Button
        onClick={() =>
          handleActionAlert(
            false,
            'Something went wrong Please try again later',
          )
        }
        variant="outline"
        className="w-full uppercase gap-2 text-deefBlack cursor-pointer"
        size="lg"
      >
        <RefreshCw size={14} />
        Request return
      </Button>
    </>
  );
};

export default InvoiceButton;

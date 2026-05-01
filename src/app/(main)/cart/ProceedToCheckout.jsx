'use client';

import React from 'react';
import Link from 'next/link';
import { useCart } from '@/contexts/CartProvider';
import { Button } from '@/components/ui/button';
import OrderSummary from '@/components/shared/OrderSummary';

const ProceedToCheckout = () => {
  const { localCart } = useCart();

  return (
    <div className="bg-paleGrey rounded-[8px]  p-5 flex flex-col gap-4">
      <OrderSummary items={localCart} />
      {/* checkout button */}

      <Link href={'/checkout'}>
        <Button
          className="bg-yellow mt-3 px-6 rounded-full uppercase cursor-pointer w-full"
          size="lg"
        >
          Proceed To Checkout
        </Button>
      </Link>
    </div>
  );
};

export default ProceedToCheckout;

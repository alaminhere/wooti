'use client';
import { submitOrder } from '@/actions/orderAction';
import CheckForm from '@/app/(main)/checkout/CheckForm';
import PaymentMethod from '@/app/(main)/checkout/paymentMethod';
import AppBreadcrumb from '@/components/shared/AppBreadcrumb';
import Highlights from '@/components/shared/Highlights';

import OrderSummary from '@/components/shared/OrderSummary';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartProvider';
import useOrderCalculate from '@/hooks/useOrderCalculate';
import { handleActionAlert } from '@/libs/handleAlert';
import { useState } from 'react';

const CheckoutPage = () => {
  const { localCart, clearCart } = useCart();
  const [selected, setSelected] = useState('cod');
  const orderPrice = useOrderCalculate(localCart);
  const [form, setForm] = useState({
    fullName: '',
    address: '',
    country: '',
    city: '',
    zip: '',
    email: '',
    phone: '',
    notes: '',
  });

  const handleSubmit = async () => {
    const res = await submitOrder(selected, form, orderPrice, localCart);
    handleActionAlert(res?.success, res?.message);
    clearCart();
    setForm({
      fullName: '',
      address: '',
      country: '',
      city: '',
      zip: '',
      email: '',
      phone: '',
      notes: '',
    });
  };

  return (
    <>
      <section className="bg-paleGrey  pt-15">
        <div className="app-container p-5 flex flex-col justify-start items-start gap-4 ">
          <AppBreadcrumb items={[{ title: 'Cart' }]} />
        </div>
      </section>

      <section>
        <div className="min-h-[60vh] app-container flex flex-col md:flex-row gap-8">
          <div className="md:w-[70%] ">
            <div className="   ">
              <CheckForm form={form} setForm={setForm} />
              <PaymentMethod
                className="mt-5"
                selected={selected}
                setSelected={setSelected}
              />
            </div>
          </div>
          <div className="md:w-[30%]">
            <div className="bg-paleGrey rounded-[8px]  p-5 flex flex-col gap-4">
              <OrderSummary items={localCart} />
              {/* checkout button */}

              <Button
                onClick={() => handleSubmit()}
                className="bg-yellow mt-3 px-6 rounded-full uppercase cursor-pointer w-full"
                size="lg"
              >
                place order
              </Button>
            </div>
            <Highlights />
          </div>
        </div>
      </section>
    </>
  );
};

export default CheckoutPage;

'use client';

import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartProvider';
import { handleActionAlert } from '@/libs/handleAlert';
import QuantityCounter from '@/components/shared/QuantityCounter';

import { ShoppingCart } from 'lucide-react';
import { useSession } from 'next-auth/react';

const Quantity = ({ product }) => {
  const { addToCart } = useCart();
  const { status } = useSession();

  const cartProduct = {
    product: product?._id,
    title: product?.title,
    image: product?.images?.[0]?.url,
    discountPrice: product?.discountPrice,
    price: product?.price,
    stock: product?.stock,
    quantity: 1,
  };

  return (
    <div className="flex items-center gap-3 mt-2">
      <QuantityCounter cartProduct={cartProduct} />
      <Button
        onClick={async () => {
          if (status === 'unauthenticated') {
            handleActionAlert(false, 'Please login first');
            return;
          }
          const res = await addToCart(cartProduct);
          handleActionAlert(res.success, res.message);
        }}
        className={'bg-yellow px-6 rounded-md uppercase cursor-pointer'}
        size="lg"
      >
        Add To Cart <ShoppingCart />
      </Button>
    </div>
  );
};

export default Quantity;

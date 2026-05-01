'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Trash2 } from 'lucide-react';
import { useCart } from '@/contexts/CartProvider';
import QuantityCounter from '../../../components/shared/QuantityCounter';
import { handleActionAlert } from '@/libs/handleAlert';

const CartList = () => {
  const { remove, localCart } = useCart();

  const discount = product => {
    const discountAmount = product?.price - product?.discountPrice;
    return Math.floor((discountAmount / product?.price) * 100);
  };

  const total = (price, quantity) => {
    return price * quantity;
  };

  return (
    <>
      {localCart?.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-400 text-lg">Your Order is empty!</p>
          <Link href={'/shop'} className="text-yellow text-sm mt-2 block">
            Continue Shopping →
          </Link>
        </div>
      ) : (
        localCart.map((item, index) => (
          <div
            key={index}
            className="flex flex-col md:flex-row justify-between items-center gap-4 border-t border-gray-200 px-4 py-3"
          >
            <div className="w-full md:w-1/2 flex justify-start items-start gap-3">
              <div className="w-16 h-16 rounded-lg overflow-hidden border border-gray-100  bg-paleGrey">
                <Image
                  src={item.image}
                  alt="cat_Igm"
                  width={60}
                  height={60}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="">
                <p className="line-clamp-1 text-deefBlack text-xs capitalize font-normal ">
                  {item.title}
                </p>
                <div className="flex gap-2 mt-1">
                  <p className="text-[14px] font-normal text-gray-400  line-through">
                    {item?.price}$
                  </p>
                  {discount(item) > 0 ? (
                    <span className="bg-red-50 text-red text-[10px] flex justify-center items-center px-3 py-0  rounded-full ">
                      -{discount(item)}%
                    </span>
                  ) : (
                    ''
                  )}
                </div>
                <p className="text-[13px] font-normal text-deefBlack">
                  {item?.discountPrice}$
                </p>
              </div>
            </div>
            <div className="w-full md:w-1/2 flex justify-between items-center gap-4">
              <QuantityCounter cartProduct={item} />
              <p className="text-[14px] font-normal text-deefBlack">
                ${total(item?.discountPrice, item?.quantity)}
              </p>

              <button
                onClick={async () => {
                  const res = await remove(item);

                  handleActionAlert(res.success, res.message);
                }}
              >
                <Trash2
                  size={15}
                  className="cursor-pointer hover:text-red-500"
                />
              </button>
            </div>
          </div>
        ))
      )}
    </>
  );
};

export default CartList;

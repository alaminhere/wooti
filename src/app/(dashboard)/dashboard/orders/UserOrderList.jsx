import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
const style = {
  span: 'w-fit bg-red-50 text-red text-[10px] flex justify-center items-center px-1 py-0  rounded-full',
};

const UserOrderList = ({ product }) => {
  const discount = product => {
    const discountAmount = product?.price - product?.discountPrice;
    return Math.floor((discountAmount / product?.price) * 100);
  };

  return (
    <div className="  flex flex-col gap-3 bg-whiteCustom  ">
      <div className="flex justify-between items-start px-4 py-3">
        <div>
          <p className="text-sm font-semibold text-deefBlack uppercase">
            #{product?._id}
          </p>
          <p className="text-xs text-darkGrey">
            {new Date(product?.createdAt).toDateString()}
          </p>
        </div>
        <span
          className={`text-xs px-2.5 py-1 rounded-full bg-green-50 text-green-700`}
        >
          {product?.orderStatus}
        </span>
      </div>

      {product?.orderItems?.map((item, index) => (
        <div
          key={index}
          className="flex justify-start items-start gap-3 px-4 py-3 border-t border-t-gray-200"
        >
          <div className="w-14 h-14 rounded-lg overflow-hidden border border-gray-100 bg-paleGrey/40 shrink-0">
            <Image
              src={item.image}
              alt="product"
              width={56}
              height={56}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <p className="line-clamp-1 text-xs text-deefBlack capitalize font-normal">
              {item?.title}
            </p>
            <div className="flex gap-2 mt-1">
              <p className="text-xs text-darkGrey line-through">
                {item?.price}$
              </p>
              {discount(item) > 0 ? (
                <span className={style.span}>-{discount(item)}%</span>
              ) : (
                ''
              )}
            </div>
            <p className="text-xs font-medium text-deefBlack mt-1">
              {' '}
              {item?.discountPrice}$
            </p>
          </div>
        </div>
      ))}

      <div className="flex justify-between items-center border-y border-gray-100 pt-2 px-4 p-3">
        <span className="text-xs text-yellow">
          {' '}
          {product?.orderItems?.length} Items
        </span>
        <div className="flex items-center gap-3">
          <span className="text-sm font-semibold text-deefBlack">
            {product?.totalPrice}${' '}
          </span>

          <Link href={`/dashboard/orders/${product?._id}`}>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-green-50 text-green-700 cursor-pointer hover:bg-green-100 transition-colors">
              View
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserOrderList;

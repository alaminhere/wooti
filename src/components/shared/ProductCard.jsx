import RatingGenerator from '@/libs/RatingGenerator';
import Image from 'next/image';
import Link from 'next/link';

const ProductCard = ({ product }) => {
  const discount = () => {
    const discountAmount = product?.price - product?.discountPrice;
    return Math.floor((discountAmount / product?.price) * 100);
  };

  return (
    <>
      <div className="">
        <Link href={`/shop/${product?._id} `}>
          <div className="bg-whiteCustom rounded-xl border  border-gray-100  hover:border-yellow/30 transition-all overflow-hidden w-full group">
            <div className="flex justify-center items-center bg-paleGrey p-6 rounded-xl relative overflow-hidden">
              <Image
                src={product?.images[0]?.url}
                alt="Product image"
                width={160}
                height={160}
                className="w-auto h-auto max-h-40 object-contain transition-all group-hover:scale-110"
              />
              {product?.isNew ? (
                <span className="absolute top-3 right-3 bg-yellow text-whiteCustom text-[12px] px-2 py-0.5 rounded-full">
                  New
                </span>
              ) : (
                ''
              )}
            </div>

            <div className="p-3">
              <p className="text-sm line-clamp-1 font-medium mb-1">
                {product?.title}
              </p>
              {/* Rating */}
              <div className="flex items-center gap-1 mb-2">
                <div className="flex text-yellow">
                  {RatingGenerator(3).map(item => item)}
                </div>
                <span className="text-xs text-grey">3/5</span>
              </div>
              <div className="flex gap-1">
                <p className="text-[14px] md:text-[17px] font-medium text-darkGrey/60 line-through">
                  {product?.price}$
                </p>
                <p className="text-[14px] md:text-[17px] font-medium text-black">
                  {' '}
                  {product?.discountPrice.toFixed(2)}$
                </p>
                {discount() > 0 ? (
                  <span className="bg-red-50 text-red text-[10px] flex justify-center items-center px-3 py-0  rounded-full ">
                    -{discount()}%
                  </span>
                ) : (
                  ''
                )}
              </div>
            </div>
          </div>
        </Link>
      </div>
    </>
  );
};

export default ProductCard;

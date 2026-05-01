import Image from 'next/image';

const style = {
  span: 'w-fit bg-red-50 text-red text-[10px] flex justify-center items-center px-1 py-0  rounded-full',
};

const AdminSingleOrder = ({ item }) => {
  const discount = product => {
    const discountAmount = product?.price - product?.discountPrice;
    return Math.floor((discountAmount / product?.price) * 100);
  };
  return (
    <div className="flex flex-col md:flex-row justify-between items-center gap-4 border-t border-gray-200 px-4 py-3">
      <div className="w-full md:w-1/2 flex justify-start items-start gap-3">
        <div className="w-16 h-16 rounded-lg overflow-hidden border border-gray-100  bg-paleGrey">
          <Image
            src={item?.image}
            alt="cat_Igm"
            width={60}
            height={60}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="">
          <p className="line-clamp-1 text-deefBlack text-xs capitalize font-normal ">
            {item?.title}
          </p>
          <div className="flex gap-2 mt-1">
            <p className="text-[14px] font-normal text-gray-400 line-through">
              {item?.price}$
            </p>
            {discount(item) > 0 ? (
              <span className={style.span}>-{discount(item)}%</span>
            ) : (
              ''
            )}
          </div>
          <p className="text-[13px] font-normal text-deefBlack">
            {item?.discountPrice}$
          </p>
        </div>
      </div>
      <div className="w-full md:w-1/2 flex justify-between items-center gap-4"></div>
    </div>
  );
};

export default AdminSingleOrder;

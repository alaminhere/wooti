import { Button } from '../ui/button';
import { Input } from '../ui/input';

const OrderSummary = ({ items }) => {
  const totalPrice = items?.reduce((acc, curr) => {
    return acc + curr.price * curr.quantity;
  }, 0);

  const totalDiscountPrice = items?.reduce((acc, curr) => {
    return acc + curr.discountPrice * curr.quantity;
  }, 0);

  return (
    <>
      <div className="flex flex-col gap-2 text-sm">
        <div className="flex justify-between text-grey">
          <span className="text-yellow">{items?.length} Items</span>
          <span>{totalPrice}$</span>
        </div>
        <div className="flex justify-between text-grey">
          <span>Shipping</span>
          <span>0$</span>
        </div>
        <div className="flex justify-between text-grey">
          <span> Discount </span>
          <span>- {totalPrice - totalDiscountPrice}$</span>
        </div>
      </div>

      <hr className="text-gray-200" />

      {/* total */}

      <div className="flex justify-between font-semibold text-yellow">
        <span>Total </span>
        <span>{totalDiscountPrice}$</span>
      </div>

      {/* promo code */}
      <div className="flex gap-2">
        <Input placeholder="Promo code" className="bg-white" />
        <Button className="bg-deefBlack text-white rounded-full px-5 hover:bg-gray-800">
          Apply
        </Button>
      </div>
    </>
  );
};

export default OrderSummary;

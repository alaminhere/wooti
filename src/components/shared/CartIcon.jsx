import { ShoppingCart } from 'lucide-react';

const CartIcon = ({ count }) => {
  return (
    <div className="relative">
      <ShoppingCart className="w-5 h-5 text-whiteCustom" />
      {count > 0 && (
        <span className="absolute -top-2 -right-2 bg-whiteCustom text-yellow text-xs w-4 h-4 rounded-full flex items-center justify-center">
          {count}
        </span>
      )}
    </div>
  );
};

export default CartIcon;

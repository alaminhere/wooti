import AppBreadcrumb from '@/components/shared/AppBreadcrumb';
import CartList from '@/app/(main)/cart/CartList';
import Highlights from '@/components/shared/Highlights';

import StatusBar from '@/components/shared/StatusBar';
import ProceedToCheckout from './ProceedToCheckout';

const CartPage = () => {
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
            <div className="border border-gray-200 rounded-[8px] overflow-hidden">
              <StatusBar status="My Orders" />
              {/* cart list */}
              <div className="">
                <CartList />
              </div>
            </div>
          </div>
          <div className="md:w-[30%]">
            <ProceedToCheckout />
            <Highlights />
          </div>
        </div>
      </section>
    </>
  );
};

export default CartPage;

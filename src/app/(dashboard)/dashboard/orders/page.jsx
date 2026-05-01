import Link from 'next/link';
import { getOrder } from '@/actions/orderAction';
import StatusBar from '@/components/shared/StatusBar';
import AppBreadcrumb from '@/components/shared/AppBreadcrumb';
import UserOrderList from '@/app/(dashboard)/dashboard/orders/UserOrderList';

const OrderPage = async () => {
  const { order } = await getOrder();

  return (
    <div className="flex flex-col gap-5">
      <AppBreadcrumb
        items={[
          { title: 'Dashboard', href: '/dashboard/' },
          { title: 'Orders' },
        ]}
      />

      <div className="border border-gray-200 rounded-xl overflow-hidden ">
        <StatusBar status={'My Orders'} />

        {order?.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg">Your Order is empty!</p>
            <Link href={'/shop'} className="text-yellow text-sm mt-2 block">
              Continue Shopping →
            </Link>
          </div>
        ) : (
          order?.map((item, index) => (
            <UserOrderList key={index} product={item} />
          ))
        )}
      </div>
    </div>
  );
};

export default OrderPage;

import Link from 'next/link';
export const dynamic = 'force-dynamic';
import { Button } from '@/components/ui/button';
import { getAllOrder } from '@/actions/orderAction';
import StatusBar from '@/components/shared/StatusBar';
import AppBreadcrumb from '@/components/shared/AppBreadcrumb';
import UserResentOrderList from '@/components/shared/UserResentOrderList';
import { LayoutDashboard, ShoppingBag, Heart, Wallet } from 'lucide-react';

const style = {
  th: 'px-4 py-3 text-left text-xs text-darkGrey font-medium',
};

const DashboardPage = async () => {
  const { order } = await getAllOrder();
  const orderStatus = order?.map(item => item.orderStatus);
  const TotalSpent = order.reduce((acc, curr) => {
    return acc + curr.totalPrice;
  }, 0);

  const card = [
    { title: 'Total orders', value: order.length, icon: ShoppingBag },
    { title: 'Pending', value: orderStatus.length, icon: LayoutDashboard },
    { title: 'Wishlist', value: 0, icon: Heart },
    { title: 'Total spent', value: TotalSpent + '$', icon: Wallet },
  ];
  return (
    <>
      <div className="mb-5">
        <AppBreadcrumb items={[{ title: 'Dashboard' }]} />
      </div>

      <div className="bg-whiteCustom border border-gray-200 rounded-xl p-5">
        <div className="mb-5 flex justify-between items-center">
          <h5>Overview</h5>
          <Link href="/admin/products/add">
            <Button className="px-4 bg-yellow">+ Add Product</Button>
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          {card.map((item, index) => (
            <div key={index} className="bg-paleGrey rounded-md p-5">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs">{item.title}</p>
                <item.icon size={20} className="text-yellow" />
              </div>
              <p className="text-2xl font-semibold text-deefBlack">
                {item.value}
              </p>
            </div>
          ))}
        </div>

        <div className="border border-gray-200 rounded-md overflow-hidden">
          <StatusBar status={'Recent orders'} />
          <div className="flex flex-col gap-2">
            <table className="w-full">
              <thead>
                <tr>
                  <th className={style.th}>Order Date</th>
                  <th className={style.th}>Status</th>
                  <th className={style.th}>Action</th>
                </tr>
              </thead>
              <tbody>
                {order?.length === 0 ? (
                  <>
                    <tr className="text-center py-20">
                      <td>
                        <span className="text-gray-400 text-lg">
                          Your Order is empty!
                        </span>
                        <Link
                          href={'/shop'}
                          className="text-yellow text-sm mt-2 mb-5 block"
                        >
                          Continue Shopping →
                        </Link>
                      </td>
                    </tr>
                  </>
                ) : (
                  order?.map((item, index) => (
                    <UserResentOrderList key={index} order={item} />
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardPage;

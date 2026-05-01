export const dynamic = 'force-dynamic';
import { Input } from '@/components/ui/input';
import { getAllOrder } from '@/actions/orderAction';
import AppBreadcrumb from '@/components/shared/AppBreadcrumb';
import AdminOrderList from '@/app/(dashboard)/admin/orders/AdminOrderList';

const style = {
  th: 'px-4 py-3 text-left text-xs text-darkGrey font-medium',
};

const AdminOrdersPage = async () => {
  const { order } = await getAllOrder();

  return (
    <div className="flex flex-col gap-5">
      <AppBreadcrumb
        items={[{ title: 'Admin', href: '/admin/' }, { title: 'Orders' }]}
      />

      <div className="border border-gray-200 rounded-xl overflow-hidden bg-whiteCustom">
        <div className="px-5 py-4 flex justify-between items-center">
          <p className="font-semibold text-deefBlack">All Orders</p>
          <Input placeholder="Search... " className={'w-[50%]'} />
        </div>

        {/* Table */}
        <table className="w-full">
          <thead className="bg-paleGrey">
            <tr>
              <th className={style.th}>Order ID</th>
              <th className={style.th}>Total</th>
              <th className={style.th}>Status</th>
              <th className={style.th}>Action</th>
            </tr>
          </thead>

          <tbody>
            {order?.map((item, index) => (
              <AdminOrderList key={index} order={item} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminOrdersPage;

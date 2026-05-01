import { Download, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import StatusBar from '@/components/shared/StatusBar';
import AddressCard from '@/components/shared/AddressCard';
import AppBreadcrumb from '@/components/shared/AppBreadcrumb';
import { getAllOrder, getSingleOrder } from '@/actions/orderAction';
import AdminSingleOrder from '@/app/(dashboard)/admin/orders/[id]/AdminSingleOrder';
import SingleOrderSummery from '@/app/(dashboard)/dashboard/orders/[id]/SingleOrderSummery';

export const generateStaticParams = async () => {
  try {
    const { order } = await getAllOrder();
    return order.map(item => ({ id: item._id.toString() }));
  } catch (err) {
    return [];
  }
};

const AdminSingleOrderPage = async ({ params }) => {
  const { id } = await params;
  const { order } = await getSingleOrder(id);
  const address = order?.shippingAddress;

  return (
    <>
      <div className="bg-whiteCustom  rounded-xl">
        <AppBreadcrumb
          items={[
            { title: 'Admin', href: '/admin/' },
            { title: 'Orders', href: '/admin/orders/' },
            { title: 'title add ' },
          ]}
        />
        <div className="flex justify-between my-5">
          <div>
            <h1 className="text-xl font-bold text-deefBlack uppercase">
              {' '}
              #{order?._id}
            </h1>
            <p className="text-xs text-grey mt-1">
              {new Date(order?.createdAt).toDateString()}
            </p>
          </div>
          <div className="flex gap-2 items-center">
            <select className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm outline-none">
              <option>Pending</option>
              <option>Shipped</option>
              <option>Delivered</option>
              <option>Cancelled</option>
            </select>
            <Button className="bg-yellow">Update</Button>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-5">
        <div className="flex flex-col gap-5 w-full">
          {/* order */}
          <div className="border border-gray-200 rounded-[8px] overflow-hidden">
            <StatusBar status="Order" />
            {/* cart list */}
            <div className="">
              {order?.orderItems?.map((item, index) => (
                <AdminSingleOrder key={index} item={item} />
              ))}
            </div>
          </div>

          {/* address */}
          <AddressCard
            status="Shopping Address"
            name={address?.name}
            email={address?.email}
            phone={address?.phone}
            city={address?.city}
            zip={address?.zip}
            country={address?.country}
            address={address?.address}
          />
        </div>

        {/*  summary */}
        <div className="w-full lg:w-[44%] ">
          <div className="bg-paleGrey rounded-[8px]  p-5 flex flex-col gap-4">
            <SingleOrderSummery items={order?.orderItems} />

            <Button
              className="bg-yellow px-6   uppercase cursor-pointer w-full"
              size="lg"
            >
              <Download size={14} />
              Download invoice
            </Button>
            <Button
              variant="outline"
              className="w-full uppercase gap-2 text-deefBlack cursor-pointer"
              size="lg"
            >
              <X size={14} />
              cancel Order
            </Button>
          </div>

          <div className=" border border-gray-200 rounded-md bg-whiteCustom mt-5">
            <StatusBar status={'Status'} />
            <div className="p-5 text-green-700 bg-green-50">
              {' '}
              {order?.orderStatus}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminSingleOrderPage;

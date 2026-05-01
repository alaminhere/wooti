import InvoiceButton from './InvoiceButton';
import StatusBar from '@/components/shared/StatusBar';
import SingleOrderSummery from './SingleOrderSummery';
import AddressCard from '@/components/shared/AddressCard';
import AppBreadcrumb from '@/components/shared/AppBreadcrumb';
import { CheckCircle2, Home, Package, Truck } from 'lucide-react';
import UserSingleOrder from '@/app/(dashboard)/dashboard/orders/UserSingleOrder';
import { getAllOrder, getSingleOrder } from '@/actions/orderAction';

const steps = [
  { key: 'pending', label: 'Confirmed', icon: CheckCircle2 },
  { key: 'processing', label: 'Processing', icon: Package },
  { key: 'shipped', label: 'Shipped', icon: Truck },
  { key: 'delivered', label: 'Delivered', icon: Home },
];

export const generateStaticParams = async () => {
  try {
    const { order } = await getAllOrder();

    return order.map(item => ({ id: item._id.toString() }));
  } catch (err) {
    return [];
  }
};

const SingleOrderPage = async ({ params }) => {
  const { id } = await params;
  const { order } = await getSingleOrder(id);

  const stepComplete = order?.statusHistory.map(item => item?.status);
  const address = order?.shippingAddress;

  return (
    <>
      <div className="bg-whiteCustom  rounded-xl">
        <AppBreadcrumb
          items={[
            { title: 'Dashboard', href: '/dashboard/' },
            { title: 'Orders', href: '/orders' },
            { title: 'title add ' },
          ]}
        />
        <div className=" my-5">
          <p className="text-sm font-semibold text-deefBlack uppercase">
            #{order?._id}
          </p>
          <p className="text-xs text-grey mt-1">
            {new Date(order?.createdAt).toDateString()}
          </p>
        </div>
        <div className="border border-gray-200 rounded-[8px] overflow-hidden mb-5">
          <StatusBar status="Status" />
          <div className=" w-full px-6 py-5">
            <div className="w-full flex justify-center items-center">
              {steps?.map((item, index) => {
                const complete = stepComplete?.includes(item.key);
                return (
                  <div
                    key={item.key}
                    className={`flex items-start ${steps?.length - 1 === index ? '' : 'flex-1'}`}
                  >
                    <div className="flex flex-col items-center ">
                      <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center ${complete ? 'bg-green-500' : 'bg-green-200'} text-white `}
                      >
                        <item.icon size={14} />
                      </div>
                      <span
                        className={`text-xs mt-1 text-center ${complete ? 'text-green-600 ' : 'text-green-200'}`}
                      >
                        {item?.label}
                      </span>
                    </div>

                    {steps?.length - 1 === index ? (
                      ''
                    ) : (
                      <div
                        className={`flex-1 h-px  w-full   ${complete ? 'bg-green-500' : 'bg-green-200'}  mt-4`}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-5">
        <div className="flex flex-col gap-5 w-full">
          {/* order */}
          <div className="border border-gray-200 rounded-[8px] overflow-hidden">
            <StatusBar status={'Order'} />
            {/* cart list */}
            <div className="">
              {order?.orderItems?.map((item, index) => (
                <UserSingleOrder key={index} item={item} />
              ))}
            </div>
          </div>

          {/* address */}

          <AddressCard
            status="Shoping Address"
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

            <InvoiceButton />
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleOrderPage;

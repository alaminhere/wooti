import Link from 'next/link';

const UserResentOrderList = ({ order }) => {
  const date = new Date(order.createdAt).toDateString();

  return (
    <tr className="w-full border-t border-gray-100 hover:bg-paleGrey  ">
      <td className="w-1/3 px-4 py-3 text-sm text-black  overflow-hidden ">
        <span className="uppercase line-clamp-1 overflow-hidden">{date}</span>
      </td>

      <td className="w-1/3 px-4 py-3">
        <span className={`text-xs  rounded-full bg-green-50 text-green-700`}>
          {order.orderStatus}
        </span>
      </td>
      <td className="w-1/3 px-4 py-3">
        <Link href={`/dashboard/orders/${order._id}`}>
          <span className="text-xs px-3 py-1 rounded-full border border-yellow text-yellow hover:bg-yellow hover:text-white cursor-pointer">
            View
          </span>
        </Link>
      </td>
    </tr>
  );
};

export default UserResentOrderList;

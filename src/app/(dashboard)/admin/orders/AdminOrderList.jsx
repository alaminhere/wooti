import Link from 'next/link';

const AdminOrderList = ({ order }) => {
  return (
    <tr className="border-t border-gray-100 hover:bg-paleGrey transition-colors">
      <td className="px-5 py-3 text-sm line-clamp-1 text-shadow-deefBlack">
        #{order._id}
      </td>

      <td className="px-5 py-3 text-sm text-shadow-deefBlack">
        {order?.totalPrice}${' '}
      </td>
      <td className="px-5 py-3">
        <span
          className={`text-xs px-2.5 py-1 rounded-full  bg-green-50 text-green-700`}
        >
          {order?.orderStatus}
        </span>
      </td>
      <td className="px-5 py-3">
        <Link href={`/admin/orders/${order?._id}`}>
          <span className="text-xs px-3 py-1 rounded-full border border-yellow text-yellow hover:bg-yellow hover:text-white  cursor-pointer">
            View
          </span>
        </Link>
      </td>
    </tr>
  );
};

export default AdminOrderList;

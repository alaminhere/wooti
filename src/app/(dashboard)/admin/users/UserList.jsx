import UserAvatar from '../../../../components/shared/Avatar';

const statusStyle = {
  Delivered: 'bg-green-50 text-green-700',
  Shipped: 'bg-amber-50 text-amber-700',
  Cancelled: 'bg-red-50 text-red-600',
};

const UserList = () => {
  return (
    <tr className="border-t border-gray-100 hover:bg-paleGrey  ">
      <td className="px-4 py-3 text-sm text-black line-clamp-1">
        <UserAvatar className2="bg-yellow/20" />
      </td>

      <td className="px-4 py-3 ">
        <p className="text-xs font-medium">example@gmail.com</p>
      </td>
      <td className="px-4 py-3">
        <p className="text-xs font-medium text-green-500">Admin</p>
      </td>
    </tr>
  );
};

export default UserList;

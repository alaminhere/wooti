import React from 'react';
import StatusBar from '@/components/shared/StatusBar';
import AppBreadcrumb from '@/components/shared/AppBreadcrumb';
import UserList from '@/app/(dashboard)/admin/users/UserList';

const style = {
  th: 'px-4 py-3 text-left text-xs text-darkGrey font-medium',
};
const AdminUserListPage = () => {
  return (
    <>
      <div className="">
        <AppBreadcrumb
          items={[{ title: 'Admin', href: '/admin/' }, { title: 'User' }]}
        />
      </div>

      <div className="mt-5 border border-gray-200 rounded-md overflow-hidden">
        <StatusBar status={'All User'} />
        <div className="flex flex-col gap-2">
          <table className="w-full">
            <thead>
              <tr>
                <th className={style.th}>Profile</th>
                <th className={style.th}>Email</th>
                <th className={style.th}>Role</th>
              </tr>
            </thead>
            <tbody>
              <UserList />
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default AdminUserListPage;

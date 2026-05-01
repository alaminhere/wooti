export const dynamic = 'force-dynamic';

import CategoryForm from './CategoryForm';
import { getCategory } from '@/actions/categoryAction';
import AppBreadcrumb from '@/components/shared/AppBreadcrumb';
import AdminAllCategory from '@/app/(dashboard)/admin/categories/AdminAllCategory';

const style = {
  th: 'px-4 py-3 text-left text-xs text-darkGrey font-medium',
};

const AdminCategory = async () => {
  const { category } = await getCategory();
  return (
    <div className="flex flex-col gap-5">
      <AppBreadcrumb
        items={[{ title: 'Admin', href: '/admin/' }, { title: 'Category' }]}
      />

      {/* add form */}
      <CategoryForm />
      <div className="space-y-5 mt-5">
        <div className=" ">
          <p className=" font-semibold text-deefBlack text-15px]">
            All Category
          </p>
        </div>
        <div className="border border-gray-200 rounded-xl overflow-hidden">
          <table className="w-full">
            <thead className="bg-paleGrey">
              <tr>
                <th className={style.th}>Image</th>
                <th className={style.th}>Name</th>
                <th className={style.th}>Action</th>
              </tr>
            </thead>

            <tbody>
              <AdminAllCategory category={category} />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminCategory;

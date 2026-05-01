import { getProducts } from '@/actions/productAction';
import AdminAllProducts from '@/app/(dashboard)/admin/products/AdminAllProducts';
import AppBreadcrumb from '@/components/shared/AppBreadcrumb';
import AppPagination from '@/components/shared/Pagination';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const style = {
  th: 'px-4 py-3 text-left text-xs text-darkGrey font-medium',
};

const AdminProductsPage = async ({ searchParams }) => {
  const params = await searchParams;
  const filteredParams = Object.fromEntries(
    Object.entries(params).filter(
      ([_, value]) =>
        value !== undefined && value !== ' ' && value !== '' && value !== null,
    ),
  );

  const { product, totalPage } = await getProducts(filteredParams);

  return (
    <div className="flex flex-col gap-5">
      <AppBreadcrumb
        items={[{ title: 'Admin', href: '/admin/' }, { title: 'Products' }]}
      />

      <div className="flex justify-between items-center">
        <p className="font-semibold text-deefBlack text-15px]">All Products</p>

        <Link href="/admin/products/add">
          <Button className="px-4 bg-yellow">+ Add Product</Button>
        </Link>
      </div>

      <div className="border border-gray-200 rounded-xl overflow-hidden">
        <table className="w-full ">
          <thead className="bg-paleGrey">
            <tr>
              <th className={style.th}>Product</th>
              <th className={style.th}>Category</th>
              <th className={style.th}>Brand</th>
              <th className={style.th}>Price</th>
              <th className={style.th}>Stock</th>
              <th className={style.th}>Action</th>
            </tr>
          </thead>

          <tbody>
            {product?.map((item, index) => (
              <AdminAllProducts key={index} product={item} />
            ))}
          </tbody>
        </table>
      </div>
      <AppPagination totalPage={totalPage} />
    </div>
  );
};

export default AdminProductsPage;

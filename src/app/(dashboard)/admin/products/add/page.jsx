import AppBreadcrumb from '@/components/shared/AppBreadcrumb';
import StatusBar from '@/components/shared/StatusBar';

import React from 'react';
import ProductAddForm from './ProductAddForm';
import { getCategory } from '@/actions/categoryAction';

const AddProduct = async () => {
  const { category } = await getCategory();
  return (
    <>
      <div className="flex flex-col gap-5">
        <AppBreadcrumb
          items={[
            { title: 'Admin', href: '/admin/' },
            { title: 'Add Product' },
          ]}
        />

        <div className="border border-gray-200 rounded-lg">
          <StatusBar status="Add Product" />
          <div className="p-5">
            <ProductAddForm category={category} />
          </div>
        </div>
      </div>
    </>
  );
};

export default AddProduct;

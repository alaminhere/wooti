'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import PriceRange from '@/app/(main)/shop/PriceRange';
import { getProducts } from '@/actions/productAction';
import RadioFilter from '@/app/(main)/shop/RadioFilter';
import ProductCard from '@/components/shared/ProductCard';
import AppPagination from '@/components/shared/Pagination';

const ShopClient = ({ category }) => {
  const [products, setProducts] = useState(null);
  const [totalPage, setTotalPage] = useState();

  const params = useSearchParams();
  const paramsString = params.toString();
  useEffect(() => {
    const fnc = async () => {
      const rawParams = Object.fromEntries(params);
      const filteredParams = Object.fromEntries(
        Object.entries(rawParams).filter(
          ([_, value]) =>
            value !== undefined &&
            value !== ' ' &&
            value !== '' &&
            value !== null,
        ),
      );

      const { product, totalPage } = await getProducts(filteredParams);
      setProducts(product);
      setTotalPage(totalPage);
    };/*  */
    fnc();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paramsString]);

  return (
    <>
      <section>
        <div className="app-container flex flex-col md:flex-row gap-8">
          {/*  Filter */}
          <div className="md:-[20%]">
            {/* Category */}
            <div className="">
              <RadioFilter className="mt-5" category={category} />
            </div>
            {/* PriceRange */}
            <div className="mt-10">
              <PriceRange className="mt-5" />
            </div>
          </div>
          {/* Products */}
          <div className=" ">
            <div className="grid grid-cols-2 sm:grid-cols-3  md:grid-cols-3 lg:grid-cols-4 gap-5">
              {products?.map((item, index) => (
                <ProductCard product={item} key={index} />
              ))}
            </div>
          </div>
        </div>
        <div className="app-container">
          <AppPagination totalPage={totalPage} />
        </div>
      </section>
    </>
  );
};

export default ShopClient;

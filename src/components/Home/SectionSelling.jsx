import { getProducts } from '@/actions/productAction';
import ProductCard from '../shared/ProductCard';

const SectionSelling = async () => {
  const { product } = await getProducts();
  return (
    <>
      <div className="app-container">
        <h2 className="text-start mb-8">Best Selling Product</h2>
        <div className=" grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
          {/* product item */}
          {product?.map((item, index) => (
            <ProductCard product={item} key={index} />
          ))}
        </div>
      </div>
    </>
  );
};

export default SectionSelling;

import Quantity from './Quantity';
import SingleImageGlary from './SingleImageGlary';
import RatingGenerator from '@/libs/RatingGenerator';
import { Truck, Clock, ShieldCheck } from 'lucide-react';
import AppBreadcrumb from '@/components/shared/AppBreadcrumb';
import { getAllProduct, getSingleProduct } from '@/actions/productAction';

const policies = [
  {
    icon: Truck,
    title: 'Free Shipping & Returns',
    description: 'Available on all orders over $99.',
  },
  {
    icon: Clock,
    title: 'Estimated Delivery',
    description: 'Orders are typically dispatched within 24 hours.',
  },
  {
    icon: ShieldCheck,
    title: 'Security Policy',
    description: 'Ensuring top-level security for your data and transactions.',
  },
];
const specs = [
  { label: 'Article no', value: '205.222.25' },
  { label: 'Packages', value: '1' },
  { label: 'Width', value: '50 cm' },
  { label: 'Height', value: '90 cm' },
  { label: 'Weight', value: '12 kg' },
];

export const generateStaticParams = async () => {
  try {
    const { product, success } = await getAllProduct();
    if (!success || !Array.isArray(product)) {
      return [];
    }
    return product.map(item => ({ id: item._id.toString() }));
  } catch (err) {
    return [];
  }
};

export const generateMetadata = async ({ params }) => {
  const { id } = await params;
  const { product } = await getSingleProduct(id);
  return {
    title: product?.title,
    description: product?.description,
  };
};

const SingleProductPage = async ({ params }) => {
  const { id } = await params;
  const { product } = await getSingleProduct(id);

  const discount = () => {
    const discountAmount = product?.price - product?.discountPrice;
    return Math.floor((discountAmount / product?.price) * 100);
  };

  return (
    <>
      <section className="bg-paleGrey pt-15">
        <div className="app-container p-5 flex flex-col justify-center items-start gap-4 ">
          <AppBreadcrumb
            items={[
              { title: 'Shop', href: '/shop' },
              { title: product?.title },
            ]}
          />
        </div>
      </section>
      <section>
        <div className="app-container flex  flex-col md:flex-row gap-5">
          {/* image */}
          <SingleImageGlary product={product} />
          {/* delts */}
          <div className="md:w-[50%]">
            <p className="mb-2 text-xs text-yellow ">
              {' '}
              {product?.category?.title}
            </p>
            <h5 className="lg:w-[80%] mb-2">{product?.title}</h5>

            <div className="flex items-center gap-4 ">
              <div className="flex gap-1 mt-2">
                <p className="text-[17px] font-medium text-darkGrey/30">
                  {' '}
                  <del> {product?.discountPrice}$</del>
                </p>
                <p className="text-[17px] font-medium text-black">
                  {' '}
                  {product?.price}$
                </p>
                {discount() > 0 ? (
                  <span className="bg-red-50 text-red text-[10px] flex justify-center items-center px-3 py-0  rounded-full ">
                    -{discount()}%
                  </span>
                ) : (
                  ''
                )}
              </div>
              <div className="flex items-center gap-2">
                <div className="flex text-yellow">
                  {RatingGenerator(3).map(item => item)}
                </div>
                <span className="text-xs text-darkGrey">( 3/5 Reviews)</span>
              </div>
            </div>

            <ul className="list-disc space-y-2 mt-5 ml-4">
              <li className="text-xs text-darkGrey">
                Comfortable seating for ultimate relaxation
              </li>
              <li className="text-xs text-darkGrey">
                Handcrafted wood furniture with timeless appeal
              </li>
              <li className="text-xs text-darkGrey">
                Versatile pieces for modern interiors
              </li>
            </ul>

            <hr className="text-gray-200 my-4" />

            <div className="flex gap-1 mt-10">
              <p className="text-[17px] font-medium text-darkGrey/30">
                {' '}
                <del> {product?.discountPrice}$</del>
              </p>
              <p className="text-[17px] font-medium text-black">
                {product?.price}$
              </p>
              {discount() > 0 ? (
                <span className="bg-red-50 text-red text-[10px] flex justify-center items-center px-3 py-0  rounded-full ">
                  -{discount()}%
                </span>
              ) : (
                ''
              )}
            </div>

            <Quantity product={product} />
            <div
              className={`text-xs px-3 py-1 mt-3 w-fit rounded-full ${
                product?.stock
                  ? 'bg-green-50 text-green-600'
                  : 'bg-red-50 text-red-500'
              }`}
            >
              {product?.stock ? '✓ In Stock' : ' Out of Stock'}
            </div>

            <hr className="text-gray-200 my-5" />
            {/* <Truck size={20}  */}
            <ul className="flex flex-col gap-3">
              {policies?.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <item.icon size={20} className="text-grey mt-0.5" />
                  <p className="text-sm">
                    <span className="text-deefBlack">{item.title} : </span>
                    <span className="text-darkGrey">{item.description}</span>
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
      <section>
        <div className="app-container">
          <div className="md:w-[99%] mx-auto border rounded-[5px] border-gray-200 p-5">
            <h6 className="bg-paleGrey px-5 py-2">Description</h6>
            <p className="text-[16px] mt-5 mb-2 text-deefBlack  font-semibold">
              Product Highlights
            </p>
            <p className="leading-[1.7em]">{product?.description} </p>

            {/*  */}

            <div className="mt-5 border border-gray-200 rounded-[5px] overflow-hidden">
              <div className="bg-paleGrey px-4 py-3 border-b border-gray-200">
                <h6 className="bg-paleGreye">Package Size & Weight</h6>
              </div>
              <table className="w-full">
                <tbody>
                  {specs.map((item, i) => (
                    <tr
                      key={i}
                      className={i % 2 === 0 ? 'bg-white' : 'bg-paleGrey'}
                    >
                      <td className="px-4 py-2.5 text-xs font-semibold text-black w-1/3">
                        {item.label}
                      </td>
                      <td className="px-4 py-2.5 text-xs text-yellow">
                        {item.value}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SingleProductPage;

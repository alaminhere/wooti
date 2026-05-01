import Image from 'next/image';
import UpdateProduct from './UpdateProduct';

const style = {
  td: 'px-4 py-3',
};

const AdminAllProducts = ({ product }) => {
  return (
    <>
      <tr className="border-t border-gray-100 hover:bg-paleGrey transition-colors">
        <td className={style.td}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg overflow-hidden border border-gray-100 bg-paleGrey shrink-0">
              <Image
                src={product?.images?.[0].url}
                alt={product?.images?.[0]._id}
                width={40}
                height={40}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <p className="text-xs text-deefBlack line-clamp-1">
                {product?.title}
              </p>
              <p className="text-xs">#</p>
            </div>
          </div>
        </td>

        <td className={style.td}>
          <p className="text-xs text-deefBlack">{product?.category?.title}</p>
        </td>

        <td className={style.td}>
          <p className="text-xs text-deefBlack">{product?.brand}</p>
        </td>

        <td className={style.td}>
          <p className="text-xs font-semibold text-black">
            ${product?.price?.toFixed(2)}
          </p>
          <p className="text-xs text-gray-400 line-through">
            ${product?.discountPrice?.toFixed(2)}
          </p>
        </td>

        <td className={style.td}>
          {product?.stock ? (
            <span className="bg-green-50 text-green-700 text-xs">
              {product?.stock}
            </span>
          ) : (
            <span className="bg-red-50 text-red-700 text-xs">
              {product?.stock}
            </span>
          )}
        </td>

        <td className={style.td}>
          <UpdateProduct product={product} />
        </td>
      </tr>
    </>
  );
};

export default AdminAllProducts;

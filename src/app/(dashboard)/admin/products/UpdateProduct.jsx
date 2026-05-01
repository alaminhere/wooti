'use client';
import { deleteProduct } from '@/actions/productAction';
import { Edit, Trash2Icon } from 'lucide-react';

const UpdateProduct = ({ product }) => {
  const handleDelete = async (productID, productImages) => {
    await deleteProduct(productID, productImages);
  };

  return (
    <>
      <div className="flex gap-3">
        <span className="text-xs   text-blue-500 cursor-pointer">
          <Edit size={18} />
        </span>

        <button
          onClick={() => handleDelete(product?._id, product?.images)}
          className="text-xs  rounded-full text-red-700   cursor-pointer"
        >
          <Trash2Icon size={18} />
        </button>
      </div>
    </>
  );
};

export default UpdateProduct;

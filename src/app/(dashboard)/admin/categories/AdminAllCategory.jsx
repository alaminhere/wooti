'use client';

import { deleteCategory } from '@/actions/categoryAction';
import { handleActionAlert } from '@/libs/handleAlert';
import Image from 'next/image';

const style = {
  td: 'px-4 py-3',
};
const AdminAllCategory = ({ category }) => {
  // delete  category

  const handleDelete = async (slug, public_id) => {
    const res = await deleteCategory(slug, public_id);
    handleActionAlert(res.success, res.message);
  };

  return (
    <>
      {category.length === 0 ? (
        <tr>
          <td className="text-center">
            <p className="text-center my-10">Category Not Found!!</p>
          </td>
        </tr>
      ) : (
        <>
          {category.map((item, index) => (
            <tr
              key={index}
              className="border-t border-gray-100 hover:bg-paleGrey transition-colors"
            >
              <td className={style.td}>
                <div className="w-10 h-10 rounded-lg overflow-hidden border border-gray-100 bg-paleGrey shrink-0">
                  <Image
                    src={item?.image?.url}
                    alt={item.title}
                    width={40}
                    height={40}
                    className="w-full h-full object-cover"
                  />
                </div>
              </td>

              <td className={style.td}>
                <p className="text-xs text-deefBlack">{item.title}</p>
              </td>

              <td className={style.td}>
                <button
                  onClick={() => handleDelete(item.slug, item?.image?.public_id)}
                  className="text-xs px-2 rounded-full text-red-700  bg-red-100 cursor-pointer"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </>
      )}
    </>
  );
};

export default AdminAllCategory;

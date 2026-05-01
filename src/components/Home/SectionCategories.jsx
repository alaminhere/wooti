import Image from 'next/image';
import Link from 'next/link';
import { getCategory } from '@/actions/categoryAction';

const SectionCategories = async () => {
  const { category } = await getCategory();

  return (
    <div className="app-container pb-4">
      <div className=" grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
        {category.map((item, index) => (
          <Link
            key={index}
            href={`/shop?category=${item?.slug}`}
            className="bg-paleGrey rounded-xl border border-gray-300
              hover:border-yellow/50 transition-all p-4 flex flex-col items-center gap-3"
          >
            <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center">
              <Image
                src={item?.image?.url}
                alt="cat_Igm"
                width={150}
                height={150}
              />
            </div>
            <p className="text-sm font-medium text-black">{item.title}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SectionCategories;

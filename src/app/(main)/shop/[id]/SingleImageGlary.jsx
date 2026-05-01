'use client';
import Image from 'next/image';
import { useState } from 'react';

const SingleImageGlary = ({ product }) => {
  const [selectedImage, setSelectedImage] = useState(product?.images?.[0]);

  return (
    <div className="md:w-[50%] flex flex-col md:flex-row  justify-center ">
      <div className="flex flex-col md:flex-row gap-2">
        {/* Main Image */}
        <div className="flex-1 md:order-2">
          <Image
            className="w-full h-full object-cover"
            alt="single_image"
            src={selectedImage?.url}
            width={500}
            height={500}
          />
        </div>

        {/* Thumbnail Images  */}
        <div className="flex flex-row md:flex-col gap-2 md:order-1">
          {product.images.map((item, index) => (
            <Image
              key={index}
              className={`border ${item._id === selectedImage._id ? 'border-yellow' : ''} cursor-pointer bg-paleGrey w-16 h-16 md:w-20 md:h-20 object-cover`}
              alt="single_image"
              src={item?.url}
              width={100}
              height={100}
              onClick={() => setSelectedImage(product?.images[index])}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SingleImageGlary;

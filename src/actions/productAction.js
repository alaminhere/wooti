'use server';

import slugify from 'slugify';
import connectdb from '@/libs/connectdb';
import cloudinary from '@/libs/cloudinary';
import { revalidatePath } from 'next/cache';
import uploadImage from '@/libs/uploadImage';
import { Product } from '@/models/productShema';
import { Category } from '@/models/categorySchema';

// submit product
export const submitProduct = async (fileData, prevData, formData) => {
  const title = formData.get('title');
  const description = formData.get('description');
  const price = formData.get('price');
  const discountPrice = formData.get('discountprice');
  const category = formData.get('category');
  const slug = slugify(title, { lower: true, strict: true });
  const stock = formData.get('stock');
  const width = formData.get('width');
  const height = formData.get('height');
  const packages = formData.get('packages');
  const brand = formData.get('brand');
  const isnew = formData.get('isnew');
  const isFeatured = formData.get('isfeatured');

  try {
    if (
      !title ||
      !description ||
      !price ||
      !discountPrice ||
      !category ||
      !stock ||
      !width ||
      !height ||
      !packages ||
      !brand ||
      !isnew ||
      !isFeatured ||
      fileData.length < 3
    ) {
      return {
        success: false,
        message: 'Please fill in all required fields!',
      };
    }

    await connectdb();

    const images = await Promise.all(
      fileData.map(async item => await uploadImage(item)),
    );

    await Product.create({
      title: title,
      description: description,
      price: price,
      discountPrice: discountPrice,
      category: category,
      images: images,
      slug: slug,
      stock: stock,
      widh: width,
      height: height,
      packages: packages,
      brand: brand,
      isFeatured: isFeatured === 'true',
      isNew: isnew === 'true',
    });

    revalidatePath('/admin/products');
    revalidatePath('/shop');

    return {
      success: true,
      message: 'Product submitted successfully',
    };
  } catch (err) {
    return {
      success: false,
      message: 'Something went wrong! Please try again later',
    };
  }
};

export const getProducts = async params => {
  const { search, category, min, max, page = 1 } = params || {};

  const size = 8;
  const skip = (page - 1) * size;

  try {
    await connectdb();
    const filter = {};

    //  search
    if (search) {
      filter.title = { $regex: search, $options: 'i' };
    }
    // category
    if (category) {
      const existsCategory = await Category.findOne({ slug: category });
      if (existsCategory) {
        filter.category = existsCategory;
      }
    }

    if (min || max) {
      filter.price = {};
      if (min) filter.price.$gte = Number(min);
      if (max) filter.price.$lte = Number(max);
    }

    // pagination
    const total = await Product.countDocuments(filter);
    const totalPage = Math.ceil(total / size);

    const product = await Product.find(filter)
      .populate('category')
      .skip(skip)
      .limit(size)
      .sort({ createdAt: -1 });

    if (product.length === 0) {
      return {
        success: false,
        message: 'Product not found! Please try again later',
      };
    }

    return {
      success: true,
      message: 'Products fetched successfully',
      product: JSON.parse(JSON.stringify(product)),
      totalPage,
    };
  } catch (err) {
    return {
      success: false,
      message: 'Something went wrong! Please try again later',
      er: err.message,
    };
  }
};

// get single product
export const getSingleProduct = async id => {
  try {
    await connectdb();
    const product = await Product.findOne({ _id: id }).populate('category');

    if (!product) {
      return {
        success: false,
        message: 'Product not found!',
      };
    }
    return {
      success: true,
      message: 'Product fetched successfully',
      product: JSON.parse(JSON.stringify(product)),
    };
  } catch {
    return {
      success: false,
      message: 'Something went wrong! Please try again later',
    };
  }
};

// get all product
export const getAllProduct = async () => {
  try {
    await connectdb();
    const product = await Product.find();

    // new
    if (product.length === 0) {
      return {
        success: false,
        message: 'Product not found!',
      };
    }
    return {
      success: true,
      message: 'Products fetched successfully',
      product: JSON.parse(JSON.stringify(product)),
    };
  } catch {
    return {
      success: false,
      message: 'Something went wrong! Please try again later',
    };
  }
};

// delete product
export const deleteProduct = async (productID, productImages) => {
  try {
    await connectdb();

    const existsProduct = await Product.findOne({ _id: productID });
    if (!existsProduct) {
      return {
        success: false,
        message: 'Product not found! Please try again later',
      };
    }

    const res = productImages.map(item =>
      cloudinary.uploader.destroy(item.public_id),
    );
    await Promise.allSettled(res);
    await Product.findOneAndDelete({ _id: productID });

    revalidatePath('/admin/products');
    revalidatePath('/shop');
    return {
      success: true,
      message: 'Product deleted successfully',
    };
  } catch (err) {
    return {
      success: false,
      message: 'Something went wrong! Please try again later',
      er: err.message,
    };
  }
};

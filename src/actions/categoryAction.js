'use server';

import slugify from 'slugify';
import connectdb from '@/libs/connectdb';
import cloudinary from '@/libs/cloudinary';
import { revalidatePath } from 'next/cache';
import uploadImage from '@/libs/uploadImage';
import { Category } from '@/models/categorySchema';

// submit category
export const submitCategory = async (prevData, formData) => {
  const file = formData.get('file');
  const title = formData.get('title');

  try {
    if (!title || !file || file.size === 0) {
      return {
        success: false,
        message: 'Please fill in all required fields!',
      };
    }

    const image = await uploadImage(file);
    const slug = slugify(title, { lower: true, strict: true });

    await connectdb();
    const exists = await Category.findOne({ slug });
    if (exists) {
      return {
        success: false,
        message: 'Category already exists',
      };
    }

    await Category.create({
      title: title,
      image: image,
      slug: slug,
    });
    revalidatePath('/admin/categories');

    return {
      success: true,
      message: 'Category submitted successfully',
    };
  } catch (err) {
    return {
      success: false,
      message: 'Something went wrong! Please try again later',
    };
  }
};

// get category
export const getCategory = async () => {
  try {
    await connectdb();

    const category = await Category.find();

    return {
      success: true,
      message: 'Categories fetched successfully',
      category: JSON.parse(JSON.stringify(category)),
    };
  } catch (err) {
    return {
      success: false,
      message: 'Something went wrong! Please try again later',
    };
  }
};

// delete category
export const deleteCategory = async (slug, public_id) => {
  try {
    await connectdb();

    const existsCategory = await Category.findOne({ slug: slug });
    if (!existsCategory) {
      return {
        success: false,
        message: 'Category not found! Please try again later',
      };
    }

    await cloudinary.uploader.destroy(public_id);
    await Category.findOneAndDelete({ slug: slug });

    revalidatePath('/admin/categories');
    return {
      success: true,
      message: 'Category deleted successfully',
    };
  } catch (err) {
    return {
      success: false,
      message: 'Something went wrong! Please try again later',
    };
  }
};

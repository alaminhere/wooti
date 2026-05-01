'use server';

import authOptions from '@/libs/authOptions';
import connectdb from '@/libs/connectdb';
import { Cart } from '@/models/cartSchema';
import { Product } from '@/models/productShema';
import { getServerSession } from 'next-auth';

// cart Not found
const cartNotFound = () => {
  return { success: false, message: 'Cart not found' };
};

// product not found
const productNotFound = () => {
  return { success: false, message: 'Product not found!' };
};

export const submitCart = async (action, cartProduct) => {
  const session = await getServerSession(authOptions);

  if (!session?.token?.user?._id) {
    return {
      success: false,
      message: 'Unauthorized',
    };
  }

  const userId = session.token.user._id;
  const productId = cartProduct?.product;

  const product = {
    product: cartProduct?.product,
    title: cartProduct?.title,
    image: cartProduct?.image,
    price: cartProduct?.price,
    discountPrice: cartProduct?.discountPrice,
    quantity: cartProduct?.quantity,
  };

  try {
    if (!userId) {
      return {
        success: false,
        message: 'Unauthorized',
      };
    }
    await connectdb();
    const cart = await Cart.findOne({ user: userId });

    // clear cart
    if (action === 'CLEAR') {
      if (!cart) {
        return cartNotFound();
      }
      await Cart.findOneAndUpdate(
        { user: userId },
        { $set: { cartItems: [] } },
      );
      return {
        success: true,
        message: 'Cart  successfully clear',
      };
    }

    //
    const currentProductDb = await Product.findOne({ _id: productId });
    if (!currentProductDb) {
      return productNotFound();
    }

    // remove
    if (action === 'REMOVE') {
      if (!cart) {
        return cartNotFound();
      }

      // old
      // const existsCartItem = cart.cartItems.find(
      //   item => item.product.toString() === productId.toString(),
      // );
      // if (!existsCartItem) {
      //   return productNotFound();
      // }
      //
      // await Cart.findOneAndUpdate(
      //   { user: userId, 'cartItems.product': productId },
      //   { $pull: { cartItems: { product: productId } } },
      // );

      // new
      if (!productId) {
        await Cart.findOneAndUpdate(
          { user: userId },
          { $set: { cartItems: [] } },
        );
        return {
          success: true,
          message: 'Cart successfully cleared.',
        };
      }

      const existsCartItem = cart.cartItems.find(
        item => item.product.toString() === productId.toString(),
      );
      if (!existsCartItem) {
        return productNotFound();
      }

      await Cart.findOneAndUpdate(
        { user: userId, 'cartItems.product': productId },
        { $pull: { cartItems: { product: productId } } },
      );

      return {
        success: true,
        message: 'Item has been removed.',
      };
    }

    //============== create cart and update , => increment decrement and add to cart  ============

    // action =  DECREMENT INCREMENT ADDTOCART

    if (!cart) {
      await Cart.create({
        user: userId,
        cartItems: [product],
      });

      return {
        success: true,
        message: 'Product added to cart successfully.',
      };
    }

    //  exists cart
    const existsCartItem = cart.cartItems.find(
      item => item.product.toString() === productId.toString(),
    );

    if (existsCartItem) {
      //  action = decrement
      if (action === 'DECREMENT') {
        if (1 >= existsCartItem.quantity) {
          return {
            success: false,
            message: 'Minimum quantity reached',
          };
        }
        await Cart.findOneAndUpdate(
          { user: userId, 'cartItems.product': productId },
          { $inc: { 'cartItems.$.quantity': -1 } },
        );
        return {
          success: true,
          message: 'Quantity has been updated.',
        };
      }

      // action = increment and addtocart
      if (existsCartItem.quantity >= currentProductDb.stock) {
        return {
          success: true,
          message: 'Stock limit reached',
        };
      }

      await Cart.findOneAndUpdate(
        { user: userId, 'cartItems.product': productId },
        { $inc: { 'cartItems.$.quantity': 1 } },
      );

      if (action === 'INCREMENT') {
        return {
          success: true,
          message: 'Quantity has been updated.',
        };
      }
      return {
        success: true,
        message: 'Product already exists. Quantity has been updated.',
      };
    } else {
      // set product
      await Cart.findOneAndUpdate(
        { user: userId },
        { $push: { cartItems: product } },
      );
      return {
        success: true,
        message: 'Product added to cart successfully.',
      };
    }
  } catch (err) {
    return {
      success: false,
      message: 'Something went wrong! please try again later ',
    };
  }
};

export const getCurrentCart = async () => {
  const session = await getServerSession(authOptions);

  if (!session?.token?.user?._id) {
    return {
      success: false,
      message: 'Unauthorized',
    };
  }

  const userId = session.token.user._id;
  try {
    if (!userId) {
      return {
        success: false,
        message: 'Unauthorized',
      };
    }
    await connectdb();
    const cart = await Cart.findOne({ user: userId });

    return {
      success: true,
      message: 'cart get successfully',
      cart: JSON.parse(JSON.stringify(cart)),
    };
  } catch {
    return {
      success: false,
      message: 'Something went wrong!! Please try again later',
    };
  }
};

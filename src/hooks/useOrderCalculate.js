const useOrderCalculate = (localCart = []) => {
  let itemsPrice = 0;
  let totalPrice = 0;

  for (const item of localCart) {
    itemsPrice += item.price * item.quantity;
    totalPrice += item.discountPrice * item.quantity;
  }

  return {
    itemsPrice,
    discountPrice: itemsPrice - totalPrice,
    totalPrice,
  };
};


export default useOrderCalculate;

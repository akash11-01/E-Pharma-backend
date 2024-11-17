import { ctrlWrapper } from "../helpers/ctrlWrapper.js";
import { createOrder } from "../services/ordersServices.js";
import { getCartById } from "../services/cartServices.js";

const addOrder = async (req, res) => {
  const { _id: userId } = req.user;
  const order = await createOrder(req.body);

  const cart = await getCartById(userId);

  cart.products = [];

  await cart.save();

  res.status(201).json(order);
};

export default {
  addOrder: ctrlWrapper(addOrder),
};

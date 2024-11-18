import { ctrlWrapper } from "../helpers/ctrlWrapper.js";
import { Store } from "../models/Store.js";
import { listNearStores, listStores } from "../services/storesServices.js";

const createStore = async (req, res) => {
  const store = await Store.create(req.body);
  res.json(store);
};
const getAllStores = async (_, res) => {
  const result = await listStores();

  res.json(result);
};

const getAllNearStores = async (_, res) => {
  const result = await listNearStores();

  res.json(result);
};

export default {
  getAllStores: ctrlWrapper(getAllStores),
  getAllNearStores: ctrlWrapper(getAllNearStores),
  createStore: ctrlWrapper(createStore),
};

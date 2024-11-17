import { ctrlWrapper } from "../helpers/ctrlWrapper.js";
import { listNearStores, listStores } from "../services/storesServices.js";

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
};

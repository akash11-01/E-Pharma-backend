import { NearStore, Store } from "../models/Store.js";

export const listStores = async () => {
  const stores = await Store.find();

  return stores;
};

export const listNearStores = async () => {
  const stores = await NearStore.find();

  return stores;
};

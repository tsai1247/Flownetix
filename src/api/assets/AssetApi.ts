import { assetsDB } from '@/common/indexedDB';
import type { Asset } from '@/common/indexedDB';

function getAll (): Promise<Asset[]> {
  return new Promise((resolve, reject) => {
    assetsDB.getAll()
      .then(assets => {
        resolve(assets);
      })
      .catch(error => {
        console.error('get Assets error', error);
        reject(error);
      });
  });
}

function add (asset: Asset) {
  return new Promise((resolve, reject) => {
    assetsDB.add(asset)
      .then(() => {
        resolve(true);
      })
      .catch(error => {
        reject(error);
      });
  });
}

export default {
  getAll,
  add,
};

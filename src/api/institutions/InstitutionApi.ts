import { institutionDB } from '@/common/indexedDB';
import type { Institution } from '@/common/indexedDB';

function getAll (): Promise<Institution[]> {
  return new Promise((resolve, reject) => {
    institutionDB.getAll()
      .then(institution => {
        resolve(institution);
      })
      .catch(error => {
        reject(error);
      });
  });
}

function add (institution: Institution) {
  return new Promise((resolve, reject) => {
    institutionDB.add(institution)
      .then(() => {
        resolve(true);
      })
      .catch(error => {
        reject(error);
      });
  });
}

function remove (institution: Institution) {
  return new Promise((resolve, reject) => {
    institutionDB.delete(institution.id)
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
  remove,
};

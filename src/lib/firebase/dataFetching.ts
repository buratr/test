// dataFetching.ts

import { getDocs, collection, query, orderBy, startAfter, limit } from 'firebase/firestore';
import {db} from "$lib/firebase/firebase"

export const fetchProducts = async (pageNumber: number, itemsPerPage: number) => {
  try {
    let q = query(
      collection(db, 'product'),
      orderBy('createdAt'),
      limit(itemsPerPage)
    );

    // Если это не первая страница, определяем начальный документ для выборки данных
    if (pageNumber > 1) {
      const startAfterDoc = await getLastDocOnPage(pageNumber - 1, itemsPerPage);
      q = query(
        q,
        startAfter(startAfterDoc)
      );
    }

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => doc.data());
  } catch (error) {
    console.error('Ошибка при загрузке товаров:', error);
    return [];
  }
};

// Функция для получения последнего документа на предыдущей странице
const getLastDocOnPage = async (pageNumber: number, itemsPerPage: number) => {
  const q = query(
    collection(db, 'product'),
    orderBy('createdAt'),
    limit(itemsPerPage * pageNumber)
  );
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs[querySnapshot.docs.length - 1];
};

export const getProductCount = async () => {
  const q = collection(db, 'product');
  const querySnapshot = await getDocs(q);
  return querySnapshot.size;
};

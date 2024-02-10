// src/lib/store.ts
import { writable } from 'svelte/store';

interface CartItem {
  id: number;
  name: string;
  img: string;
  price: string;
  quantity: number; 
  size: string;
  color:string;
}

let initialCartItems: CartItem[] = [];

// Проверяем наличие localStorage
if (typeof localStorage !== 'undefined') {
  // Попытаемся загрузить данные из localStorage
  const savedCartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
  initialCartItems = savedCartItems;
}

// Используем initialCartItems как начальное значение
export const cartItems = writable<CartItem[]>(initialCartItems);

// Проверяем наличие localStorage перед использованием
if (typeof localStorage !== 'undefined') {
  // Подписываемся на изменения в хранилище и сохраняем в localStorage
  cartItems.subscribe(value => {
    localStorage.setItem('cartItems', JSON.stringify(value));
  });
}
// Функция удаления товара из корзины по id
export function removeFromCart(itemId: number): void {
    cartItems.update(items => items.filter(item => item.id !== itemId));
  }

  // Функция обновления количества товара в корзине по id
export function updateCartItemQuantity(itemId: number, newQuantity: number): void {
  cartItems.update(items => items.map(item => {
    if (item.id === itemId) {
      return {...item, quantity: newQuantity};
    }
    return item;
  }));
}

// Функция подсчета общей суммы заказа
export function getTotalOrderAmount(items: CartItem[]): number {
   let totalAmount:number = 0;
        items.forEach(item => {
            totalAmount += Number(item.price)  * Number(item.quantity);
        });
        return totalAmount;
  }
import { writable } from 'svelte/store';
import {auth} from "$lib/firebase/firebase"
import {onAuthStateChanged} from "firebase/auth";

export const cartVisible = writable(0)
interface userInt {
    uid: string;
    email: string;
  }

let localUserId:any = "";
// Проверяем наличие localStorage
if (typeof localStorage !== 'undefined') {
    // Попытаемся загрузить данные из localStorage
    localUserId = localStorage.getItem('userId') || "";
  }

export const userId = writable(localUserId);

// Проверяем наличие localStorage перед использованием
if (typeof localStorage !== 'undefined') {
    // Подписываемся на изменения в хранилище и сохраняем в localStorage
    userId.subscribe(value => {
      localStorage.setItem('userId', value);
    });
  }



  export async function getCurrentUser() {
    return new Promise((resolve, reject) => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                resolve(user);
            } else {
                userId.subscribe(userIdValue => {
                    if (!userIdValue) {
                        let guestId = "guest-" + Math.random().toString(36).substr(2, 9);
                        userId.set(guestId);
                        resolve(guestId);
                    } else {
                        resolve(userIdValue);
                    }
                });
                
            }
        });
    });
}
// src/routes/success/+page.ts
// import type { Load } from '@sveltejs/kit';

// export const load: Load = async ({ params }) => {
//   console.log('Route path:', params.splat);

//   const url = new URL('http://localhost:5173/' + (params.splat || '')); // собираем URL-адрес из пути маршрута
//   const queryParams = url.searchParams;

//   const uid = queryParams.get('uid');
//   const pid = queryParams.get('pid');

//   console.log('Value of uid:', uid);
//   console.log('Value of pid:', pid);

//   return {
//     props: {
//       uid,
//       pid
//     }
//   };
// };

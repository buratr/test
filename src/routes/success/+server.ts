// import { json } from '@sveltejs/kit';

// export function GET(requestEvent:any) {
//     const {request} = requestEvent
//     console.log("request - ", request)
// 	const number = Math.floor(Math.random() * 6) + 1;

// 	return json(number);
// }



/*===================== */
// import { json } from '@sveltejs/kit';
// import type { RequestHandler } from './$types';

// export const GET: RequestHandler = ({ request }) => {
// 	// log all headers
// 	console.log(...request.headers);
//     const { searchParams } = new URL(request.url);
//     const uid = searchParams.get('uid');
// 	// create a JSON Response using a header we received
// 	return json(
// 		{
// 			// retrieve a specific header
// 			userAgent: request.headers.get('user-agent'),
//             uid: uid
// 		},
// 		{
// 			// set a header on the response
// 			headers: { 'x-custom-header': 'potato' },
// 		},
// 	);
// };
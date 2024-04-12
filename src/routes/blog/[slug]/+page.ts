// since there's no dynamic data here, we can prerender
// it so that it gets served as a static asset in production
import {db} from "$lib/firebase/firebase"
import { fetchProducts, getProductCount } from '$lib/firebase/dataFetching';
import { initializeApp } from "firebase/app";
import {getFirestore, collection, getDocs, query, limit, orderBy, startAfter, where   } from "firebase/firestore"; 
import {getPost} from "$lib/sanityClient";

export const prerender = true;

let Post={} 
let postNew: Array<any> = []

export const load = async ({ params }) => {
	let postUri = params.slug

    const fetchProducts = async () => {

		const q = query(collection(db, "blog"), where("slug", "==", postUri));

        const querySnapshot = await getDocs(q);
		
		querySnapshot.forEach((doc) => {
			const t = doc.data().name
			let timeShtamp = doc.data().date
			// Конвертируем временную метку из формата Firebase в миллисекунды
			const milliseconds = timeShtamp.seconds * 1000 + Math.floor(timeShtamp.nanoseconds / 1000000);
			// Создаем объект Date, передавая количество миллисекунд с начала эпохи Unix (1 января 1970 года)
			const date = new Date(milliseconds);
			const year = date.getFullYear();
			const month = date.getMonth() + 1;
			const day = date.getDate();

			Post = {
				id: doc.id,
				postId: doc.data().id,
				title: doc.data().title,
				description: doc.data().description,
				img: doc.data().img,
				views: doc.data().views,
				date: year + "." + month + "." + day,
				slug: doc.data().slug,
				content: doc.data().content,
				author: doc.data().author,
				category: doc.data().category
			}
		});
		return Post
    }

	
	const fetchPost = async () => { 
		postNew = await getPost(postUri)
		postNew = postNew[0]
		return postNew
	 }

    

    return {
		Post_server: fetchProducts(),
		post_serv_New: fetchPost()
    }
}
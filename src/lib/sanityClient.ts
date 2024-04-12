import {createClient} from '@sanity/client'
// Import using ESM URL imports in environments that supports it:
// import {createClient} from 'https://esm.sh/@sanity/client'

export const client = createClient({
  projectId: 'b5ijvnfr',
  dataset: 'production',
  useCdn: true, // set to `false` to bypass the edge cache
  apiVersion: '2023-05-03', // use current date (YYYY-MM-DD) to target the latest API version
  // token: process.env.SANITY_SECRET_TOKEN // Only if you want to update content with the client
})

// uses GROQ to query content: https://www.sanity.io/docs/groq
export async function getPosts() {
    const posts = await client.fetch(`*[_type == "post"]{
        title,
        description,
          date,
          author->{name},
          category->{name},
          "imageUrl": image.asset->url,
          slug
      }`)
      await posts.forEach((element: { date: string | number | Date; }) => {
        const date = new Date(element.date);
        const formattedDate = `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;

        element.date = formattedDate
      });
    return posts
}

export async function getPost(slug:string) {
    const post = await client.fetch(`*[_type == "post" && slug.current == "${slug}" ]{
        title,
        description,
          date,
          content,
          author->{name},
          category->{name},
          "imageUrl": image.asset->url,
          slug
      }`)
      await post.forEach((element: { date: string | number | Date; }) => {
        const date = new Date(element.date);
        const formattedDate = `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;

        element.date = formattedDate
      });
    return post
}

export async function searchPost(search: any) {
    const post = await client.fetch(`*[_type == "post" && title match "*${search}*" ]{
        title,
        description,
          date,
          author->{name},
          category->{name},
          "imageUrl": image.asset->url,
          slug
      }`)
      await post.forEach((element: { date: string | number | Date; }) => {
        const date = new Date(element.date);
        const formattedDate = `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;

        element.date = formattedDate
      });
    return post
}
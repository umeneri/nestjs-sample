'use client'

import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr'
import { PostsDocument } from '@/dist/gql/graphql'

export default function Page() {
  const { data, error } = useSuspenseQuery(PostsDocument)
  const posts = data.posts

  if (error) {
    return <div>{error.message}</div>
  }

  return (
    <main>
      {posts.map((post) => (
        <div key={post.id}>
          <p>{post.id}</p>
          <h1>{post.title}</h1>
          <p>{post.content}</p>
        </div>
      ))}
    </main>
  )
}

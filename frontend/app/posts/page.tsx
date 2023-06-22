"use client";

import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr";

import { gql } from "@apollo/client";

const query = gql`query Posts {
    posts {
        id
        title
        content
    }
}`;

export default function Page() {
  const {data} = useSuspenseQuery(query);
  const posts = data.posts

  return <main>
    {posts.map((post) => (
      <div key={post.id}>
        <p>{post.id}</p>
        <h1>{post.title}</h1>
        <p>{post.content}</p>
        <p>{post.author.name}</p>
      </div>
    ))}
  </main>;
}


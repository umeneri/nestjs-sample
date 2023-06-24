'use client'

import { useQuery } from "@apollo/client";
import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr'
import { UsersDocument } from '@/dist/gql/graphql'
// import { getClient } from '@/lib/apolloClient'
export const revalidate = 5

export default function UserList() {
  // const { data, error, refetch } = useSuspenseQuery(UsersDocument)
  const { data, error, refetch } = useQuery(UsersDocument)
  // const { data } = await getClient().query({ query: UsersDocument })

  return (
    <div>
      <h1>User List</h1>
      <button onClick={() => refetch()}>reload</button>
      <div>
        {data?.users.map((user) => (
          <div key={user.id}>
            <p>{user.id}</p>
            <h3>{user.name}</h3>
            <p>{user.email}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

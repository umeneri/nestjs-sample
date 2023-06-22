import { UsersDocument } from '@/dist/gql/graphql'
import { getClient } from '@/lib/apolloClient'

export default async function UserList() {
  const { data } = await getClient().query({ query: UsersDocument })

  return (
    <div>
      <h1>User List</h1>
      <div>
        {data.users.map((user) => (
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

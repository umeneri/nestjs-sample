import { getClient } from "@/lib/apolloClient";
import { gql } from "@apollo/client";

export const revalidate = 5;

const query = gql`query Users {
    users {
        id
        name
        email
    }
}`;

export default async function Page() {
  const {data} = await getClient().query({
    query,
  });
  console.log(data)

  return <main>
    {data.users.map((user) => (
      <div key={user.id}>
        <p>{user.id}</p>
        <h1>{user.name}</h1>
        <p>{user.email}</p>
      </div>
    ))}
  </main>;
}

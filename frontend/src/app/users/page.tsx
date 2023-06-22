'use client'

import { useMutation } from '@apollo/client'
import { ChangeEvent, FormEvent, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { CreateUserDocument } from '@/dist/gql/graphql'

export const revalidate = 5

export default async function Page() {
  const [addUser, { data: mutationData }] = useMutation(CreateUserDocument)
  const [name, setName] = useState('')
  // const [email, setEmail] = useState('');

  console.log(name)

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    e.stopPropagation()
    const id = uuidv4()
    // await addUser({variables: {newUser: {id, name, email}}});
    await addUser({ variables: { newUser: { id, name, email: 'hoge@gmail.com' } } })
  }

  const onNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log('namechange')
    e.preventDefault()
    e.stopPropagation()
    setName(e.target.value)
  }

  // const onEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
  //   e.preventDefault();
  //   e.stopPropagation();
  //   setEmail(e.target.value);
  // }

  return (
    <div>
      <div className="m-8">
        <h1>Users</h1>
      </div>
      <div>
        <form className="flex items-center mt-4" onSubmit={onSubmit}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            className="border mx-2 p-1 text-black"
            onChange={(e) => setName(e.target.value)}
          />
          {/*<label htmlFor="email">Email</label>*/}
          {/*<input type="email" name="email" className="border mx-2 p-1 text-black" value={email}*/}
          {/*       onChange={onEmailChange}/>*/}
          <button type="submit" className="bg-blue-600 px-2 py-1 rounded-lg text-sm text-white">
            Add User
          </button>
        </form>
      </div>
    </div>
  )
}

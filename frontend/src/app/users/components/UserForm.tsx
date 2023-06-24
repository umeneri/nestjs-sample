'use client'

import { useMutation } from '@apollo/client'
import { ChangeEvent, FormEvent, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { CreateUserDocument } from '@/dist/gql/graphql'

export default function UserForm() {
  const [addUser, {data, loading, error}] = useMutation(CreateUserDocument)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>{error.message}</div>
  }

  const onSubmit = async (e: FormEvent) => {
    const id = uuidv4()
    await addUser({variables: {newUser: {id, name, email}}})
  }

  const onNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
  }

  const onEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  }

  return (
    <div>
      <form className="flex items-center mt-4" onSubmit={onSubmit}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          className="border mx-2 p-1 text-black"
          onChange={onNameChange}
        />
        <label htmlFor="email">Email</label>
        <input type="email" name="email" className="border mx-2 p-1 text-black" value={email}
               onChange={onEmailChange}/>
        <button type="submit" className="bg-blue-600 px-2 py-1 rounded-lg text-sm text-white">
          Add User
        </button>
      </form>
    </div>
  )
}

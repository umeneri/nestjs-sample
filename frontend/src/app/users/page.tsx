import UserForm from "@/app/users/components/UserForm";
import UserList from "@/app/users/components/UserList";

export const revalidate = 5

export default function Page() {
  return (
    <>
      <UserForm />
      <UserList />
    </>
  )
}

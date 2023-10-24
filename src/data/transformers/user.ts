interface Props {
  id: number
  email: string
  first_name: string
  last_name: string
  avatar: string
}

const transformUser = ({ id, email, first_name, last_name, avatar }: Props) => ({
  id,
  email,
  firstName: first_name,
  lastName: last_name,
  avatar
})

export const transformUsers = (users: Props[]) => users.map(transformUser)

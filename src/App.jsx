import { useCallback, useEffect, useState } from 'react'

import UserDetails from './components/UserDetails'
import { getUsers } from './data/apiCalls'
import { transformUsers } from './data/transformers/user'
import HighlightWrapper from './components/HighlightWrapper'
import Dropdown from './components/Dropdown'

const SORT_OPTIONS = [
  { value: 'asc', title: 'Id ⬆️' },
  { value: 'desc', title: 'Id ⬇️' }
]

const App = () => {
  const [userList, setUserList] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const [selectedSort, setSelectedSort] = useState('asc')

  const handleFetchData = useCallback(async () => {
    setIsError(false)
    setIsLoading(true)

    try {
      const { data } = await getUsers()
      console.log(data.data)

      const transformedResponse = transformUsers(data.data)

      setUserList(transformedResponse)
    } catch (error) {
      console.log(error)
      setIsError(true)
    }

    setIsLoading(false)
  }, [])

  const sortedUsers = userList.sort((a, b) => {
    if (selectedSort === 'asc') return a.id - b.id

    return b.id - a.id
  })

  useEffect(() => {
    handleFetchData()
  }, [handleFetchData])

  const renderUser = ({ id, email, firstName, lastName }) => {
    return (
      <div key={id}>
        <HighlightWrapper>
          <>
            <h3>
              {firstName} {lastName} ({id})
            </h3>
            <UserDetails email={email} />
          </>
        </HighlightWrapper>
      </div>
    )
  }

  if (isLoading) return <div>Loading...</div>

  if (isError) return <div>Something went wrong...</div>

  return (
    <div>
      <button onClick={handleFetchData}>♻️</button>
      <Dropdown
        options={SORT_OPTIONS}
        selectedValue={selectedSort}
        onSelectedChange={setSelectedSort}
      />
      <div>{sortedUsers.map(renderUser)}</div>
    </div>
  )
}

export default App

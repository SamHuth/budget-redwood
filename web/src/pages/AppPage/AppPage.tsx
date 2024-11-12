import { Button } from '@mantine/core'

import { Metadata } from '@redwoodjs/web'

import { useAuth } from 'src/auth'

const AppPage = () => {
  const { currentUser, logOut } = useAuth()

  return (
    <>
      <Metadata title="App" description="App page" />
      <h1>Hi, {currentUser?.id}</h1>
      <Button onClick={logOut}>Logout</Button>
    </>
  )
}

export default AppPage

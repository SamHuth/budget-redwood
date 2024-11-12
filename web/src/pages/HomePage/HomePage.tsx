// import { Link, routes } from '@redwoodjs/router'
import { navigate, routes } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'

const HomePage = () => {
  return (
    <>
      <Metadata title="Home" description="Home page" />

      <h1>HomePage</h1>
      <button onClick={() => navigate(routes.login())}>Login</button>
    </>
  )
}

export default HomePage

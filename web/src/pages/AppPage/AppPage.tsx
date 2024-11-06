// import { Link, routes } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'

const AppPage = () => {
  return (
    <>
      <Metadata title="App" description="App page" />

      <h1>AppPage</h1>
      <p>
        Find me in <code>./web/src/pages/AppPage/AppPage.tsx</code>
      </p>
      {/*
          My default route is named `app`, link to me with:
          `<Link to={routes.app()}>App</Link>`
      */}
    </>
  )
}

export default AppPage

import { AppShell } from '@mantine/core'

import AppHeader from 'src/components/AppHeader/AppHeader'

type AppLayoutProps = {
  children?: React.ReactNode
}

const AppLayout = ({ children }: AppLayoutProps) => {
  return (
    <AppShell layout="alt" header={{ height: 60 }} padding="md">
      <AppShell.Header>
        <AppHeader />
      </AppShell.Header>
      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  )
}

export default AppLayout

import { Group, Menu, Text, rem, ActionIcon } from '@mantine/core'
import { IconLogout, IconMenu2, IconSettings } from '@tabler/icons-react'

import { useAuth } from 'src/auth'

const AppHeader = () => {
  const { logOut } = useAuth()

  return (
    <Group justify="space-between" gap="sm" p="md">
      <Text variant="default">App Title</Text>
      <Menu shadow="md" width={200} position="bottom-end" withArrow>
        <Menu.Target>
          <ActionIcon variant="default" aria-label="Settings">
            <IconMenu2 stroke={1} style={{ width: '70%', height: '70%' }} />
          </ActionIcon>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Item
            leftSection={
              <IconSettings style={{ width: rem(14), height: rem(14) }} />
            }
          >
            Settings
          </Menu.Item>
          <Menu.Divider />
          <Menu.Item
            color="red"
            onClick={() => logOut()}
            leftSection={
              <IconLogout style={{ width: rem(14), height: rem(14) }} />
            }
          >
            Logout
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </Group>
  )
}

export default AppHeader

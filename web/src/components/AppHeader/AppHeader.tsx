import { Group, Text } from '@mantine/core'

const AppHeader = () => {
  return (
    <Group justify="space-between" gap="sm" p="md">
      <Text variant="default">App Title</Text>
      <Text variant="default">Menu</Text>
    </Group>
  )
}

export default AppHeader

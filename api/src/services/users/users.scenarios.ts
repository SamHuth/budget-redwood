import type { Prisma, User } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.UserCreateArgs>({
  user: {
    one: {
      data: {
        updatedAt: '2024-11-16T03:39:52.521Z',
        email: 'String1170227',
        hashedPassword: 'String',
        salt: 'String',
      },
    },
    two: {
      data: {
        updatedAt: '2024-11-16T03:39:52.521Z',
        email: 'String202083',
        hashedPassword: 'String',
        salt: 'String',
      },
    },
  },
})

export type StandardScenario = ScenarioData<User, 'user'>

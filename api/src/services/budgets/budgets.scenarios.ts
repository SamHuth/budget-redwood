import type { Prisma, Budget } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.BudgetCreateArgs>({
  budget: {
    one: {
      data: {
        updatedAt: '2024-11-16T03:37:28.392Z',
        name: 'String',
        user: {
          create: {
            updatedAt: '2024-11-16T03:37:28.392Z',
            email: 'String8303780',
            hashedPassword: 'String',
            salt: 'String',
          },
        },
      },
    },
    two: {
      data: {
        updatedAt: '2024-11-16T03:37:28.392Z',
        name: 'String',
        user: {
          create: {
            updatedAt: '2024-11-16T03:37:28.392Z',
            email: 'String4816998',
            hashedPassword: 'String',
            salt: 'String',
          },
        },
      },
    },
  },
})

export type StandardScenario = ScenarioData<Budget, 'budget'>

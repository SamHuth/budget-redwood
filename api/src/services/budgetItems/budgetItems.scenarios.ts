import type { Prisma, BudgetItem } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.BudgetItemCreateArgs>({
  budgetItem: {
    one: {
      data: {
        updatedAt: '2024-11-16T03:39:39.005Z',
        type: 'String',
        amount: 7627485.169118347,
        recurring: true,
        startDate: '2024-11-16T03:39:39.005Z',
        endDate: '2024-11-16T03:39:39.005Z',
        dayOfMonth: 7129087,
        budget: {
          create: {
            updatedAt: '2024-11-16T03:39:39.006Z',
            name: 'String',
            user: {
              create: {
                updatedAt: '2024-11-16T03:39:39.006Z',
                email: 'String544753',
                hashedPassword: 'String',
                salt: 'String',
              },
            },
          },
        },
      },
    },
    two: {
      data: {
        updatedAt: '2024-11-16T03:39:39.006Z',
        type: 'String',
        amount: 3443074.261809067,
        recurring: true,
        startDate: '2024-11-16T03:39:39.006Z',
        endDate: '2024-11-16T03:39:39.006Z',
        dayOfMonth: 9652359,
        budget: {
          create: {
            updatedAt: '2024-11-16T03:39:39.006Z',
            name: 'String',
            user: {
              create: {
                updatedAt: '2024-11-16T03:39:39.006Z',
                email: 'String8292229',
                hashedPassword: 'String',
                salt: 'String',
              },
            },
          },
        },
      },
    },
  },
})

export type StandardScenario = ScenarioData<BudgetItem, 'budgetItem'>

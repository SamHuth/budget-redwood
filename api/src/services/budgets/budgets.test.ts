import type { Budget } from '@prisma/client'

import {
  budgets,
  budget,
  createBudget,
  updateBudget,
  deleteBudget,
} from './budgets'
import type { StandardScenario } from './budgets.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('budgets', () => {
  scenario('returns all budgets', async (scenario: StandardScenario) => {
    const result = await budgets()

    expect(result.length).toEqual(Object.keys(scenario.budget).length)
  })

  scenario('returns a single budget', async (scenario: StandardScenario) => {
    const result = await budget({ id: scenario.budget.one.id })

    expect(result).toEqual(scenario.budget.one)
  })

  scenario('creates a budget', async (scenario: StandardScenario) => {
    const result = await createBudget({
      input: {
        updatedAt: '2024-11-16T03:37:28.386Z',
        name: 'String',
        userId: scenario.budget.two.userId,
      },
    })

    expect(result.updatedAt).toEqual(new Date('2024-11-16T03:37:28.386Z'))
    expect(result.name).toEqual('String')
    expect(result.userId).toEqual(scenario.budget.two.userId)
  })

  scenario('updates a budget', async (scenario: StandardScenario) => {
    const original = (await budget({ id: scenario.budget.one.id })) as Budget
    const result = await updateBudget({
      id: original.id,
      input: { updatedAt: '2024-11-17T03:37:28.386Z' },
    })

    expect(result.updatedAt).toEqual(new Date('2024-11-17T03:37:28.386Z'))
  })

  scenario('deletes a budget', async (scenario: StandardScenario) => {
    const original = (await deleteBudget({
      id: scenario.budget.one.id,
    })) as Budget
    const result = await budget({ id: original.id })

    expect(result).toEqual(null)
  })
})

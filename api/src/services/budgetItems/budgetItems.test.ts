import type { BudgetItem } from '@prisma/client'

import {
  budgetItems,
  budgetItem,
  createBudgetItem,
  updateBudgetItem,
  deleteBudgetItem,
} from './budgetItems'
import type { StandardScenario } from './budgetItems.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('budgetItems', () => {
  scenario('returns all budgetItems', async (scenario: StandardScenario) => {
    const result = await budgetItems()

    expect(result.length).toEqual(Object.keys(scenario.budgetItem).length)
  })

  scenario(
    'returns a single budgetItem',
    async (scenario: StandardScenario) => {
      const result = await budgetItem({ id: scenario.budgetItem.one.id })

      expect(result).toEqual(scenario.budgetItem.one)
    }
  )

  scenario('creates a budgetItem', async (scenario: StandardScenario) => {
    const result = await createBudgetItem({
      input: {
        updatedAt: '2024-11-16T03:39:38.973Z',
        budgetId: scenario.budgetItem.two.budgetId,
        type: 'String',
        amount: 2914631.5554242963,
        recurring: true,
        startDate: '2024-11-16T03:39:38.973Z',
        endDate: '2024-11-16T03:39:38.973Z',
        dayOfMonth: 2755256,
      },
    })

    expect(result.updatedAt).toEqual(new Date('2024-11-16T03:39:38.973Z'))
    expect(result.budgetId).toEqual(scenario.budgetItem.two.budgetId)
    expect(result.type).toEqual('String')
    expect(result.amount).toEqual(2914631.5554242963)
    expect(result.recurring).toEqual(true)
    expect(result.startDate).toEqual(new Date('2024-11-16T03:39:38.973Z'))
    expect(result.endDate).toEqual(new Date('2024-11-16T03:39:38.973Z'))
    expect(result.dayOfMonth).toEqual(2755256)
  })

  scenario('updates a budgetItem', async (scenario: StandardScenario) => {
    const original = (await budgetItem({
      id: scenario.budgetItem.one.id,
    })) as BudgetItem
    const result = await updateBudgetItem({
      id: original.id,
      input: { updatedAt: '2024-11-17T03:39:38.973Z' },
    })

    expect(result.updatedAt).toEqual(new Date('2024-11-17T03:39:38.973Z'))
  })

  scenario('deletes a budgetItem', async (scenario: StandardScenario) => {
    const original = (await deleteBudgetItem({
      id: scenario.budgetItem.one.id,
    })) as BudgetItem
    const result = await budgetItem({ id: original.id })

    expect(result).toEqual(null)
  })
})

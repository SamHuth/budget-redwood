import type {
  QueryResolvers,
  MutationResolvers,
  BudgetRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const budgets: QueryResolvers['budgets'] = () => {
  const userId = context.currentUser?.id

  return db.budget.findMany({ where: { userId } })
}

export const budget: QueryResolvers['budget'] = ({ id }) => {
  const userId = context.currentUser?.id

  return db.budget.findUnique({
    where: { id, userId },
  })
}

export const createBudget: MutationResolvers['createBudget'] = ({ input }) => {
  const userId = context.currentUser?.id

  return db.budget.create({
    data: { ...input, userId },
  })
}

export const updateBudget: MutationResolvers['updateBudget'] = ({
  id,
  input,
}) => {
  const userId = context.currentUser?.id

  return db.budget.update({
    data: input,
    where: { id, userId },
  })
}

export const deleteBudget: MutationResolvers['deleteBudget'] = ({ id }) => {
  return db.budget.delete({
    where: { id },
  })
}

export const Budget: BudgetRelationResolvers = {
  user: (_obj, { root }) => {
    return db.budget.findUnique({ where: { id: root?.id } }).user()
  },
  budgetItems: (_obj, { root }) => {
    return db.budget.findUnique({ where: { id: root?.id } }).BudgetItem()
  },
}

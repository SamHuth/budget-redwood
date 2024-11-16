import type {
  QueryResolvers,
  MutationResolvers,
  BudgetItemRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const budgetItems: QueryResolvers['budgetItems'] = () => {
  const userId = context.currentUser?.id

  return db.budgetItem.findMany({
    where: {
      userId,
    },
  })
}

export const budgetItem: QueryResolvers['budgetItem'] = ({ id }) => {
  const userId = context.currentUser?.id

  return db.budgetItem.findUnique({
    where: { id, userId },
  })
}

export const createBudgetItem: MutationResolvers['createBudgetItem'] = ({
  input,
}) => {
  const userId = context.currentUser?.id

  return db.budgetItem.create({
    data: { ...input, userId },
  })
}

export const updateBudgetItem: MutationResolvers['updateBudgetItem'] = ({
  id,
  input,
}) => {
  const userId = context.currentUser?.id

  return db.budgetItem.update({
    data: input,
    where: { id, userId },
  })
}

export const deleteBudgetItem: MutationResolvers['deleteBudgetItem'] = ({
  id,
}) => {
  const userId = context.currentUser?.id

  return db.budgetItem.delete({
    where: { id, userId },
  })
}

export const BudgetItem: BudgetItemRelationResolvers = {
  budget: (_obj, { root }) => {
    return db.budgetItem.findUnique({ where: { id: root?.id } }).budget()
  },
}

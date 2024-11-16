import type {
  QueryResolvers,
  MutationResolvers,
  UserRelationResolvers,
} from 'types/graphql'

import { ValidationError } from '@redwoodjs/graphql-server'

import { db } from 'src/lib/db'

export const users: QueryResolvers['users'] = () => {
  return db.user.findMany()
}

export const user: QueryResolvers['user'] = ({ id }) => {
  const currentUserId = context.currentUser?.id

  if (id !== currentUserId) {
    throw new ValidationError('You do not have permission.')
  }

  return db.user.findUnique({
    where: { id },
  })
}

export const createUser: MutationResolvers['createUser'] = ({ input }) => {
  return db.user.create({
    data: input,
  })
}

export const updateUser: MutationResolvers['updateUser'] = ({ id, input }) => {
  const currentUserId = context.currentUser?.id

  if (id !== currentUserId) {
    throw new ValidationError('You do not have permission.')
  }

  return db.user.update({
    data: input,
    where: { id },
  })
}

export const deleteUser: MutationResolvers['deleteUser'] = ({ id }) => {
  const currentUserId = context.currentUser?.id

  if (id !== currentUserId) {
    throw new ValidationError('You do not have permission.')
  }

  return db.user.delete({
    where: { id },
  })
}

export const User: UserRelationResolvers = {
  Budget: (_obj, { root }) => {
    return db.user.findUnique({ where: { id: root?.id } }).Budget()
  },
}

import type { FindBudgets, FindBudgetsVariables } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import type {
  CellSuccessProps,
  CellFailureProps,
  TypedDocumentNode,
} from '@redwoodjs/web'

import Budgets from 'src/components/Budget/Budgets'

export const QUERY: TypedDocumentNode<FindBudgets, FindBudgetsVariables> = gql`
  query FindBudgets {
    budgets {
      id
      createdAt
      updatedAt
      name
      userId
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      No budgets yet.{' '}
      <Link to={routes.newBudget()} className="rw-link">
        Create one?
      </Link>
    </div>
  )
}

export const Failure = ({ error }: CellFailureProps<FindBudgets>) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({
  budgets,
}: CellSuccessProps<FindBudgets, FindBudgetsVariables>) => {
  return <Budgets budgets={budgets} />
}

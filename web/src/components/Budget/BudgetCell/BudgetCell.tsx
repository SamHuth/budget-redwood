import type { FindBudgetById, FindBudgetByIdVariables } from 'types/graphql'

import type {
  CellSuccessProps,
  CellFailureProps,
  TypedDocumentNode,
} from '@redwoodjs/web'

import Budget from 'src/components/Budget/Budget'

export const QUERY: TypedDocumentNode<FindBudgetById, FindBudgetByIdVariables> =
  gql`
    query FindBudgetById($id: Int!) {
      budget: budget(id: $id) {
        id
        createdAt
        updatedAt
        name
        userId
      }
    }
  `

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Budget not found</div>

export const Failure = ({
  error,
}: CellFailureProps<FindBudgetByIdVariables>) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({
  budget,
}: CellSuccessProps<FindBudgetById, FindBudgetByIdVariables>) => {
  return <Budget budget={budget} />
}

import type {
  EditBudgetById,
  UpdateBudgetInput,
  UpdateBudgetMutationVariables,
} from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import type {
  CellSuccessProps,
  CellFailureProps,
  TypedDocumentNode,
} from '@redwoodjs/web'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import BudgetForm from 'src/components/Budget/BudgetForm'

export const QUERY: TypedDocumentNode<EditBudgetById> = gql`
  query EditBudgetById($id: Int!) {
    budget: budget(id: $id) {
      id
      createdAt
      updatedAt
      name
      userId
    }
  }
`

const UPDATE_BUDGET_MUTATION: TypedDocumentNode<
  EditBudgetById,
  UpdateBudgetMutationVariables
> = gql`
  mutation UpdateBudgetMutation($id: Int!, $input: UpdateBudgetInput!) {
    updateBudget(id: $id, input: $input) {
      id
      createdAt
      updatedAt
      name
      userId
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ budget }: CellSuccessProps<EditBudgetById>) => {
  const [updateBudget, { loading, error }] = useMutation(
    UPDATE_BUDGET_MUTATION,
    {
      onCompleted: () => {
        toast.success('Budget updated')
        navigate(routes.budgets())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (
    input: UpdateBudgetInput,
    id: EditBudgetById['budget']['id']
  ) => {
    updateBudget({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit Budget {budget?.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <BudgetForm
          budget={budget}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  )
}

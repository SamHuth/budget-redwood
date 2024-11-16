import type {
  CreateBudgetMutation,
  CreateBudgetInput,
  CreateBudgetMutationVariables,
} from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import type { TypedDocumentNode } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import BudgetForm from 'src/components/Budget/BudgetForm'

const CREATE_BUDGET_MUTATION: TypedDocumentNode<
  CreateBudgetMutation,
  CreateBudgetMutationVariables
> = gql`
  mutation CreateBudgetMutation($input: CreateBudgetInput!) {
    createBudget(input: $input) {
      id
    }
  }
`

const NewBudget = () => {
  const [createBudget, { loading, error }] = useMutation(
    CREATE_BUDGET_MUTATION,
    {
      onCompleted: () => {
        toast.success('Budget created')
        navigate(routes.budgets())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input: CreateBudgetInput) => {
    createBudget({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New Budget</h2>
      </header>
      <div className="rw-segment-main">
        <BudgetForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewBudget

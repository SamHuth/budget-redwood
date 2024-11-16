import EditBudgetCell from 'src/components/Budget/EditBudgetCell'

type BudgetPageProps = {
  id: number
}

const EditBudgetPage = ({ id }: BudgetPageProps) => {
  return <EditBudgetCell id={id} />
}

export default EditBudgetPage

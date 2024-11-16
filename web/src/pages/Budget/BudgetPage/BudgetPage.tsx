import BudgetCell from 'src/components/Budget/BudgetCell'

type BudgetPageProps = {
  id: number
}

const BudgetPage = ({ id }: BudgetPageProps) => {
  return <BudgetCell id={id} />
}

export default BudgetPage

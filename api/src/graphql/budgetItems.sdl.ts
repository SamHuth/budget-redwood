export const schema = gql`
  type BudgetItem {
    id: Int!
    createdAt: DateTime!
    updatedAt: DateTime!
    budget: Budget!
    budgetId: Int!
    type: String!
    amount: Float!
    recurring: Boolean!
    startDate: DateTime!
    endDate: DateTime!
    dayOfMonth: Int!
  }

  type Query {
    budgetItems: [BudgetItem!]! @requireAuth
    budgetItem(id: Int!): BudgetItem @requireAuth
  }

  input CreateBudgetItemInput {
    budgetId: Int!
    type: String!
    amount: Float!
    recurring: Boolean!
    startDate: DateTime!
    endDate: DateTime!
    dayOfMonth: Int!
  }

  input UpdateBudgetItemInput {
    type: String
    amount: Float
    recurring: Boolean
    startDate: DateTime
    endDate: DateTime
    dayOfMonth: Int
  }

  type Mutation {
    createBudgetItem(input: CreateBudgetItemInput!): BudgetItem! @requireAuth
    updateBudgetItem(id: Int!, input: UpdateBudgetItemInput!): BudgetItem!
      @requireAuth
    deleteBudgetItem(id: Int!): BudgetItem! @requireAuth
  }
`

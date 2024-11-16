import { Router, Route, PrivateSet, Set } from '@redwoodjs/router'

import { useAuth } from './auth'
import AppLayout from './layouts/AppLayout/AppLayout'
import AuthLayout from './layouts/AuthLayout/AuthLayout'

const Routes = () => {
  return (
    <Router useAuth={useAuth}>
      <Route path="/" page={HomePage} name="home" />
      <Route path="/home" page={HomePage} name="homePage" />
      <Route notfound page={NotFoundPage} />
      <Set wrap={AuthLayout}>
        <Route path="/login" page={LoginPage} name="login" />
        <Route path="/signup" page={SignupPage} name="signup" />
        <Route path="/forgot-password" page={ForgotPasswordPage} name="forgotPassword" />
        <Route path="/reset-password" page={ResetPasswordPage} name="resetPassword" />
      </Set>
      <PrivateSet unauthenticated="login" wrap={AppLayout}>
        <Route path="/app" page={AppPage} name="app" />
        <Route path="/app1" page={AppPage} name="app1" />
        <Route path="/budgets/new" page={BudgetNewBudgetPage} name="newBudget" />
        <Route path="/budgets/{id:Int}/edit" page={BudgetEditBudgetPage} name="editBudget" />
        <Route path="/budgets/{id:Int}" page={BudgetBudgetPage} name="budget" />
        <Route path="/budgets" page={BudgetBudgetsPage} name="budgets" />
      </PrivateSet>
    </Router>
  )
}

export default Routes

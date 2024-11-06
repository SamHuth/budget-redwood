import { Router, Route, PrivateSet } from '@redwoodjs/router'

import { useAuth } from './auth'

const Routes = () => {
  return (
    <Router useAuth={useAuth}>
      <Route path="/" page={HomePage} name="home" />
      <Route path="/home" page={HomePage} name="homePage" />
      <Route path="/login" page={LoginPage} name="login" />
      <Route path="/signup" page={SignupPage} name="signup" />
      <Route path="/forgot-password" page={ForgotPasswordPage} name="forgotPassword" />
      <Route path="/reset-password" page={ResetPasswordPage} name="resetPassword" />
      <Route notfound page={NotFoundPage} />
      <PrivateSet unauthenticated="login">
        <Route path="/app" page={AppPage} name="app" />
        <Route path="/app1" page={AppPage} name="app1" />
      </PrivateSet>
    </Router>
  )
}

export default Routes

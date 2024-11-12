import type { APIGatewayProxyEvent, Context } from 'aws-lambda'

import {
  DbAuthHandler,
  PasswordValidationError,
} from '@redwoodjs/auth-dbauth-api'
import type { DbAuthHandlerOptions, UserType } from '@redwoodjs/auth-dbauth-api'

import { cookieName } from 'src/lib/auth'
import { db } from 'src/lib/db'

export const handler = async (
  event: APIGatewayProxyEvent,
  context: Context
) => {
  const forgotPasswordOptions: DbAuthHandlerOptions['forgotPassword'] = {
    // Disabled for now - this can be handled later
    enabled: false,
    // handler() is invoked after verifying that a user was found with the given
    // username. This is where you can send the user an email with a link to
    // reset their password. With the default dbAuth routes and field names, the
    // URL to reset the password will be:
    //
    // https://example.com/reset-password?resetToken=${user.resetToken}
    //
    // Whatever is returned from this function will be returned from
    // the `forgotPassword()` function that is destructured from `useAuth()`.
    // You could use this return value to, for example, show the email
    // address in a toast message so the user will know it worked and where
    // to look for the email.
    //
    // Note that this return value is sent to the client in *plain text*
    // so don't include anything you wouldn't want prying eyes to see. The
    // `user` here has been sanitized to only include the fields listed in
    // `allowedUserFields` so it should be safe to return as-is.
    handler: (user, _resetToken) => {
      // TODO: Send user an email/message with a link to reset their password,
      // including the `resetToken`. The URL should look something like:
      // `http://localhost:8910/reset-password?resetToken=${resetToken}`

      return user
    },

    // How long the resetToken is valid for, in seconds (default is 24 hours)
    expires: 60 * 60 * 24,

    errors: {
      // for security reasons you may want to be vague here rather than expose
      // the fact that the email address wasn't found (prevents fishing for
      // valid email addresses)
      usernameNotFound: 'Username not found',
      // if the user somehow gets around client validation
      usernameRequired: 'Username is required',
    },
  }

  const loginOptions: DbAuthHandlerOptions['login'] = {
    handler: (user) => {
      // If you want to prevent someone logging in for another reason (maybe they
      // didn't validate their email yet), throw an error and it will be returned
      // by the `logIn()` function from `useAuth()` in the form of:
      // `{ message: 'Error message' }`
      return user
    },
    errors: {
      usernameOrPasswordMissing: 'Both username and password are required',
      usernameNotFound: 'Username or Password Incorrect',
      incorrectPassword: 'Username or Password Incorrect',
    },

    // How long a user will remain logged in, in seconds
    expires: 60 * 60 * 24 * 30, // 30 Days
  }

  const resetPasswordOptions: DbAuthHandlerOptions['resetPassword'] = {
    // handler() is invoked after the password has been successfully updated in
    // the database. Returning anything truthy will automatically log the user
    // in. Return `false` otherwise, and in the Reset Password page redirect the
    // user to the login page.
    handler: (_user) => {
      return true
    },

    // If `false` then the new password MUST be different from the current one
    allowReusedPassword: true,

    errors: {
      // the resetToken is valid, but expired
      resetTokenExpired: 'resetToken is expired',
      // no user was found with the given resetToken
      resetTokenInvalid: 'resetToken is invalid',
      // the resetToken was not present in the URL
      resetTokenRequired: 'resetToken is required',
      // new password is the same as the old password (apparently they did not forget it)
      reusedPassword: 'Must choose a new password',
    },
  }

  interface UserAttributes {
    name: string
  }

  const signupOptions: DbAuthHandlerOptions<
    UserType,
    UserAttributes
  >['signup'] = {
    handler: ({ username, hashedPassword, salt, userAttributes }) => {
      return db.user.create({
        data: {
          email: username,
          hashedPassword: hashedPassword,
          salt: salt,
          name: userAttributes.name,
        },
      })
    },
    passwordValidation: (password) => {
      if (password.length < 8) {
        throw new PasswordValidationError(
          'Password must be at least 8 characters'
        )
      }

      if (!password.match(/[A-Z]/)) {
        throw new PasswordValidationError(
          'Password must contain at least one capital letter'
        )
      }
      return true
    },
    errors: {
      fieldMissing: '${field} is required',
      usernameTaken: 'An account with email `${username}` is already in use',
    },
  }

  const authHandler = new DbAuthHandler(event, context, {
    // Provide prisma db client
    db: db,

    // The name of the property you'd call on `db` to access your user table.
    // i.e. if your Prisma model is named `User` this value would be `user`, as in `db.user`
    authModelAccessor: 'user',

    // A map of what dbAuth calls a field to what your database calls it.
    // `id` is whatever column you use to uniquely identify a user (probably
    // something like `id` or `userId` or even `email`)
    authFields: {
      id: 'id',
      username: 'email',
      hashedPassword: 'hashedPassword',
      salt: 'salt',
      resetToken: 'resetToken',
      resetTokenExpiresAt: 'resetTokenExpiresAt',
    },

    // A list of fields on your user object that are safe to return to the
    // client when invoking a handler that returns a user (like forgotPassword
    // and signup). This list should be as small as possible to be sure not to
    // leak any sensitive information to the client.
    allowedUserFields: ['id', 'email'],

    // Specifies attributes on the cookie that dbAuth sets in order to remember
    // who is logged in. See https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies#restrict_access_to_cookies
    cookie: {
      attributes: {
        HttpOnly: true,
        Path: '/',
        SameSite: 'Strict',
        Secure: process.env.NODE_ENV !== 'development',

        // If you need to allow other domains (besides the api side) access to
        // the dbAuth session cookie:
        // Domain: 'example.com',
      },
      name: cookieName,
    },

    forgotPassword: forgotPasswordOptions,
    login: loginOptions,
    resetPassword: resetPasswordOptions,
    signup: signupOptions,
  })

  return await authHandler.invoke()
}

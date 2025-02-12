import bcrypt from 'bcryptjs'

import { User } from '../../data/index.js'
import { validate, errors } from 'common'
const { CredentialsError, SystemError } = errors

export default (email, password) => {
  validate.email(email)
  validate.password(password)

  return (async () => {
    let user

    try {
      user = await User.findOne({ email })
    } catch (error) {
      throw new SystemError(error.message)
    }

    if (!user) throw new CredentialsError('wrong credentials')

    let match

    try {
      match = await bcrypt.compare(password, user.password)
    } catch (error) {
      throw new SystemError(error.message)
    }

    if (!match) throw new CredentialsError('wrong credentials')

    return {
      id: user._id.toString(),
      role: user.role,
    }
  })()
}

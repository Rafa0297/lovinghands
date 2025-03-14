import { errors } from 'common'

const { SystemError } = errors

export default () =>
  fetch(`${import.meta.env.VITE_API_URL}/ads`, {
    headers: {
      Authorization: `Bearer ${localStorage.token}`,
    },
  })
    .catch((error) => {
      throw new SystemError(error.message)
    })
    .then((res) => {
      if (res.ok)
        return res.json().catch((error) => {
          throw new SystemError(error.message)
        })

      return res
        .json()
        .catch((error) => {
          throw new SystemError(error.message)
        })
        .then(({ error, message }) => {
          throw new errors[error](message)
        })
    })

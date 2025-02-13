import { User, Ad, Review } from '../../data/index.js'

import { validate, errors } from 'common'
const { SystemError, NotFoundError } = errors

export default (userId, adId, comment, calification) => {
  validate.id(userId, 'userId')
  validate.id(adId, 'adId')
  validate.text(comment)

  return Promise.all([User.findById(userId).lean(), Ad.findById(adId)])
    .catch((error) => {
      throw new SystemError(error.message)
    })
    .then(([user, ad]) => {
      if (!user) throw new NotFoundError('user not found')
      if (!ad) throw new NotFoundError('ad not found')

      const review = new Review({
        author: userId,
        comment,
        calification,
      })

      ad.reviews.push(review)

      return ad.save().catch((error) => {
        throw new SystemError(error.message)
      })
    })
    .then((_) => {})
}

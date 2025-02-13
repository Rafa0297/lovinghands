import 'dotenv/config'
import db from '../../data/index.js'
import getFavoriteAds from './getFavoriteAds.js'

await db.connect(process.env.MONGO_URL_TEST)

try {
  const result = await getFavoriteAds('675862c6f2de13a8442b2167')
  console.log(result)
} catch (error) {
  console.error(error)
} finally {
  await db.disconnect()
}

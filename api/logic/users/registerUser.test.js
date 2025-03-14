import 'dotenv/config'
import db from '../../data/index.js'

import registerUser from './registerUser.js'

await db.connect(process.env.MONGO_URL_TEST)

try {
  const result = await registerUser('Kiko Milano', 'kiko@milano.com', '123123123', '123123123', '+34605828090', 'elder')
  console.log('user registered')
} catch (error) {
  console.error(error)
} finally {
  await db.disconnect()
}

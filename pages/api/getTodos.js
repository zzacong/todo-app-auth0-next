import { withApiAuthRequired, getSession } from '@auth0/nextjs-auth0'
import { table, minifyRecords } from './utils/airtable'

export default withApiAuthRequired(async (req, res) => {
  const { user } = getSession(req, res)

  try {
    const records = await table
      .select({
        filterByFormula: `userId = '${user?.sub}'`,
      })
      .firstPage()
    const minifiedRecords = minifyRecords(records)
    res.statusCode = 200
    res.json(minifiedRecords)
  } catch (error) {
    console.error(error)
    res.statusCode = 500
    res.json({ msg: 'Something went wrong.' })
  }
})

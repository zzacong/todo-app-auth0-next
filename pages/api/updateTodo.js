import { table, minifyRecords } from './utils/airtable'
import auth0 from './utils/auth0'
import ownsRecord from './middleware/OwnsRecord'

export default ownsRecord(async (req, res) => {
  const { user } = await auth0.getSession(req)
  const { id, fields } = req.body

  try {
    const updatedRecords = await table.update([{ id, fields }])
    res.statusCode = 200
    res.json(minifyRecords(updatedRecords))
  } catch (error) {
    console.error(error)
    res.statusCode = 500
    res.json({ msg: 'Something went wrong.' })
  }
})

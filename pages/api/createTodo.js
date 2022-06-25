import { withApiAuthRequired, getSession } from '@auth0/nextjs-auth0'
import { table } from './utils/airtable'

export default withApiAuthRequired(async (req, res) => {
  const { description } = req.body
  const { user } = getSession(req, res)

  try {
    const createdRecords = await table.create([
      { fields: { description, userId: user.sub } },
    ])
    const createdRecord = {
      id: createdRecords[0].id,
      fields: createdRecords[0].fields,
    }
    res.status(201).json(createdRecord)
  } catch (error) {
    console.error(error)
    res.status(500).json({ msg: 'Something went wrong.' })
  }
})

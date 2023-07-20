import { withApiAuthRequired, getSession } from '@auth0/nextjs-auth0'
import { table, minifyRecords } from '~/server/airtable'

export default withApiAuthRequired(async (req, res) => {
  const { user } = await getSession(req, res)

  try {
    if (req.method === 'GET') {
      const records = await table
        .select({
          filterByFormula: `userId = '${user?.sub}'`,
        })
        .firstPage()
      const minifiedRecords = minifyRecords(records)
      res.json(minifiedRecords)
      return
    }

    if (req.method === 'POST') {
      const createdRecords = await table.create([
        { fields: { description, userId: user.sub } },
      ])
      const createdRecord = {
        id: createdRecords[0].id,
        fields: createdRecords[0].fields,
      }
      res.status(201).json(createdRecord)
      return
    }

    res.status(405).json({ msg: `Method ${req.method} not allowed` })
  } catch (error) {
    console.error(error)
    res.status(500).json({ msg: 'Something went wrong.' })
  }
})

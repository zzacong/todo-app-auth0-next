import { withApiAuthRequired, getSession } from '@auth0/nextjs-auth0'
import { table } from '../utils/airtable'

export const ownsRecord = handler =>
  withApiAuthRequired(async (req, res) => {
    const { user } = getSession(req, res)
    const { id } = req.body

    try {
      const existingRecord = await table.find(id)
      if (!existingRecord || user.sub !== existingRecord.fields.userId) {
        res.statusCode = 404
        return res.json({ msg: 'Record not found' })
      }
      req.record = existingRecord
      return handler(req, res)
    } catch (error) {
      console.error(error)
      res.statusCode = 500
      return res.json({ msg: 'Something went wrong' })
    }
  })

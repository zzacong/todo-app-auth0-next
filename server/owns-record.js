import { withApiAuthRequired, getSession } from '@auth0/nextjs-auth0'
import { table } from '~/server/airtable'

export const ownsRecord = handler =>
  withApiAuthRequired(async (req, res) => {
    const { user } = await getSession(req, res)
    const courseId = req.query.courseId

    try {
      const existingRecord = await table.find(courseId)
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

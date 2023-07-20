import { table, minifyRecords } from '~/server/airtable'
import { ownsRecord } from '~/server/owns-record'

export default ownsRecord(async (req, res) => {
  const courseId = req.query.courseId
  const { fields } = req.body

  try {
    if (req.method === 'PUT') {
      const updatedRecords = await table.update([{ id: courseId, fields }])
      res.status(200).json(minifyRecords(updatedRecords))
      return
    }

    if (req.method === 'DELETE') {
      await table.destroy([courseId])
      res.status(204).end()
      return
    }

    res.status(405).json({ msg: `Method ${req.method} not allowed` })
  } catch (error) {
    console.error(error)
    res.status(500).json({ msg: 'Something went wrong.' })
  }
})

import { table, minifyRecords } from './utils/airtable'
import { ownsRecord } from './middleware/OwnsRecord'

export default ownsRecord(async (req, res) => {
  const { id, fields } = req.body

  try {
    const updatedRecords = await table.update([{ id, fields }])
    res.status(200).json(minifyRecords(updatedRecords))
  } catch (error) {
    console.error(error)
    res.status(500).json({ msg: 'Something went wrong.' })
  }
})

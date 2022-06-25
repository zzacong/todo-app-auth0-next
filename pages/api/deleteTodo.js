import { table, minifyRecords } from './utils/airtable'
import { ownsRecord } from './middleware/OwnsRecord'

export default ownsRecord(async (req, res) => {
  const { id } = req.body

  try {
    const deletedRecords = await table.destroy([id])
    res.status(200).json(minifyRecords(deletedRecords))
  } catch (error) {
    console.error(error)
    res.status(500).json({ msg: 'Something went wrong.' })
  }
})

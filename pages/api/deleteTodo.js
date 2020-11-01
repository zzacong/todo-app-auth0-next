import { table, minifyRecords } from './utils/airtable'

export default async (req, res) => {
  const { id } = req.body
  try {
    const deletedRecords = await table.destroy([id])
    res.statusCode = 200
    res.json(minifyRecords(deletedRecords))
  } catch (error) {
    console.error(error)
    res.statusCode = 500
    res.json({ msg: 'Something went wrong.' })
  }
}

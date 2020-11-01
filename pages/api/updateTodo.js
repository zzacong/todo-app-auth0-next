import { table, minifyRecords } from './utils/airtable'

export default async (req, res) => {
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
}

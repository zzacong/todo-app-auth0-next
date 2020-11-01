import { table } from './utils/airtable'

export default async (req, res) => {
  const { description } = req.body
  try {
    const createdRecords = await table.create([{ fields: { description } }])
    const createdRecord = {
      id: createdRecords[0].id,
      fields: createdRecords[0].fields,
    }
    res.statusCode = 201
    res.json(createdRecord)
  } catch (error) {
    console.error(error)
    res.statusCode = 500
    res.json({ msg: 'Something went wrong.' })
  }
}

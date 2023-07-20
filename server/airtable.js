import Airtable from 'airtable'

const keys = {
  apiKey: process.env.AIRTABLE_API_KEY,
  baseId: process.env.AIRTABLE_BASE_ID,
  tableName: process.env.AIRTABLE_TABLE_NAME,
}

const base = new Airtable({ apiKey: keys.apiKey }).base(keys.baseId)
const table = base(keys.tableName)

const getMinifiedRecord = record => {
  if (!record.fields.completed) {
    record.fields.completed = false
  }
  return {
    id: record.id,
    fields: record.fields,
  }
}

const minifyRecords = records => {
  return records.map(record => getMinifiedRecord(record))
}

export { table, minifyRecords }

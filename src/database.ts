import pkg from 'pg'

const { Pool } = pkg

export const pool = new Pool({
  connectionString:
    'postgres://postgres:postgres@localhost:5432/procedures_functions?schema=public',
})

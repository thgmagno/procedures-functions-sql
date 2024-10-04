'use server'

import { pool } from '@/database'
import { ActionsDBFormState } from '@/lib/states'
import { revalidatePath } from 'next/cache'

interface Users {
  id: number
  name: string
  balance: number
}

export async function createTableUser(): Promise<ActionsDBFormState> {
  const query = `
        CREATE TABLE IF NOT EXISTS "users" (
          id SERIAL PRIMARY KEY,
          name VARCHAR(50) NOT NULL,
          balance NUMERIC(15, 2) NOT NULL DEFAULT 0.00
        );`

  try {
    await pool.query(query)
  } catch (error) {
    return {
      error: 'Erro ao criar tabela: ' + error,
    }
  }

  return { response: 'Tabela criada com sucesso!' }
}

export async function populateTableUser(): Promise<ActionsDBFormState> {
  const query = `
    INSERT INTO users (id, name) VALUES (1, 'Ana'), (2, 'Pedro')
    ON CONFLICT (id) DO NOTHING;`

  try {
    await pool.query(query)
  } catch (error) {
    return {
      error: 'Erro ao popular tabela: ' + error,
    }
  }

  return { response: 'Tabela populada com sucesso!' }
}

export async function resetTableUser(): Promise<ActionsDBFormState> {
  const query = `UPDATE users set balance = 0.00;`

  try {
    await pool.query(query)
  } catch (error) {
    return {
      error: 'Erro ao atualizar tabela: ' + error,
    }
  }

  revalidatePath('/')
  return { response: 'Tabela atualizada com sucesso!' }
}

export async function getUsersInfo(): Promise<Users[]> {
  const query = `
    SELECT * FROM users ORDER BY name;
  `

  try {
    const res = await pool.query(query)

    const users: Users[] = res.rows.map((row) => ({
      id: row.id,
      name: row.name,
      balance: parseFloat(row.balance),
    }))

    return users
  } catch (error) {
    console.error('Erro ao carregar usuários:', error)
    throw error
  }
}

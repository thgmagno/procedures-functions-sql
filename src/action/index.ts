'use server'

import { pool } from '@/database'
import { Users } from '@/lib/dto'
import { ActionsDBFormState } from '@/lib/states'
import { revalidatePath } from 'next/cache'

export async function createTableUser(): Promise<ActionsDBFormState> {
  const query = `
        CREATE TABLE IF NOT EXISTS "users" (
          id SERIAL PRIMARY KEY,
          name VARCHAR(50) NOT NULL,
          balance NUMERIC(15, 2) NOT NULL DEFAULT 1000.00,
          avatar_url VARCHAR(255) NOT NULL
        );`

  try {
    await pool.query(query)
  } catch (error) {
    return {
      success: false,
      message: 'Erro ao criar tabela: ' + error,
    }
  }

  return { success: true, message: 'Tabela criada com sucesso!' }
}

export async function populateTableUser(): Promise<ActionsDBFormState> {
  const query = `
    INSERT INTO users (id, name) VALUES (1, 'Ana'), (2, 'Pedro')
    ON CONFLICT (id) DO NOTHING;`

  try {
    await pool.query(query)
  } catch (error) {
    return {
      success: false,
      message: 'Erro ao popular tabela: ' + error,
    }
  }

  return { success: true, message: 'Tabela populada com sucesso!' }
}

export async function resetTableUser(): Promise<ActionsDBFormState> {
  const query = `UPDATE users set balance = 0.00;`

  try {
    await pool.query(query)
  } catch (error) {
    return {
      success: false,
      message: 'Erro ao atualizar tabela: ' + error,
    }
  }

  revalidatePath('/')
  return { success: true, message: 'Tabela atualizada com sucesso!' }
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
      avatar_url: row.avatar_url,
    }))

    return users
  } catch (error) {
    console.error('Erro ao carregar usuários:', error)
    throw error
  }
}

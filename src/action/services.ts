'use server'

import { pool } from '@/database'
import { ActionsDBFormState } from '@/lib/states'
import { revalidatePath } from 'next/cache'

export async function deposit(
  formState: ActionsDBFormState,
  formData: FormData,
): Promise<ActionsDBFormState> {
  const userId = 1
  const amount = 100

  const query = `
    CALL deposit(${userId}, ${amount});
  `

  try {
    await pool.query(query)
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, message: error.message }
    } else {
      return { success: false, message: 'Erro interno do servidor.' }
    }
  }

  revalidatePath('/')
  return { success: true, message: 'Depósito realizado com sucesso.' }
}

export async function transfer() {
  // CALL transfer(p_senderId, p_receiverId, p_amount);

  revalidatePath('/')
}

export async function withdraw() {
  // CALL withdraw(p_userId, p_amount);

  revalidatePath('/')
}

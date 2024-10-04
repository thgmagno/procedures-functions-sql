import { getUsersInfo } from '@/action'

export default async function Home() {
  const users = await getUsersInfo()
  const formatBRL = (value: number) =>
    new Intl.NumberFormat('pt-br', {
      currency: 'BRL',
      style: 'currency',
    }).format(value)

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-200 p-12">
      <div className="w-[672px] rounded-md bg-white p-2">
        <table className="w-full text-center">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Saldo</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{formatBRL(user.balance)}</td>
                <td></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

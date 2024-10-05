import { getUsersInfo } from '@/action'
import { Display } from '@/components/display'

export default async function Home() {
  const users = await getUsersInfo()

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-900 py-24">
      <div className="w-[96%] max-w-2xl p-2">
        <Display users={users} />
      </div>
    </div>
  )
}

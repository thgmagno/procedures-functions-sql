import { Users } from '@/lib/dto'
import { Sheets } from '../sheets'
import { Dashboard } from './Dashboard'

export function Display({ users }: { users: Users[] }) {
  return (
    <div className="flex flex-col space-y-5">
      <Dashboard users={users} />
      <Sheets />
    </div>
  )
}

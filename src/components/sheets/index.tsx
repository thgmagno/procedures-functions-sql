import { DepositSheet } from './Deposit'
import { TransferSheet } from './Transfer'
import { WithdrawSheet } from './Withdraw'

export function Sheets() {
  return (
    <div className="flex flex-col gap-3 md:flex-row">
      <DepositSheet />
      <WithdrawSheet />
      <TransferSheet />
    </div>
  )
}

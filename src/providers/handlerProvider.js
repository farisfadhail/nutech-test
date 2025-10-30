import { asClass } from 'awilix'
import UserHandler from '../handlers/userHandler.js'
import BalanceHandler from '../handlers/balanceHandler.js'
import TransactionHandler from '../handlers/transactionHandler.js'

export default {
  userHandler: asClass(UserHandler).scoped(),
  balanceHandler: asClass(BalanceHandler).scoped(),
  transactionHandler: asClass(TransactionHandler).scoped(),
}

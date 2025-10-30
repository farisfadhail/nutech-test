import { asClass } from 'awilix'
import UserService from '../services/userService.js'
import BalanceService from '../services/balanceService.js'
import TransactionService from '../services/transactionService.js'
import ServiceService from '../services/serviceService.js'

export default {
  userService: asClass(UserService).scoped(),
  balanceService: asClass(BalanceService).scoped(),
  transactionService: asClass(TransactionService).scoped(),
  serviceService: asClass(ServiceService).scoped(),
}

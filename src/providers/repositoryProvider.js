import { asClass } from 'awilix'
import UserRepository from '../repositories/userRepository.js'
import BalanceRepository from '../repositories/balanceRepository.js'
import TopUpRepository from '../repositories/topUpRepository.js'
import ServiceRepository from '../repositories/serviceRepository.js'
import TransactionRepository from '../repositories/transactionRepository.js'

export default {
  userRepository: asClass(UserRepository).scoped(),
  balanceRepository: asClass(BalanceRepository).scoped(),
  topUpRepository: asClass(TopUpRepository).scoped(),
  serviceRepository: asClass(ServiceRepository).scoped(),
  transactionRepository: asClass(TransactionRepository).scoped(),
}

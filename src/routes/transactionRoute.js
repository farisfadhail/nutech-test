import { Router } from 'express'
import { makeInvoker } from 'awilix-express'
import TransactionHandler from '../handlers/transactionHandler.js'

const router = Router()
const api = makeInvoker(TransactionHandler)

router.post('/pay', api('payTransaction'))
router.get('/history', api('getHistoryTransactionsByUserId'))
router.get('/:invoiceNumber', api('getTransactionByInvoiceNumber'))

export default router

import { Router } from 'express'
import { makeInvoker } from 'awilix-express'
import BalanceHandler from '../handlers/balanceHandler.js'

const router = Router()
const api = makeInvoker(BalanceHandler)

router.get('/', api('getBalanceByUserId'))
router.post('/top-up', api('handleTopUp'))

export default router

import { Router } from 'express'
import { makeInvoker } from 'awilix-express'
import UserHandler from '../handlers/userHandler.js'
import { authMiddleware } from '../middlewares/authMiddleware.js'

const router = Router()
const api = makeInvoker(UserHandler)

router.post('/_register', api('registerUser'))
router.post('/_login', api('loginUser'))

router.get('/', authMiddleware, api('getAllUsers'))

export default router

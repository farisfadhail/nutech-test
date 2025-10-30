import { Router } from 'express'
import { makeInvoker } from 'awilix-express'
import ServiceHandler from '../handlers/serviceHandler.js'

const router = Router()
const api = makeInvoker(ServiceHandler)

router.get('/', api('getAllServices'))

export default router

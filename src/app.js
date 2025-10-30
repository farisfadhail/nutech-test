import express from 'express'
import { scopePerRequest } from 'awilix-express'
import container from './providers/appProvider.js'
import userRoute from './routes/userRoute.js'
import { authMiddleware } from './middlewares/authMiddleware.js'
import balanceRoute from './routes/balanceRoute.js'
import transactionRoute from './routes/transactionRoute.js'
import serviceRoute from './routes/serviceRoute.js'

const app = express()
app.use(express.json())

app.use(scopePerRequest(container))

app.get('/api', async (req, res) => {
  res.json({ message: 'Selamat datang di technical test Nutech!' })
})

app.use('/api/users', userRoute)
app.use('/api/balance', authMiddleware, balanceRoute)
app.use('/api/transactions', authMiddleware, transactionRoute)
app.use('/api/services', authMiddleware, serviceRoute)

export default app

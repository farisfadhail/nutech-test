const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main () {
  console.log('Starting seed...')

  await prisma.transaction.deleteMany()
  await prisma.topUp.deleteMany()
  await prisma.balance.deleteMany()
  await prisma.user.deleteMany()
  await prisma.service.deleteMany()

  console.log('Cleared existing data')

  await prisma.service.createMany({
    data: [
      // Pulsa & Paket Data
      {
        serviceCode: 'PULSA',
        serviceName: 'Pulsa',
        serviceTariff: 40000,
        description: 'Isi pulsa berbagai operator',
        isActive: true,
      },
      {
        serviceCode: 'PAKET_DATA',
        serviceName: 'Paket Data',
        serviceTariff: 50000,
        description: 'Paket internet berbagai operator',
        isActive: true,
      },

      // Listrik & Utilitas
      {
        serviceCode: 'PLN_PRABAYAR',
        serviceName: 'Listrik Prabayar',
        serviceTariff: 100000,
        description: 'Token listrik PLN',
        isActive: true,
      },
      {
        serviceCode: 'PLN_PASCABAYAR',
        serviceName: 'Listrik Pascabayar',
        serviceTariff: 150000,
        description: 'Pembayaran tagihan listrik PLN',
        isActive: true,
      },
      {
        serviceCode: 'PDAM',
        serviceName: 'PDAM Berlangganan',
        serviceTariff: 80000,
        description: 'Pembayaran air PDAM',
        isActive: true,
      },

      // TV & Internet
      {
        serviceCode: 'PGN',
        serviceName: 'PGN Berlangganan',
        serviceTariff: 120000,
        description: 'Pembayaran gas PGN',
        isActive: true,
      },
      {
        serviceCode: 'TV_BERLANGGANAN',
        serviceName: 'TV Berlangganan',
        serviceTariff: 150000,
        description: 'TV kabel dan satelit',
        isActive: true,
      },

      // Entertainment & Gaming
      {
        serviceCode: 'VOUCHER_GAME',
        serviceName: 'Voucher Game',
        serviceTariff: 100000,
        description: 'Voucher game online',
        isActive: true,
      },
      {
        serviceCode: 'VOUCHER_MAKANAN',
        serviceName: 'Voucher Makanan',
        serviceTariff: 75000,
        description: 'Voucher food delivery',
        isActive: true,
      },
      {
        serviceCode: 'MUSIK',
        serviceName: 'Musik Berlangganan',
        serviceTariff: 49000,
        description: 'Langganan musik streaming',
        isActive: true,
      },

      // E-Wallet & BPJS
      {
        serviceCode: 'QURBAN',
        serviceName: 'Qurban',
        serviceTariff: 2500000,
        description: 'Layanan qurban',
        isActive: true,
      },
      {
        serviceCode: 'ZAKAT',
        serviceName: 'Zakat',
        serviceTariff: 300000,
        description: 'Pembayaran zakat',
        isActive: true,
      },
      {
        serviceCode: 'BPJS',
        serviceName: 'BPJS Kesehatan',
        serviceTariff: 150000,
        description: 'Iuran BPJS Kesehatan',
        isActive: true,
      },
    ],
  })

  console.log(`Seed services data completed successfully!`)
}

main().catch((e) => {
  console.error('Seed failed:', e)
  process.exit(1)
}).finally(async () => {
  await prisma.$disconnect()
})
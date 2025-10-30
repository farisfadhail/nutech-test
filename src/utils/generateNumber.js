export const generateInvoiceNumber = () => {
  const timestamp = Date.now().toString()
  const randomNum = Math.floor(Math.random() * 1000).toString().padStart(3, '0')
  return `INV-${timestamp}-${randomNum}`
}
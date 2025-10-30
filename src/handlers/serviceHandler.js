export default class ServiceHandler {
  constructor ({ serviceService }) {
    this.serviceService = serviceService
  }

  async getAllServices (req, res, next) {
    try {
      const services = await this.serviceService.getAllServices()
      res.status(200).json({ services })
    } catch (error) {
      next(error)
    }
  }
}
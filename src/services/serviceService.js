export default class ServiceService {
  constructor ({ serviceRepository }) {
    this.serviceRepository = serviceRepository
  }

  async getAllServices () {
    return await this.serviceRepository.getAllServices()
  }
}


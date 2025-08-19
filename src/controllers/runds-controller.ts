import { Request, Response } from "express"

class RefundsController {
  async create(request: Request, response: Response) {
    return response.json({ message: "OK" })
  }
}

export { RefundsController }
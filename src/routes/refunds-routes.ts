import { Router } from "express"
import { RefundsController } from "@/controllers/runds-controller"
import { verifyUserAuthorization } from "@/middlewares/verify-user-authorization"

const refundsRoutes = Router()

const refundsController = new RefundsController()

refundsRoutes.post(
	"/",
	verifyUserAuthorization(["manager"]),
	refundsController.create
)

export { refundsRoutes }

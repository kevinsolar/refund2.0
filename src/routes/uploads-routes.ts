import { UploadsController } from "@/controllers/uploads-controller"
import { verifyUserAuthorization } from "@/middlewares/verify-user-authorization"
import { Router } from "express"
import multer from "multer"
import uploadConfig from "@/configs/upload"

const uploadsRoutes = Router()
const uploadsController = new UploadsController()

// parte de configuracoa do middleware Multer, usando uma forma organizado, criando um arquivo separado e importando aqui.
const upload = multer(uploadConfig.MULTER)

uploadsRoutes.use(verifyUserAuthorization(["employee", "manager"]))

uploadsRoutes.post("/", upload.single("file"), uploadsController.create)

export { uploadsRoutes }

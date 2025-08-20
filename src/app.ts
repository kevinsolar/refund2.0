import express from "express"
import "express-async-errors"
import cors from "cors"
import { errorHandling } from "./middlewares/error-handling"
import { routes } from "./routes"
import uploadConfig from "./configs/upload"

const app = express()
app.use(cors())
app.use(express.json())

// funcao para servir arquivos estaticos pela api, do express
app.use("/uploads", express.static(uploadConfig.UPLOADS_FOLDER))

app.use(routes)
app.use(errorHandling)

export { app }

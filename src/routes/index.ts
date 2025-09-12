import { Router } from "express"

import { usersRoutes } from "./users-routes"
import { sessionsRoutes } from "./sessions-routes"
import { refundsRoutes } from "./refunds-routes"
import { ensureAuthenticated } from "@/middlewares/ensure-authenticated"
import { uploadsRoutes } from "./uploads-routes"

const routes = Router()

// Rotas publicas
routes.use("/users", usersRoutes)
routes.use("/sessions", sessionsRoutes)

// Rotas privadas (precisa estar autenticado)
routes.use("/refunds", ensureAuthenticated, refundsRoutes)
routes.use("/uploads", ensureAuthenticated, uploadsRoutes)

export { routes }

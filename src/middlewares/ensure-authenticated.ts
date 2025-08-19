import { authConfig } from "@/configs/auth"
import { AppError } from "@/utils/AppError"
import { Request, Response, NextFunction } from "express"
import { verify } from "jsonwebtoken"

interface TokenPayload {
	role: string
	sub: string
}

function ensureAuthenticated(
	request: Request,
	response: Response,
	next: NextFunction
) {
	try {
		// recupera o token de autorização
		const authHeader = request.headers.authorization

		// verifica se conseguiu recuperar algo
		if (!authHeader) {
			throw new AppError("JWT is missing", 401) // se nao, toma erro
		}

		// token vem como Bearer, ou seja = [Bearer kj123kjj12lk3jklt] e so queremos o codigo, sem o Bearer, entao separamos e pegamos o que nos interessa.
		const [, token] = authHeader.split(" ")

    // verifica se o token é valido
		const { role, sub: user_id } = verify(
			token,
			authConfig.jwt.secret
		) as TokenPayload

		request.user = {
			id: user_id,
			role,
		}

    return next()
	} catch (error) {
    throw new AppError("Invalid JWT", 401)
  }
}

export { ensureAuthenticated }

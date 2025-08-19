import { Request, Response, NextFunction, request } from "express"

import { AppError } from "@/utils/AppError"

// verifica se o cargo tem permissao para fazer alguma tarefa, recebendo como parametro o cargo que tera acesso a funcao.
function verifyUserAuthorization(role: string[]) {
	return (request: Request, response: Response, next: NextFunction) => {
		// se nao tiver usuario na requisicao ou faltar um cargo no usuario, entao lançará um erro.
		if (!request.user || !role.includes(request.user.role)) {
			throw new AppError("Unauthorized", 401)
		}

		return next()
	}
}

export { verifyUserAuthorization }

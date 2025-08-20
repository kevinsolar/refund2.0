import { AppError } from "@/utils/AppError"
import { Request, Response } from "express"
import z from "zod"

import uploadConfig from "@/configs/upload"

class UploadsController {
	async create(request: Request, response: Response) {
		try {
			const fileSchema = z
				.object({
					filename: z
						.string()
						.min(1, { message: "Nome do arquivo é obrigatório" }),
					mimetype: z
						.string()
						.refine(
							(type) => uploadConfig.ACCEPTED_IMAGE_TYPES.includes(type),
							{
								message:
									"Tipo de arquivo não suportado, formatos permitidos: " +
									uploadConfig.ACCEPTED_IMAGE_TYPES,
							}
						),
					size: z
						.number()
						.positive()
						.refine(
							(size) => size <= uploadConfig.MAX_FILE_SIZE,
							`Arquivo excede o tamanho maximo de ${uploadConfig.MAX_SIZE}MB`
						),
				})
				.passthrough()

        const { file } = fileSchema.parse(request.file)

        response.json({ file })
		} catch (error) {
			throw new AppError("")
		}
		response.json({ file: request.file })
	}
}

export { UploadsController }

import { AppError } from "@/utils/AppError"
import { Request, Response } from "express"
import z, { ZodError } from "zod"

import uploadConfig from "@/configs/upload"
import { DiskStorage } from "@/providers/disk-storage"

class UploadsController {
	async create(request: Request, response: Response) {
		const diskStorage = new DiskStorage()

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

			// recebe o arquivo que foi feito upload
			const file = fileSchema.parse(request.file)
			// pega o nome do arquivo que vai ser salvo
			const filename = await diskStorage.saveFile(file.filename)

			response.json({ filename })
		} catch (error) {
			if (error instanceof ZodError) {
				if (request.file) {
					await diskStorage.deleteFile(request.file.filename, "tmp")
				}

				throw new AppError(error.issues[0].message)
			}

			throw error
		}
	}
}

export { UploadsController }

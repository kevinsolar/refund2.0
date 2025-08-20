import multer from "multer"
import path from "node:path"
import crypto from "node:crypto"

// cria uma pasta temporaria para armazenar os uploads de arquivos
// fazer dessa forma ao inves de (../../tmp) garante que vai funcionar independente do sistema operacional
const TMP_FOLDER = path.resolve(__dirname, "..", "..", "tmp")
const UPLOADS_FOLDER = path.relative(TMP_FOLDER, "uploads")

// estipula um tamanho maximo de upload
/*
  1KB = 1024bytes
  1MB = 1024KB || 1024 * 1024
  3MB = 1024 * 1024 * 3
*/
const MAX_SIZE = 3 //3MB
const MAX_FILE_SIZE = 1024 * 1024 * MAX_SIZE
// cria uma regra de quais extensoes de imgs iremos aceitar
const ACCEPTED_IMAGE_TYPES = [
	"image/jpeg",
	"image/png",
	"image/jpg",
	"image/webp",
	"image/avif",
]

const MULTER = {
	storage: multer.diskStorage({
		destination: TMP_FOLDER,
		filename(request, file, callback) {
			const fileHash = crypto.randomBytes(10).toString("hex")
      const fileName = `${fileHash}-${file.originalname}`

      return callback(null, fileName)
		},
	}),
}

export default {
  TMP_FOLDER,
  UPLOADS_FOLDER,
  MULTER,
  MAX_SIZE,
  MAX_FILE_SIZE,
  ACCEPTED_IMAGE_TYPES
}

/*
  notes:

  Multer = middleware que vai operar na rota, recebendo os arquivos e fazendo o tratamento e gerenciamento deles.
  multer.diskStorage = metodo que permite manipulacao de arquivos dentro do nosso diretorio.
  filename -> fileHash = utiliza o crypto para criar uma hash em string para colocar no nome da imagem e salvar no nosso DB.
  filename -> fileName = cria o novo novo para salvar fazer a juncao da hash com o nome original do arquivo.

*/

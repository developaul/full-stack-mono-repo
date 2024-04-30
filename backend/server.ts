import express from 'express'
import multer from 'multer'

import { defaultUsers } from './data'

const app = express()

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

const port = process.env.PORT ?? 3000

let data = defaultUsers

app.post('/api/files', upload.single('file'), (req, res) => {
	try {
		if (!req.file) return res.status(500).json({ message: 'Archivo requerido' })

		// Leer csv
		const csvString = req.file.buffer.toString('utf-8')

		// Transformar csv a json
		const csvJSON = JSON.parse(csvString)

		// Guardar json
		data = csvJSON

		// Retornar respuesta
		res.status(200).json({ message: 'El archivo se cargó correctamente' })
	} catch (error: any) {
		return res.status(500).json({ message: error?.message ?? 'Error desconocido' })
	}
})

app.get('/api/users', (req, res) => {
	try {
		const { q } = req.query

		// Validar parametro de busqueda
		if (!q) return res.status(200).json({ data })

		const queryParam = q.toString().toLowerCase()

		// Filtrar por el parametro de busquedas por cada columna
		const filteredData = data.filter(current => {
			const values = Object.values(current).map(current => current.toLowerCase())

			return values.includes(queryParam)
		})

		return res.status(200).json({ data: filteredData })
	} catch (error: any) {
		return res.status(500).json({ message: error?.message ?? 'Error desconocido' })
	}
})

app.listen(port, () => {
	console.log('Sever is running: ', port)
})

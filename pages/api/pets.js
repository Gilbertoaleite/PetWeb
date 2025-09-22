// API Route para listar pets
import fs from 'fs'
import path from 'path'

export default function handler(req, res) {
    // Configurar CORS
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Cache-Control, Pragma')

    // Handle preflight OPTIONS request
    if (req.method === 'OPTIONS') {
        res.status(200).end()
        return
    }

    if (req.method === 'GET') {
        try {
            const dbPath = path.join(process.cwd(), 'mock/db.json')
            const dbData = fs.readFileSync(dbPath, 'utf8')
            const db = JSON.parse(dbData)

            res.status(200).json(db.pets)
        } catch (error) {
            console.error('Erro ao ler pets:', error)
            res.status(500).json({ error: 'Erro interno do servidor' })
        }
    } else {
        res.status(405).json({ error: 'Método não permitido' })
    }
}
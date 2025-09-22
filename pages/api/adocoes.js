// API Route para adoções
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

    const dbPath = path.join(process.cwd(), 'mock/db.json')

    if (req.method === 'GET') {
        try {
            const dbData = fs.readFileSync(dbPath, 'utf8')
            const db = JSON.parse(dbData)

            res.status(200).json(db.adocoes)
        } catch (error) {
            console.error('Erro ao ler adoções:', error)
            res.status(500).json({ error: 'Erro interno do servidor' })
        }
    }

    else if (req.method === 'POST') {
        try {
            const dbData = fs.readFileSync(dbPath, 'utf8')
            const db = JSON.parse(dbData)

            const novaAdocao = {
                id: Date.now().toString(),
                ...req.body,
                dataAdocao: new Date().toISOString()
            }

            db.adocoes.push(novaAdocao)

            fs.writeFileSync(dbPath, JSON.stringify(db, null, 2))

            res.status(201).json(novaAdocao)
        } catch (error) {
            console.error('Erro ao criar adoção:', error)
            res.status(500).json({ error: 'Erro interno do servidor' })
        }
    }

    else {
        res.status(405).json({ error: 'Método não permitido' })
    }
}
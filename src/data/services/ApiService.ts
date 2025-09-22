import axios from 'axios';

const url = process.env.NEXT_PUBLIC_BASE_API || '/api';

console.log('🔍 BASE_API configurada:', url);

export const ApiService = axios.create({
    baseURL: url,
    headers: {
        'Content-Type': 'application/json'
    },
    timeout: 10000 // 10 segundos de timeout
});

// Interceptor para tratamento de erros
ApiService.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.code === 'ECONNABORTED' || error.message === 'Network Error') {
            console.error('🔴 Erro de conexão com a API:', url);
            console.error('💡 Soluções possíveis:');
            console.error('1. Verificar se o backend está rodando');
            console.error('2. Usar servidor mock: npm run mock');
            console.error('3. Configurar NEXT_PUBLIC_BASE_API no .env.local');
        }
        return Promise.reject(error);
    }
);

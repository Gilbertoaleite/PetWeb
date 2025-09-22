// Componente de Debug para verificar configurações
import { useEffect } from 'react';

export function DebugApiConfig() {
    useEffect(() => {
        console.log('🔍 Configurações de API:');
        console.log('NEXT_PUBLIC_BASE_API:', process.env.NEXT_PUBLIC_BASE_API);
        console.log('NODE_ENV:', process.env.NODE_ENV);

        // Testar conectividade
        if (process.env.NEXT_PUBLIC_BASE_API) {
            fetch(process.env.NEXT_PUBLIC_BASE_API + '/pets')
                .then(response => {
                    console.log('✅ Teste de conectividade:', response.status);
                    return response.json();
                })
                .then(data => {
                    console.log('📊 Dados recebidos:', data?.length, 'pets');
                })
                .catch(error => {
                    console.error('❌ Erro no teste:', error.message);
                });
        } else {
            console.error('❌ NEXT_PUBLIC_BASE_API não está definida!');
        }
    }, []);

    return (
        <div style={ {
            position: 'fixed',
            top: '10px',
            right: '10px',
            background: '#333',
            color: 'white',
            padding: '10px',
            borderRadius: '5px',
            fontSize: '12px',
            zIndex: 9999
        } }>
            <div><strong>🔍 Debug API</strong></div>
            <div>URL: { process.env.NEXT_PUBLIC_BASE_API || 'NÃO DEFINIDA' }</div>
            <div>ENV: { process.env.NODE_ENV }</div>
        </div>
    );
}
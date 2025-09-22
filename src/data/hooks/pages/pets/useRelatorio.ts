import { useState, useEffect } from "react";
import { Relatorio } from "../../../@types/Relatorio";
import { ApiService } from "../../../services/ApiService";

export function useRelatorio(){
    const [listaRelatorio, setListaRelatorio] = useState<Relatorio[]>([]);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState<string>('');

    useEffect(() => {
        const carregarRelatorios = async () => {
            try {
                setCarregando(true);
                setErro('');
                const resposta = await ApiService.get('/adocoes');
                
                // Filtrar apenas registros com estrutura completa
                const relatoriosFiltrados = resposta.data
                    .filter((item: any) => item.pet && item.email && item.valor)
                    .map((item: any) => ({
                        id: item.id,
                        email: item.email,
                        valor: item.valor,
                        pet: item.pet
                    }));
                
                setListaRelatorio(relatoriosFiltrados);
            } catch (error: any) {
                console.error('Erro ao carregar relatórios:', error);
                
                // Verificar se é erro de rede (API não disponível)
                if (error.code === 'NETWORK_ERROR' || error.message === 'Network Error' || !error.response) {
                    setErro('❌ Sem conexão com o banco de dados. Verifique se o servidor está rodando na porta 3002.');
                } else {
                    setErro('Erro ao carregar os dados do relatório. Tente novamente.');
                }
            } finally {
                setCarregando(false);
            }
        };

        carregarRelatorios();
    }, [])

    return {
        listaRelatorio,
        carregando,
        erro
    }
}
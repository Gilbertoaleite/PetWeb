import { useState, useEffect } from "react";
import { Adocao } from "../../../@types/Adocao";
import { ApiService } from "../../../services/ApiService";

export function useAdocoes() {
    const [listaAdocoes, setListaAdocoes] = useState<Adocao[]>([]);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState<string>('');
    const [filtro, setFiltro] = useState<'todas' | 'pendente' | 'aprovado' | 'rejeitado' | 'concluido'>('todas');
    const [busca, setBusca] = useState('');

    useEffect(() => {
        carregarAdocoes();
    }, []);

    const carregarAdocoes = async () => {
        try {
            setCarregando(true);
            setErro('');
            const resposta = await ApiService.get('/adocoes');
            
            // Filtrar apenas registros com estrutura completa
            const adocoes: Adocao[] = resposta.data
                .filter((item: any) => item.pet && item.nomeAdotante && item.dataAdocao && item.status)
                .map((item: any) => ({
                    id: item.id,
                    email: item.email,
                    valor: item.valor,
                    pet: item.pet,
                    dataAdocao: item.dataAdocao,
                    nomeAdotante: item.nomeAdotante,
                    status: item.status,
                    observacoes: item.observacoes || `Adoção com status: ${item.status}`
                }));

            setListaAdocoes(adocoes);
        } catch (error: any) {
            console.error('Erro ao carregar adoções:', error);
            
            // Verificar se é erro de rede (API não disponível)
            if (error.code === 'NETWORK_ERROR' || error.message === 'Network Error' || !error.response) {
                setErro('❌ Sem conexão com o banco de dados. Verifique se o servidor está rodando na porta 3002.');
            } else {
                setErro('Erro ao carregar a lista de adoções. Tente novamente.');
            }
        } finally {
            setCarregando(false);
        }
    };

    const adocoesFiltradas = listaAdocoes.filter(adocao => {
        const passaFiltroStatus = filtro === 'todas' || adocao.status === filtro;
        const passaFiltroBusca = busca === '' || 
            adocao.pet?.nome?.toLowerCase().includes(busca.toLowerCase()) ||
            adocao.nomeAdotante?.toLowerCase().includes(busca.toLowerCase()) ||
            adocao.email?.toLowerCase().includes(busca.toLowerCase());
        
        return passaFiltroStatus && passaFiltroBusca;
    });

    const estatisticas = {
        total: listaAdocoes.length,
        pendentes: listaAdocoes.filter(a => a.status === 'pendente').length,
        aprovadas: listaAdocoes.filter(a => a.status === 'aprovado').length,
        finalizadas: listaAdocoes.filter(a => a.status === 'concluido').length,
        rejeitadas: listaAdocoes.filter(a => a.status === 'rejeitado').length
    };

    const atualizarStatusAdocao = async (id: number, novoStatus: Adocao['status']) => {
        try {
            // Simular atualização local por enquanto
            setListaAdocoes(prev => 
                prev.map(adocao => 
                    adocao.id === id 
                        ? { ...adocao, status: novoStatus }
                        : adocao
                )
            );
            
            // Aqui seria feita a chamada para a API
            // await ApiService.put(`/adocoes/${id}`, { status: novoStatus });
        } catch (error) {
            console.error('Erro ao atualizar status:', error);
            setErro('Erro ao atualizar status da adoção');
        }
    };

    return {
        listaAdocoes: adocoesFiltradas,
        carregando,
        erro,
        filtro,
        setFiltro,
        busca,
        setBusca,
        estatisticas,
        atualizarStatusAdocao,
        recarregar: carregarAdocoes
    };
}
import { useState, useEffect } from 'react';
import { Pet } from '../../@types/Pet';
import { ApiService } from '../../services/ApiService';
import { AxiosError } from 'axios';


export function useIndex(){
    const [listaPets, setListaPets] = useState<Pet[]>([]),
        [petSelecionado, setPetSelecionado] = useState<Pet | null>(null),
        [email, setEmail] = useState(''),
        [valor, setValor] = useState(''),
        [mensagem, setMensagem] = useState(''),
        [carregando, setCarregando] = useState(true),
        [erro, setErro] = useState('');

    useEffect(() => {
        const carregarPets = async () => {
            try {
                setCarregando(true);
                setErro('');
                const resposta = await ApiService.get('/pets');
                setListaPets(resposta.data);
            } catch (error: any) {
                console.error('Erro ao carregar pets:', error);
                
                // Verificar se é erro de rede (API não disponível)
                if (error.code === 'NETWORK_ERROR' || error.message === 'Network Error' || !error.response) {
                    setErro('❌ Sem conexão com o banco de dados. Verifique se o servidor está rodando na porta 3002.');
                } else {
                    setErro('Erro ao carregar a lista de pets. Tente novamente.');
                }
            } finally {
                setCarregando(false);
            }
        };

        carregarPets();
    }, [])

    useEffect(() => {
        if(petSelecionado === null){
            limparFormulario();
        }
    }, [petSelecionado])

    function adotar(){
        if(petSelecionado !== null){
            if(validarDadosAdocao()){
                ApiService.post('/adocoes', {
                    pet_id: petSelecionado.id,
                    email,
                    valor
                })
                    .then(() => {
                        setPetSelecionado(null);
                        setMensagem('Pet adotado com sucesso!');
                        // limparFormulario();
                    })
                    .catch((error: AxiosError) => {
                        setMensagem(error.response?.data.message);
                    })
            } else {
                setMensagem('Preencha todos os campos corretamente!')
            }
        }
    }

    function validarDadosAdocao(){
        return email.length > 0 && valor.length > 0;
    }

    function limparFormulario(){
        setEmail('');
        setValor('');
    }

    return {
        listaPets,
        petSelecionado,
        setPetSelecionado,
        email,
        setEmail,
        valor,
        setValor,
        mensagem, 
        setMensagem,
        adotar,
        carregando,
        erro
    };
}
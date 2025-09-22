import { Button } from '@mui/material'
import { Pet } from '../../../data/@types/Pet'
import { TextService } from '../../../data/services/TextService';
import ImagemResponsiva from '../ImagemResponsiva';
import {
    ListaStyled,
    ItemLista,
    Informacoes,
    Nome,
    Descricao,
    BotaoContainer
} from './Lista.style'

interface ListaProps {
    pets: Pet[];
    onSelect: (pet: Pet) => void;
}

export default function Lista(props: ListaProps) {
    const tamanhoMaximoTexto = 200;

    const detectarTipoPet = (nome: string, historia: string): 'cao' | 'gato' | 'passaro' | 'outro' => {
        const texto = `${nome} ${historia}`.toLowerCase();

        if (texto.includes('cão') || texto.includes('cachorro') || texto.includes('dog') ||
            texto.includes('labrador') || texto.includes('golden') || texto.includes('pastor') ||
            texto.includes('bulldog') || texto.includes('beagle') || texto.includes('poodle')) {
            return 'cao';
        }

        if (texto.includes('gato') || texto.includes('gata') || texto.includes('cat') ||
            texto.includes('felino') || texto.includes('siamês') || texto.includes('persa') ||
            texto.includes('maine coon') || texto.includes('ragdoll')) {
            return 'gato';
        }

        if (texto.includes('pássaro') || texto.includes('ave') || texto.includes('bird') ||
            texto.includes('papagaio') || texto.includes('calopsita') || texto.includes('canário') ||
            texto.includes('periquito') || texto.includes('bem-te-vi')) {
            return 'passaro';
        }

        return 'outro';
    };

    return (
        <ListaStyled>
            { props.pets.map(pet => (
                <ItemLista key={ pet.id } >
                    <ImagemResponsiva
                        src={ pet.foto }
                        alt={ pet.nome }
                        tipoPet={ detectarTipoPet(pet.nome, pet.historia) }
                    />
                    <Informacoes>
                        <Nome>{ pet.nome }</Nome>
                        <Descricao>
                            { TextService.limitarTexto(pet.historia, tamanhoMaximoTexto) }
                        </Descricao>
                        <BotaoContainer>
                            <Button
                                variant={ 'contained' }
                                fullWidth
                                size="large"
                                onClick={ () => props.onSelect(pet) }
                            >
                                Adotar { pet.nome }
                            </Button>
                        </BotaoContainer>
                    </Informacoes>
                </ItemLista>
            )) }
        </ListaStyled>
    )
}
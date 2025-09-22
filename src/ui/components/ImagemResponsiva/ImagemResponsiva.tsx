import React, { useState, useCallback } from 'react';
import { styled } from '@mui/material/styles';
import { Box, Skeleton, SxProps, Theme } from '@mui/material';

interface ImagemResponsivaProps {
    src: string;
    alt: string;
    className?: string;
    objectPosition?: string;
    tipoPet?: 'cao' | 'gato' | 'passaro' | 'outro';
    onLoad?: () => void;
    onError?: () => void;
    sx?: SxProps<Theme>;
}

const ContainerImagem = styled(Box) <{ customSx?: SxProps<Theme> }>`
    position: relative;
    width: 100%;
    height: 300px;
    overflow: hidden;
    border-radius: ${({ theme }) => theme.spacing(2)};
    background-color: ${({ theme }) => theme.palette.grey[100]};
    display: flex;
    align-items: center;
    justify-content: center;

    /* Extra Large Desktop (≥1400px) */
    ${({ theme }) => theme.breakpoints.up('xl')} {
        height: 320px;
    }

    /* Large Desktop (1200px - 1399px) */
    ${({ theme }) => theme.breakpoints.between('lg', 'xl')} {
        height: 300px;
    }

    /* Medium Desktop/Laptop (992px - 1199px) */
    ${({ theme }) => theme.breakpoints.between('md', 'lg')} {
        height: 260px;
    }

    /* Tablet Portrait (768px - 991px) */
    ${({ theme }) => theme.breakpoints.between('sm', 'md')} {
        height: 220px;
    }

    /* Mobile Large (576px - 767px) */
    ${({ theme }) => theme.breakpoints.between('xs', 'sm')} {
        height: 180px;
        border-radius: ${({ theme }) => theme.spacing(1.5)};
    }

    /* Mobile Small (<576px) */
    ${({ theme }) => theme.breakpoints.down('xs')} {
        height: 160px;
        border-radius: ${({ theme }) => theme.spacing(1)};
    }

    /* Very Small Mobile (<400px) */
    @media (max-width: 400px) {
        height: 140px;
    }
`;

const Imagem = styled('img') <{ loaded: boolean; objectPosition: string }>`
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: ${({ objectPosition }) => objectPosition};
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    opacity: ${({ loaded }) => loaded ? 1 : 0};
    transform: scale(${({ loaded }) => loaded ? 1 : 1.1});
    
    &:hover {
        transform: scale(1.02);
    }

    /* High DPI displays */
    @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
        image-rendering: -webkit-optimize-contrast;
        image-rendering: crisp-edges;
    }
`;

const SkeletonCustomizado = styled(Skeleton)`
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    border-radius: inherit;
`;

const obterPosicionamentoPorTipo = (tipoPet?: string, objectPosition?: string): string => {
    if (objectPosition) return objectPosition;

    switch (tipoPet?.toLowerCase()) {
        case 'cao':
        case 'cachorro':
        case 'dog':
            return 'center 30%'; // Cães geralmente têm cabeças maiores, posição um pouco mais baixa
        case 'gato':
        case 'cat':
            return 'center 20%'; // Gatos têm cabeças menores, posição mais alta
        case 'passaro':
        case 'ave':
        case 'bird':
            return 'center 15%'; // Pássaros precisam mostrar a cabeça e bico
        default:
            return 'center 25%'; // Posição padrão para pets em geral
    }
};

const ImagemResponsiva: React.FC<ImagemResponsivaProps> = ({
    src,
    alt,
    className,
    objectPosition,
    tipoPet,
    onLoad,
    onError,
    sx
}) => {
    const [carregada, setCarregada] = useState(false);
    const [erro, setErro] = useState(false);

    const posicaoFinal = obterPosicionamentoPorTipo(tipoPet, objectPosition);

    // Verificar se a URL da imagem é válida
    const srcValida = src && src.trim() !== '' && src !== 'undefined' && src !== 'null';

    const handleLoad = useCallback(() => {
        setCarregada(true);
        onLoad?.();
    }, [onLoad]);

    const handleError = useCallback(() => {
        setErro(true);
        setCarregada(true);
        onError?.();
    }, [onError]);

    // Se não há src válida, marcar como erro imediatamente
    const usarPlaceholder = !srcValida || erro;

    return (
        <ContainerImagem
            className={ className }
            sx={ sx }
            customSx={ sx }
        >
            { !carregada && !usarPlaceholder && (
                <SkeletonCustomizado
                    variant="rectangular"
                    animation="wave"
                />
            ) }

            <Imagem
                src={ usarPlaceholder ? '/imagens/pet-placeholder.svg' : src }
                alt={ alt }
                loaded={ usarPlaceholder || carregada }
                objectPosition={ posicaoFinal }
                onLoad={ handleLoad }
                onError={ handleError }
                loading="lazy"
            />
        </ContainerImagem>
    );
};

export default ImagemResponsiva;
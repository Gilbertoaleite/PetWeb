import { styled } from '@mui/material';

export const ListaStyled = styled('ul')`
    width: 100%;
    max-width: 1000px;
    margin: 0 auto;
    padding: ${({ theme }) => theme.spacing(3)};
    list-style: none;

    ${({ theme }) => theme.breakpoints.down('md')} {
        padding: ${({ theme }) => theme.spacing(2)};
        max-width: 700px;
    }

    ${({ theme }) => theme.breakpoints.down('sm')} {
        padding: ${({ theme }) => theme.spacing(1.5)};
    }
`

export const ItemLista = styled('li')`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: ${({ theme }) => theme.spacing(4)};
    margin-bottom: ${({ theme }) => theme.spacing(6)};
    padding: ${({ theme }) => theme.spacing(3)};
    background-color: ${({ theme }) => theme.palette.background.paper};
    border-radius: ${({ theme }) => theme.spacing(2)};
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    min-height: 320px;
    align-items: start;
    border: 1px solid ${({ theme }) => theme.palette.divider};

    &:hover {
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
        transform: translateY(-2px);
        border-color: ${({ theme }) => theme.palette.primary.light};
    }

    &:last-child {
        margin-bottom: 0;
    }

    /* Large Tablet and Desktop */
    ${({ theme }) => theme.breakpoints.between('md', 'lg')} {
        gap: ${({ theme }) => theme.spacing(3)};
        padding: ${({ theme }) => theme.spacing(2.5)};
        min-height: 280px;
    }

    /* Mobile and Small Tablet - Stack vertically */
    ${({ theme }) => theme.breakpoints.down('md')} {
        grid-template-columns: 1fr;
        gap: ${({ theme }) => theme.spacing(2.5)};
        margin-bottom: ${({ theme }) => theme.spacing(4)};
        padding: ${({ theme }) => theme.spacing(2)};
        min-height: auto;
        border-radius: ${({ theme }) => theme.spacing(1.5)};
    }

    /* Small Mobile */
    ${({ theme }) => theme.breakpoints.down('sm')} {
        gap: ${({ theme }) => theme.spacing(2)};
        margin-bottom: ${({ theme }) => theme.spacing(3)};
        padding: ${({ theme }) => theme.spacing(1.5)};
        border-radius: ${({ theme }) => theme.spacing(1)};
    }
`

export const Informacoes = styled('div')`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: ${({ theme }) => theme.spacing(2)};
    height: 100%;
    padding: ${({ theme }) => theme.spacing(1)};
`

export const Nome = styled('h2')`
    margin: 0;
    font-size: 1.75rem;
    font-weight: 600;
    color: ${({ theme }) => theme.palette.primary.main};
    line-height: 1.2;
    margin-bottom: ${({ theme }) => theme.spacing(1)};

    /* Large Desktop */
    ${({ theme }) => theme.breakpoints.up('lg')} {
        font-size: 1.875rem;
    }

    /* Medium Desktop/Laptop */
    ${({ theme }) => theme.breakpoints.between('md', 'lg')} {
        font-size: 1.625rem;
    }

    /* Tablet */
    ${({ theme }) => theme.breakpoints.between('sm', 'md')} {
        font-size: 1.5rem;
    }

    /* Mobile */
    ${({ theme }) => theme.breakpoints.down('sm')} {
        font-size: 1.375rem;
        margin-bottom: ${({ theme }) => theme.spacing(0.75)};
    }

    /* Small Mobile */
    @media (max-width: 400px) {
        font-size: 1.25rem;
    }
`;

export const Descricao = styled('p')`
    margin: 0;
    word-break: break-word;
    line-height: 1.6;
    color: ${({ theme }) => theme.palette.text.secondary};
    flex-grow: 1;
    font-size: 1rem;
    margin-bottom: ${({ theme }) => theme.spacing(2)};

    /* Large Desktop */
    ${({ theme }) => theme.breakpoints.up('lg')} {
        font-size: 1.0625rem;
        line-height: 1.65;
    }

    /* Medium Desktop/Laptop */
    ${({ theme }) => theme.breakpoints.between('md', 'lg')} {
        font-size: 1rem;
    }

    /* Tablet */
    ${({ theme }) => theme.breakpoints.between('sm', 'md')} {
        font-size: 0.9375rem;
        line-height: 1.55;
    }

    /* Mobile */
    ${({ theme }) => theme.breakpoints.down('sm')} {
        font-size: 0.875rem;
        line-height: 1.5;
        margin-bottom: ${({ theme }) => theme.spacing(1.5)};
    }
`;

export const BotaoContainer = styled('div')`
    margin-top: auto;
    padding-top: ${({ theme }) => theme.spacing(1)};
    
    /* Mobile - Better button spacing */
    ${({ theme }) => theme.breakpoints.down('md')} {
        padding-top: ${({ theme }) => theme.spacing(1.5)};
    }

    button {
        /* Responsive button text */
        ${({ theme }) => theme.breakpoints.down('sm')} {
            font-size: 0.875rem;
            padding: ${({ theme }) => theme.spacing(1.5, 2)};
        }

        @media (max-width: 400px) {
            font-size: 0.8125rem;
            padding: ${({ theme }) => theme.spacing(1.25, 1.5)};
        }
    }
`;
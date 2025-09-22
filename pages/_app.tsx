import '../src/ui/styles/globals.css'
import type { AppProps } from 'next/app'
import { ThemeProvider } from '@mui/material';
import tema from '../src/ui/themes/tema';
import Cabecalho from '../src/ui/components/Cabecalho/Cabecalho'
import CabecalhoAdmin from '../src/ui/components/CabecalhoAdmin/CabecalhoAdmin'
import { useRouter } from 'next/router';

function MyApp({ Component, pageProps }: AppProps) {
    const router = useRouter();

    return (
        <ThemeProvider theme={ tema } >
            { router.pathname === '/' ? <Cabecalho /> : <CabecalhoAdmin /> }
            <Component { ...pageProps } />
        </ThemeProvider>
    );
}

export default MyApp
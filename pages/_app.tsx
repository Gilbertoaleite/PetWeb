import '../src/ui/styles/globals.css'
import type { AppProps } from 'next/app'
import { ThemeProvider } from '@mui/material';
import tema from '../src/ui/themes/tema';
import Navbar from '../src/ui/components/Navbar/Navbar'

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <ThemeProvider theme={ tema } >
            <Navbar />
            <Component { ...pageProps } />
        </ThemeProvider>
    );
}

export default MyApp
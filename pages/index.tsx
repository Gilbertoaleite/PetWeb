import type { NextPage } from 'next'
import Titulo from '../src/ui/components/Titulo/Titulo';
import Lista from '../src/ui/components/Lista/Lista'
import { Dialog, TextField, Grid, DialogActions, Button, Snackbar, CircularProgress, Box, Alert } from '@mui/material'
import { useIndex } from '../src/data/hooks/pages/useIndex';

const Home: NextPage = () => {
    const {
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
    } = useIndex();

    if (carregando) {
        return (
            <div>
                <Titulo
                    titulo=""
                    subtitulo={
                        <span>
                            Com um pequeno valor mensal, você <br />
                            pode <strong>adotar um pet virtualmente</strong>
                        </span>
                    }
                />
                <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
                    <CircularProgress />
                </Box>
            </div>
        );
    }

    return (
        <div>
            <Titulo
                titulo=""
                subtitulo={
                    <span>
                        Com um pequeno valor mensal, você <br />
                        pode <strong>adotar um pet virtualmente</strong>
                    </span>
                }
            />

            { erro && (
                <Box display="flex" justifyContent="center" mb={ 2 }>
                    <Alert severity="error" sx={ { maxWidth: 600 } }>
                        { erro }
                    </Alert>
                </Box>
            ) }

            <Lista
                pets={ listaPets }
                onSelect={ (pet) => setPetSelecionado(pet) }
            />

            <Dialog
                open={ petSelecionado !== null }
                fullWidth
                PaperProps={ { sx: { p: 5 } } }
                onClose={ () => setPetSelecionado(null) }
            >
                <Grid container spacing={ 2 }>
                    <Grid item xs={ 12 }>
                        <TextField
                            label="E-mail"
                            type="email"
                            fullWidth
                            value={ email }
                            onChange={ (e) => setEmail(e.target.value) }
                        />
                    </Grid>
                    <Grid item xs={ 12 }>
                        <TextField
                            label="Quantia por mês"
                            type="number"
                            fullWidth
                            value={ valor }
                            onChange={ (e) => setValor(e.target.value) }
                        />
                    </Grid>
                </Grid>
                <DialogActions sx={ { px: 0 } }>
                    <Button
                        color={ 'secondary' }
                        onClick={ (e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setPetSelecionado(null);
                        } }
                        disabled={ carregando }
                        type="button"
                    >
                        Cancelar
                    </Button>
                    <Button
                        variant={ 'contained' }
                        onClick={ (e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            adotar();
                        } }
                        disabled={ carregando || !email || !valor }
                        startIcon={ carregando ? <CircularProgress size={ 16 } /> : null }
                        type="button"
                    >
                        { carregando ? 'Processando...' : 'Adotar' }
                    </Button>
                </DialogActions>
            </Dialog>

            <Snackbar
                open={ mensagem.length > 0 }
                message={ mensagem }
                autoHideDuration={ 4000 }
                onClose={ () => setMensagem('') }
            />
        </div>
    )
}

export default Home
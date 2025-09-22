import { NextPage } from "next";
import Titulo from '../../src/ui/components/Titulo/Titulo';
import {
    Paper,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    CircularProgress,
    Box,
    Alert
} from '@mui/material';
import { useRelatorio } from "../../src/data/hooks/pages/pets/useRelatorio";


const Relatorio: NextPage = () => {
    const { listaRelatorio, carregando, erro } = useRelatorio();

    if (carregando) {
        return (
            <>
                <Titulo
                    titulo="Relatório de Adoção"
                    subtitulo="Veja a lista de pets adotados"
                />
                <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
                    <CircularProgress />
                </Box>
            </>
        );
    }

    return (
        <>
            <Titulo
                titulo="Relatório de Adoção"
                subtitulo="Veja a lista de pets adotados"
            />

            { erro && (
                <Alert severity="error" sx={ { mb: 3, maxWidth: 830, mx: 'auto' } }>
                    { erro }
                </Alert>
            ) }
            <TableContainer
                component={ Paper }
                sx={ { maxWidth: 830, mx: 'auto', p: { xs: 3, md: 5 } } }
            >
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Pet</TableCell>
                            <TableCell>E-mail</TableCell>
                            <TableCell align={ 'right' } >Valor Mensal</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        { listaRelatorio.map((relatorio) => (
                            <TableRow key={ relatorio.id } >
                                <TableCell>{ relatorio.pet?.nome || 'Pet sem nome' }</TableCell>
                                <TableCell>{ relatorio.email }</TableCell>
                                <TableCell align={ 'right' } >{ relatorio.valor }</TableCell>
                            </TableRow>
                        )) }
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}

export default Relatorio;
import { NextPage } from "next";
import { useState } from "react";
import {
    Box,
    Paper,
    Typography,
    Grid,
    Card,
    CardContent,
    Chip,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Button,
    CircularProgress,
    Alert,
    Avatar,
    Divider,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions
} from '@mui/material';
import Titulo from '../../ui/components/Titulo/Titulo';
import { useAdocoes } from "../../data/hooks/pages/pets/useAdocoes";
import { Adocao } from "../../data/@types/Adocao";
import ImagemResponsiva from "../../ui/components/ImagemResponsiva/ImagemResponsiva";

const Adocoes: NextPage = () => {
    const {
        listaAdocoes,
        carregando,
        erro,
        filtro,
        setFiltro,
        busca,
        setBusca,
        estatisticas,
        atualizarStatusAdocao
    } = useAdocoes();

    const [adocaoSelecionada, setAdocaoSelecionada] = useState<Adocao | null>(null);
    const [dialogAberto, setDialogAberto] = useState(false);

    const getStatusColor = (status: Adocao['status']) => {
        switch (status) {
            case 'pendente': return 'warning';
            case 'aprovado': return 'info';
            case 'concluido': return 'success';
            case 'rejeitado': return 'error';
            default: return 'default';
        }
    };

    const getStatusText = (status: Adocao['status']) => {
        switch (status) {
            case 'pendente': return 'Pendente';
            case 'aprovado': return 'Aprovado';
            case 'concluido': return 'Concluído';
            case 'rejeitado': return 'Rejeitado';
            default: return status;
        }
    };

    const formatarData = (data: string) => {
        return new Date(data).toLocaleDateString('pt-BR');
    };

    const abrirDetalhes = (adocao: Adocao) => {
        setAdocaoSelecionada(adocao);
        setDialogAberto(true);
    };

    const fecharDetalhes = () => {
        setDialogAberto(false);
        setAdocaoSelecionada(null);
    };

    if (carregando) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
                <CircularProgress />
            </Box>
        );
    }

    return (
        <>
            <Titulo
                titulo="Gerenciar Adoções"
                subtitulo="Acompanhe e gerencie todas as adoções realizadas"
            />

            { erro && (
                <Alert severity="error" sx={ { mb: 3, maxWidth: 1200, mx: 'auto' } }>
                    { erro }
                </Alert>
            ) }

            {/* Estatísticas */ }
            <Paper sx={ { p: 3, mb: 4, maxWidth: 1200, mx: 'auto' } }>
                <Typography variant="h6" gutterBottom>
                    Estatísticas Gerais
                </Typography>
                <Grid container spacing={ 2 }>
                    <Grid item xs={ 6 } sm={ 3 }>
                        <Card>
                            <CardContent sx={ { textAlign: 'center' } }>
                                <Typography variant="h4" color="primary">
                                    { estatisticas.total }
                                </Typography>
                                <Typography variant="body2">
                                    Total de Adoções
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={ 6 } sm={ 3 }>
                        <Card>
                            <CardContent sx={ { textAlign: 'center' } }>
                                <Typography variant="h4" color="warning.main">
                                    { estatisticas.pendentes }
                                </Typography>
                                <Typography variant="body2">
                                    Pendentes
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={ 6 } sm={ 3 }>
                        <Card>
                            <CardContent sx={ { textAlign: 'center' } }>
                                <Typography variant="h4" color="info.main">
                                    { estatisticas.aprovadas }
                                </Typography>
                                <Typography variant="body2">
                                    Aprovadas
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={ 6 } sm={ 3 }>
                        <Card>
                            <CardContent sx={ { textAlign: 'center' } }>
                                <Typography variant="h4" color="success.main">
                                    { estatisticas.finalizadas }
                                </Typography>
                                <Typography variant="body2">
                                    Finalizadas
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Paper>

            {/* Filtros e Busca */ }
            <Paper sx={ { p: 3, mb: 4, maxWidth: 1200, mx: 'auto' } }>
                <Grid container spacing={ 3 } alignItems="center">
                    <Grid item xs={ 12 } md={ 6 }>
                        <TextField
                            fullWidth
                            placeholder="Buscar por pet, adotante ou email..."
                            value={ busca }
                            onChange={ (e) => setBusca(e.target.value) }
                            InputProps={ {
                                startAdornment: (
                                    <Box component="span" sx={ { mr: 1, color: 'text.secondary', fontSize: '1.2rem' } }>
                                        🔍
                                    </Box>
                                )
                            } }
                        />
                    </Grid>
                    <Grid item xs={ 12 } md={ 3 }>
                        <FormControl fullWidth>
                            <InputLabel>Filtrar por Status</InputLabel>
                            <Select
                                value={ filtro }
                                label="Filtrar por Status"
                                onChange={ (e) => setFiltro(e.target.value as any) }
                            >
                                <MenuItem value="todas">Todas</MenuItem>
                                <MenuItem value="pendente">Pendente</MenuItem>
                                <MenuItem value="aprovado">Aprovado</MenuItem>
                                <MenuItem value="concluido">Concluído</MenuItem>
                                <MenuItem value="rejeitado">Rejeitado</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={ 12 } md={ 3 }>
                        <Typography variant="body2" color="text.secondary">
                            { listaAdocoes.length } adoções encontradas
                        </Typography>
                    </Grid>
                </Grid>
            </Paper>

            {/* Lista de Adoções */ }
            <Box maxWidth={ 1200 } mx="auto">
                <Grid container spacing={ 3 }>
                    { listaAdocoes.map((adocao) => (
                        <Grid item xs={ 12 } md={ 6 } lg={ 4 } key={ adocao.id }>
                            <Card sx={ {
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                overflow: 'hidden',
                                position: 'relative'
                            } }>
                                <Box sx={ {
                                    position: 'relative',
                                    height: 200,
                                    flexShrink: 0,
                                    overflow: 'hidden'
                                } }>
                                    <ImagemResponsiva
                                        src={ adocao.pet?.foto || '' }
                                        alt={ adocao.pet?.nome || 'Pet sem nome' }
                                        tipoPet={ adocao.pet?.nome?.toLowerCase().includes('cao') ? 'cao' :
                                            adocao.pet?.nome?.toLowerCase().includes('gat') ? 'gato' : 'outro' }
                                    />
                                    <Chip
                                        label={ getStatusText(adocao.status) }
                                        color={ getStatusColor(adocao.status) }
                                        size="small"
                                        sx={ {
                                            position: 'absolute',
                                            top: 8,
                                            right: 8,
                                            fontWeight: 'bold',
                                            zIndex: 2
                                        } }
                                    />
                                </Box>

                                <CardContent sx={ {
                                    flexGrow: 1,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    p: 2,
                                    '&:last-child': {
                                        paddingBottom: 2
                                    }
                                } }>
                                    <Typography variant="h6" gutterBottom>
                                        { adocao.pet?.nome || 'Pet sem nome' }
                                    </Typography>

                                    <Box display="flex" alignItems="center" mb={ 1 }>
                                        <Avatar sx={ { width: 24, height: 24, mr: 1, fontSize: '0.8rem' } }>
                                            { adocao.nomeAdotante.charAt(0).toUpperCase() }
                                        </Avatar>
                                        <Typography variant="body2">
                                            { adocao.nomeAdotante }
                                        </Typography>
                                    </Box>

                                    <Box display="flex" alignItems="center" mb={ 1 }>
                                        <Box component="span" sx={ { fontSize: 16, mr: 1, color: 'text.secondary' } }>
                                            📧
                                        </Box>
                                        <Typography variant="body2" color="text.secondary">
                                            { adocao.email }
                                        </Typography>
                                    </Box>

                                    <Box display="flex" alignItems="center" mb={ 1 }>
                                        <Box component="span" sx={ { fontSize: 16, mr: 1, color: 'text.secondary' } }>
                                            📅
                                        </Box>
                                        <Typography variant="body2" color="text.secondary">
                                            { formatarData(adocao.dataAdocao) }
                                        </Typography>
                                    </Box>

                                    <Box display="flex" alignItems="center" mb={ 2 }>
                                        <Box component="span" sx={ { fontSize: 16, mr: 1, color: 'text.secondary' } }>
                                            💰
                                        </Box>
                                        <Typography variant="body2" color="text.secondary">
                                            R$ { adocao.valor }
                                        </Typography>
                                    </Box>

                                    <Button
                                        variant="outlined"
                                        fullWidth
                                        onClick={ () => abrirDetalhes(adocao) }
                                        size="small"
                                        startIcon={
                                            <Box component="span" sx={ { fontSize: '1rem' } }>👁️</Box>
                                        }
                                    >
                                        Ver Detalhes
                                    </Button>
                                </CardContent>
                            </Card>
                        </Grid>
                    )) }
                </Grid>

                { listaAdocoes.length === 0 && (
                    <Paper sx={ { p: 4, textAlign: 'center' } }>
                        <Typography variant="h6" color="text.secondary">
                            Nenhuma adoção encontrada
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Ajuste os filtros ou cadastre novas adoções
                        </Typography>
                    </Paper>
                ) }
            </Box>

            {/* Dialog de Detalhes */ }
            <Dialog
                open={ dialogAberto }
                onClose={ fecharDetalhes }
                maxWidth="md"
                fullWidth
            >
                { adocaoSelecionada && (
                    <>
                        <DialogTitle>
                            Detalhes da Adoção - { adocaoSelecionada.pet?.nome || 'Pet sem nome' }
                        </DialogTitle>
                        <DialogContent>
                            <Grid container spacing={ 3 }>
                                <Grid item xs={ 12 } md={ 6 }>
                                    <Box sx={ { height: 300, mb: 2 } }>
                                        <ImagemResponsiva
                                            src={ adocaoSelecionada.pet?.foto || '' }
                                            alt={ adocaoSelecionada.pet?.nome || 'Pet sem nome' }
                                        />
                                    </Box>
                                </Grid>
                                <Grid item xs={ 12 } md={ 6 }>
                                    <Typography variant="h6" gutterBottom>
                                        🐾 Informações do Pet
                                    </Typography>
                                    <Typography><strong>Nome:</strong> { adocaoSelecionada.pet?.nome || 'Pet sem nome' }</Typography>
                                    <Typography gutterBottom><strong>História:</strong> { adocaoSelecionada.pet?.historia || 'Sem informações' }</Typography>

                                    <Divider sx={ { my: 2 } } />

                                    <Typography variant="h6" gutterBottom>
                                        👤 Informações do Adotante
                                    </Typography>
                                    <Typography><strong>Nome:</strong> { adocaoSelecionada.nomeAdotante }</Typography>
                                    <Typography><strong>Email:</strong> { adocaoSelecionada.email }</Typography>
                                    <Typography><strong>Data da Adoção:</strong> { formatarData(adocaoSelecionada.dataAdocao) }</Typography>
                                    <Typography><strong>Valor:</strong> R$ { adocaoSelecionada.valor }</Typography>

                                    <Box mt={ 2 }>
                                        <Chip
                                            label={ getStatusText(adocaoSelecionada.status) }
                                            color={ getStatusColor(adocaoSelecionada.status) }
                                            size="medium"
                                        />
                                    </Box>

                                    { adocaoSelecionada.observacoes && (
                                        <>
                                            <Divider sx={ { my: 2 } } />
                                            <Typography variant="h6" gutterBottom>
                                                📝 Observações
                                            </Typography>
                                            <Typography>{ adocaoSelecionada.observacoes }</Typography>
                                        </>
                                    ) }
                                </Grid>
                            </Grid>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={ fecharDetalhes }>
                                Fechar
                            </Button>
                        </DialogActions>
                    </>
                ) }
            </Dialog>
        </>
    );
};

export default Adocoes;
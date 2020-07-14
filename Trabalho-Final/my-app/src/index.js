import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import PropTypes from 'prop-types';
import index from './index.css';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { FaChevronDown } from "react-icons/fa";
import { FaChevronUp } from "react-icons/fa";
import { Navbar} from 'react-bootstrap';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import alert from 'sweetalert';

//https://private-a1f2ecd-renatomullerreinhold.apiary-mock.com/carros
const url = 'https://private-a1f2ecd-renatomullerreinhold.apiary-mock.com/carros';
let rows = [];
let action = {
    acao: 'insert',
    id: null,
}

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.text.primary,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const rounting = (
    <Navbar bg="dark" variant="dark" expand="lg">
        <Navbar.Brand href="#home">Aluguel de carros</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav"></Navbar.Collapse>
    </Navbar>
)

ReactDOM.render(rounting, document.getElementById('nav'));

export default function FormCarro(){
    const [name, setName] = React.useState();
    const [ano, setAno] = React.useState();
    const [marca, setMarca] = React.useState();
    const handleChangeNome = (event) => {
        setName(event.target.value);
    };
    const handleChangeAno = (event) => {
        setAno(event.target.value);
    };
    const handleChangeMarca = (event) => {
        setMarca(event.target.value);
    };

    return (
            <div className="form-row">
                <div className="form-group col-md-8">
                    <TextField type="text" className="form-control" label="Nome do carro" value={name} id="nm_carro" onChange={handleChangeNome}/>
                </div>
                <div className="form-group col-md-4">
                    <TextField type="text" label="Ano" className="form-control" value={ano} id="nr_ano" onChange={handleChangeAno}/>
                </div>
                <div className="form-group col-md-4">
                    <TextField type="text" label="Marca" className="form-control" value={marca} id="nm_marca" onChange={handleChangeMarca}/>
                </div>
                <div className="form-group col-md-4">
                    <FormControl fullWidth={1}>
                        <InputLabel id="demo-simple-select-label">Cor</InputLabel>
                        <Select labelId="demo-simple-select-label" id="cor">
                            <MenuItem value="Preto">Preto</MenuItem>
                            <MenuItem value="Branco">Branco</MenuItem>
                            <MenuItem value="Cinza">Cinza</MenuItem>
                            <MenuItem value="Vermelho">Vermelho</MenuItem>
                            <MenuItem value="Azul">Azul</MenuItem>
                        </Select>
                    </FormControl>
                </div>
                <div className="form-group col-md-4">
                    <TextField type="text" label="Preço" className="form-control" id="nr_preco"/>
                </div>
                <div className="form-group col-md-12" align="right">
                    <Button variant="outlined" id="submit" onClick={exec_action} color="primary">Cadastrar</Button>&nbsp;
                    <Button variant="outlined" color="default">Cancelar</Button>
                </div>
            </div>);
}

ReactDOM.render(<FormCarro />, document.getElementById('form'));

function exec_action() {
    if(action.acao === 'insert'){
        addCarro();
    }else if(action.acao === 'update'){
        editCarro(action.id);
    }else if(action.acao === 'delete'){
        deleteCarro(action.id);
    }
    action.id = null;
    action.acao = 'insert';
    limparForm();
}

function addCarro(){
    fetch(url + '/create', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "nome": document.getElementById("nm_carro").getAttribute("value"),
            "marca": document.getElementById("nm_marca").getAttribute("value"),
            "ano": document.getElementById("nr_ano").getAttribute("value"),
            "preco": document.getElementById("nr_preco").getAttribute("value"),
            "cor": document.getElementById("cor").getAttribute("value")
        })
    }).then((response) => response.json())
        .then((responseData) => {
            alert("Sucesso!", "Carro " + responseData.nome + " cadastrado com sucesso!", "success");
        }).catch(error => {
            console.log(error);
    })
}

function editCarro(id){
    fetch(url + '/update/'+id, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "nome": document.getElementById("nm_carro").getAttribute("value"),
            "marca": document.getElementById("nm_marca").getAttribute("value"),
            "ano": document.getElementById("nr_ano").getAttribute("value"),
            "preco": document.getElementById("nr_preco").getAttribute("value"),
            "cor": document.getElementById("cor").getAttribute("value")
        })
    }).then((response) => response.json())
        .then((responseData) => {
            alert("Sucesso!", "Carro " + responseData.nome + " editado com sucesso!", "success");
        }).catch(error => {
        console.log(error);
    })
}

function deleteCarro(id){
    fetch(url + '/delete/'+id, {
        method: 'DELETE',
    }).then((response) => response.json())
        .then((responseData) => {
            alert("Sucesso!", "Carro " + responseData + " deletado com sucesso!", responseData.mensagem);
        }).catch(error => {
            console.log(error);
    })
}

function edit(id){
    action.id = id;
    action.acao = 'update';
    document.getElementById("nm_carro").setAttribute("value", document.getElementById('nome'+id).textContent);
    document.getElementById("nm_carro-label").setAttribute("class", "MuiFormLabel-root MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated MuiInputLabel-shrink MuiFormLabel-filled");
    document.getElementById("nm_carro-label").setAttribute("data-shrink", "true");
    document.getElementById("nm_marca").setAttribute("value", document.getElementById('marca'+id).textContent);
    document.getElementById("nm_marca-label").setAttribute("class", "MuiFormLabel-root MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated MuiInputLabel-shrink MuiFormLabel-filled");
    document.getElementById("nm_marca-label").setAttribute("data-shrink", "true");
    document.getElementById("nr_ano").setAttribute("value", document.getElementById('ano'+id).textContent);
    document.getElementById("nr_ano-label").setAttribute("class", "MuiFormLabel-root MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated MuiInputLabel-shrink MuiFormLabel-filled");
    document.getElementById("nr_ano-label").setAttribute("data-shrink", "true");
    document.getElementById("nr_preco").setAttribute("value", document.getElementById('preco'+id).textContent);
    document.getElementById("nr_preco-label").setAttribute("class", "MuiFormLabel-root MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated MuiInputLabel-shrink MuiFormLabel-filled");
    document.getElementById("nr_preco-label").setAttribute("data-shrink", "true");
    document.getElementById("cor").innerText = document.getElementById('cor'+id).textContent;
    document.getElementById("demo-simple-select-label").setAttribute("class", "MuiFormLabel-root MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated MuiInputLabel-shrink MuiFormLabel-filled");
    document.getElementById("demo-simple-select-label").setAttribute("data-shrink", "true");
    document.getElementById("submit").innerText = 'Salvar';
}

function deletar(id){
    action.id = id;
    action.acao = "delete";
    alert({
        title: "Você tem certeza?",
        text: "Uma vez excluído, você não poderá recuperar esse registro!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {
               exec_action()
            } else {
                //do nothing
            }
        });
}

export const Lista = () => {

    function GetStatus(){
        fetch(url)
            .then(response => response.json())
            .then(responseJson => {
                if (responseJson.status) {
                    this.setState({
                        message: 'Pedido Aprovado!'
                    });
                }
                else {
                    rows = responseJson.map((responseJson) => (createData(responseJson.id, responseJson.nome, responseJson.marca, responseJson.ano, responseJson.preco, responseJson.cor, responseJson.pessoas)))
                    console.log(rows)
                    ReactDOM.render(CollapsibleTable(), document.getElementById("root"));
                }
            })
            .catch(error => {
                console.error(error);
            });
    }

    const useRowStyles = makeStyles({
        root: {
            '& > *': {
                borderBottom: 'unset',
            },
        },
    });

    function createData(id, nome, marca, ano, preco, cor, pessoas) {
        return {
            id,
            nome,
            marca,
            ano,
            preco,
            cor,
            pessoas
        };
    }

    function Row(props) {
        const { row } = props;
        const [open, setOpen] = React.useState(false);
        const classes = useRowStyles();

        return (
            <React.Fragment>
                <TableRow className={classes.root}>
                    <StyledTableCell width={10}>
                        <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                            {open ? <FaChevronUp /> : <FaChevronDown />}
                        </IconButton>
                    </StyledTableCell>
                    <StyledTableCell id={row.id} width={10} align="right">{row.id}</StyledTableCell>
                    <StyledTableCell id={"nome"+row.id} align="center">{row.nome}</StyledTableCell>
                    <StyledTableCell id={"marca"+row.id} align="center">{row.marca}</StyledTableCell>
                    <StyledTableCell id={"ano"+row.id} align="center">{row.ano}</StyledTableCell>
                    <StyledTableCell id={"preco"+row.id} align="center">{row.preco}</StyledTableCell>
                    <StyledTableCell id={"cor"+row.id} align="center">{row.cor}</StyledTableCell>
                    <TableCell align="center">
                        <Button variant="contained" onClick={() => edit(row.id)} color="primary">Editar</Button>&nbsp;
                        <Button variant="contained" onClick={() => deletar(row.id)} color="secondary">Deletar</Button>
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
                        <Collapse in={open} timeout="auto" unmountOnExit>
                            <Box margin={1}>
                                <Typography variant="h6" gutterBottom component="div">
                                    Pessoas
                                </Typography>
                                <Table size="small" aria-label="purchases">
                                    <TableHead>
                                        <TableRow>
                                            <StyledTableCell>Nome</StyledTableCell>
                                            <StyledTableCell>Email</StyledTableCell>
                                            <StyledTableCell>Data nascimento</StyledTableCell>
                                            <StyledTableCell>Estado</StyledTableCell>
                                            <StyledTableCell>Sexo</StyledTableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {row.pessoas != undefined ? row.pessoas.map((pessoa) => (
                                            <TableRow key={pessoa.id}>
                                                <TableCell component="th" scope="row">{pessoa.nome}</TableCell>
                                                <TableCell>{pessoa.email}</TableCell>
                                                <TableCell>{pessoa.data_nasc}</TableCell>
                                                <TableCell>{pessoa.estado}</TableCell>
                                                <TableCell>{pessoa.sexo}</TableCell>
                                            </TableRow>
                                        )) : ""}
                                    </TableBody>
                                </Table>
                            </Box>
                        </Collapse>
                    </TableCell>
                </TableRow>
            </React.Fragment>
        );
    }

    Row.propTypes = {
        row: PropTypes.shape({
            preco: PropTypes.string.isRequired,
            ano: PropTypes.string.isRequired,
            marca: PropTypes.string.isRequired,
            nome: PropTypes.string.isRequired,
            cor: PropTypes.string.isRequired,
        }).isRequired,
    };

    function CollapsibleTable() {
        return (
            <TableContainer component={Paper}>
                <Table aria-label="collapsible table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell />
                            <StyledTableCell align="center">Id</StyledTableCell>
                            <StyledTableCell align="center">Nome do carro</StyledTableCell>
                            <StyledTableCell align="center">Marca</StyledTableCell>
                            <StyledTableCell align="center">Ano</StyledTableCell>
                            <StyledTableCell align="center">Preco</StyledTableCell>
                            <StyledTableCell align="center">Cor</StyledTableCell>
                            <StyledTableCell align="center">Opções</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <Row key={row.id} row={row} />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        );
    }
    GetStatus()
}

Lista();

function limparForm(){
    document.getElementById("nm_carro").setAttribute("value", "");
    document.getElementById("nm_carro-label").setAttribute("class", "MuiFormLabel-root MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated");
    document.getElementById("nm_carro-label").setAttribute("data-shrink", "false");
    document.getElementById("nm_marca").setAttribute("value", "");
    document.getElementById("nm_marca-label").setAttribute("class", "MuiFormLabel-root MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated");
    document.getElementById("nm_marca-label").setAttribute("data-shrink", "false");
    document.getElementById("nr_ano").setAttribute("value", "");
    document.getElementById("nr_ano-label").setAttribute("class", "MuiFormLabel-root MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated");
    document.getElementById("nr_ano-label").setAttribute("data-shrink", "false");
    document.getElementById("nr_preco").setAttribute("value", "");
    document.getElementById("nr_preco-label").setAttribute("class", "MuiFormLabel-root MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated");
    document.getElementById("nr_preco-label").setAttribute("data-shrink", "false");
    document.getElementById("cor").innerText = "";
    document.getElementById("demo-simple-select-label").setAttribute("class", "MuiFormLabel-root MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated");
    document.getElementById("demo-simple-select-label").setAttribute("data-shrink", "false");
    document.getElementById("submit").innerText = 'Cadastrar';
}

serviceWorker.unregister();


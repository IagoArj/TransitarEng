import React from 'react';
import axios from 'axios';
import VehiclesBox from './VehiclesBox';
import '../componentsCss/home.css'


export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            vehicles: [],
            placa: "",

            car: false,
            bus: false,
            carStyle: {},
            busStyle: {},

            editName: "",
            editEmail: "",
            editBirthday:"",
            editPhone:"",
            password:"",
            
            edit: false
        }

        this.handleChangePlaca = this.handleChangePlaca.bind(this)
        this.receberVeiculos = this.receberVeiculos.bind(this)
        this.editOrProfile = this.editOrProfile.bind(this)
    }


    receberVeiculos() {
        console.log(localStorage);
        axios.get('https://zaf-dev.herokuapp.com/v1/getVehicles', {
            headers: {
                'Authorization': localStorage.token
            }
        }).then((res) => {
            this.setState({ vehicles: res.data.vehicles })
        })
    }

    registrar() {
        const options = {
            headers: { 'Authorization': localStorage.token }
        };
        let veiculo = 0

        if (this.state.car === true) {
            veiculo = 1
        }
        else {
            veiculo = 2
        }
        axios.post('https://zaf-dev.herokuapp.com/v1/registerVehicle',
            {
                licensePlate: this.state.placa,
                type: veiculo

            }, options)
            .then((res) => {
                console.log('cadastrou')
                this.setState({ placa: "" })
                this.receberVeiculos()

            }).catch((error) => {
                alert('Placa não suportada')

            })
    }

    handleChangePlaca(event) {
        this.setState({ placa: event.target.value })
    }

    handleChangeEditName(event) {
        this.setState({ editName: event.target.value })
    }

    handleChangeEditEmail(event) {
        this.setState({ editEmail: event.target.value })
    }
    handleChangeEditPassword(event) {
        this.setState({ password: event.target.value })
    }
    handleChangeEditTelefone(event) {
        this.setState({ editPhone: event.target.value })
    }
    handleChangeEditBirthday(event) {
        this.setState({ editBirthday: event.target.value })
    }

    componentDidMount() {
        this.receberVeiculos()
    }


    registrarCarro() {
        if (this.state.car === true) {
            this.setState({ car: false })
            this.setState({
                carStyle: {
                    backgroundColor: 'gray'
                }
            })

        }
        else {
            if (this.state.bus === true) {
                this.setState({ bus: false })
                this.setState({
                    busStyle: {
                        backgroundColor: 'gray'
                    }
                })

            }
            this.setState({ car: true })
            this.setState({
                carStyle: {
                    backgroundColor: '#dd3652'
                }
            })

        }
    }

    registrarOnibus() {
        if (this.state.bus === true) {
            this.setState({ bus: false })
            this.setState({
                busStyle: {
                    backgroundColor: 'gray'
                }
            })
        }
        else {
            if (this.state.car === true) {
                this.setState({ car: false })
                this.setState({
                    carStyle: {
                        backgroundColor: 'gray'
                    }
                })
            }
            this.setState({ bus: true })
            this.setState({
                busStyle: {
                    backgroundColor: '#dd3652'
                }
            })

        }
    }
    logout() {
        window.location = '/'
    }
    edit() {
        this.setState({ edit: !this.state.edit })
    }
    confirmarEdicao() {
        const options = {
            headers: { 'Authorization': localStorage.token }
        };
        axios.post('https://zaf-dev.herokuapp.com/v1/user/edit',
            {
                name: this.state.editName,
                email: this.state.editEmail,
                password: this.state.password,
                birthday: this.state.editBirthday,
                phone: this.state.editPhone,
            }, options)
            .then((res) => {
                console.log(res)
            }).catch((error) => {
                alert('Não Foi possível Editar!')
                console.log(this.state.editName)

            })
    }
    editOrProfile() {
        if (this.state.edit === false) {
            return <div className="userProfile">
                <h3 className="titleProfile">Perfil</h3>
                <div className="forms">
                    <p className="title">Nome:</p>
                    <p> {localStorage.name} </p>
                </div>
                <div className="forms">
                    <p className="title">Email:</p>
                    <p> {localStorage.email} </p>
                </div>
                <div className="forms">
                    <p className="title">Telephone:</p>
                    <p> {localStorage.phone} </p>
                </div>
                <div className="forms">
                    <p className="title">cpf/cnpj:</p>
                    <p> {localStorage.cpf_cnpj}</p>
                </div>
                <div className="btnForms">
                    <button className="logoutBtn" onClick={this.logout.bind(this)}>Sair</button>
                    <button className="logoutBtn" onClick={this.edit.bind(this)}>Editar</button>
                </div>
            </div>
        }
        else {
            return <div className="editProfile">
                <h3 className="perfilTitle">Editar Perfil</h3>
                <input type="text" className='inputLogin' value={this.state.editName}
                    onChange={this.handleChangeEditName.bind(this)}
                    placeholder='Nome Completo'
                />
                <input type="text" className='inputLogin' value={this.state.editEmail}
                    onChange={this.handleChangeEditEmail.bind(this)}
                    placeholder='Email'
                />
                <input type="password" className='inputLogin' value={this.state.password}
                    onChange={this.handleChangeEditPassword.bind(this)}
                    placeholder='Senha'
                />
                <input type="text" className='inputLogin' value={this.state.editPhone}
                    onChange={this.handleChangeEditTelefone.bind(this)}
                    placeholder='Telefone'
                />
                <input type="text" className='inputLogin' value={this.state.editBirthday}
                    onChange={this.handleChangeEditBirthday.bind(this)}
                    placeholder='Aniversário'
                />
                <div className="btnForms">
                    <button className="logoutBtn" onClick={this.edit.bind(this)}>Cancelar</button>
                    <button className="logoutBtn" onClick={this.confirmarEdicao.bind(this)}>Confirmar</button>
                </div>
            </div>
        }
    }

    render() {
        return (

            <div className="screen" >
                {this.editOrProfile()}
                <div>
                    <h3 className="vehicleText">Veículos: </h3>
                    <div className='vehicleBox'>

                        {this.state.vehicles.map((car) => {
                            return <VehiclesBox licensePlate={car.licensePlate} isParked={car.isParked} type={car.type}> </VehiclesBox>
                        })}
                        <div className="registerCar">
                            <p className="registerCarText">Cadastrar Veículo</p>
                            <input type="text" className="plateInput" value={this.state.placa}
                                onChange={this.handleChangePlaca}
                                placeholder='Placa do Veiculo'
                            />
                            <p className="registerCarText">Tipo do veículo</p>
                            <div className="carType">
                                <button className="carTypeBtn" style={this.state.carStyle} onClick={this.registrarCarro.bind(this)} > Carro</button>
                                <button className="carTypeBtn" style={this.state.busStyle} onClick={this.registrarOnibus.bind(this)}> Ônibus</button>
                            </div>
                            <button className="registerBtn" onClick={this.registrar.bind(this)}> Cadastar</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
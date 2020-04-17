import React from 'react';
import axios from 'axios';
import { useHistory } from "react-router-dom"
import '../componentsCss/login.css'



export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cpf_cnpj: "",
            password: "",

            RegisterName: "",
            RegisterEmail: "",
            RegisterPassword: "",
            RegisterPasswordAgain: "",
            RegisterCpf_cnpj: "",
            RegisterPhone: "",
            RegisterBirthday: ""



        }
        this.handleChangeCpf_cnpj = this.handleChangeCpf_cnpj.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);


        this.handleChangeRegisgerName = this.handleChangeRegisgerName.bind(this)
        this.handleChangeRegisgerEmail = this.handleChangeRegisgerEmail.bind(this)
        this.handleChangeRegisgerPassword = this.handleChangeRegisgerPassword.bind(this)
        this.handleChangeRegisgerPasswordAgain = this.handleChangeRegisgerPasswordAgain.bind(this)
        this.handleChangeRegisgerCpf_cnpj = this.handleChangeRegisgerCpf_cnpj.bind(this)
        this.handleChangeRegisgerPhone = this.handleChangeRegisgerPhone.bind(this)
        this.handleChangeRegisgerBirthday = this.handleChangeRegisgerBirthday.bind(this)

        this.logar = this.logar.bind(this);

        this.registrar = this.registrar.bind(this)
    }


    handleChangeCpf_cnpj(event) {
        this.setState({ cpf_cnpj: event.target.value })
    }
    handleChangePassword(event) {
        this.setState({ password: event.target.value })
    }


    handleChangeRegisgerName(event) {
        this.setState({ RegisterName: event.target.value })
    }
    handleChangeRegisgerEmail(event) {
        this.setState({ RegisterEmail: event.target.value })
    }
    handleChangeRegisgerPassword(event) {
        this.setState({ RegisterPassword: event.target.value })
    }
    handleChangeRegisgerPasswordAgain(event) {
        this.setState({ RegisterPasswordAgain: event.target.value })
    }
    handleChangeRegisgerCpf_cnpj(event) {
        this.setState({ RegisterCpf_cnpj: event.target.value })
    }
    handleChangeRegisgerPhone(event) {
        this.setState({ RegisterPhone: event.target.value })
    }
    handleChangeRegisgerBirthday(event) {
        this.setState({ RegisterBirthday: event.target.value })
    }

    logar() {

        console.log('entrou')
        axios.post('https://zaf-dev.herokuapp.com/v1/user/login', {
            cpf_cnpj: this.state.cpf_cnpj,
            password: this.state.password
        }).then(res => {
            localStorage.setItem('token', res.data.user.token);
            localStorage.setItem('name', res.data.user.name);
            localStorage.setItem('cpf_cnpj', res.data.user.cpf_cnpj);
            localStorage.setItem('email', res.data.user.email);
            localStorage.setItem('phone', res.data.user.phone);
            window.location = '/home';


        }).catch((error) => {
            alert('senha ou cpf/cnpj incorretos')
            console.log(error.message || error);

        });
    }
    registrar() {
        if (this.state.RegisterPassword === this.state.RegisterPasswordAgain) {
            axios.post('https://zaf-dev.herokuapp.com/v1/user/register', {
                name: this.state.RegisterName,
                password: this.state.RegisterPassword,
                email: this.state.RegisterEmail,
                cpf_cnpj: this.state.RegisterCpf_cnpj,
                phone: this.state.RegisterPhone,
                birthday: this.state.RegisterBirthday
            }).then(res => {
                this.logar()
            }).catch((error) => {
                console.log(error.message || error);

            });
        }
        else {
            alert("Senha não confere")
        }
    }
    componentDidMount() {
        localStorage.clear();
    }
    render() {
        return (

            <div className="fundo" >
                <div className="bgLogin">

                    <div className="allLoginBox">
                        <div className="loginBox">
                            <div className="iconTransitar"></div>
                            <input type="text" className='inputLogin' value={this.state.cpf_cnpj}
                                onChange={this.handleChangeCpf_cnpj}
                                placeholder=' CPF/CNPJ'
                            />
                            <input type="password" className='inputLogin' value={this.state.password}
                                onChange={this.handleChangePassword}
                                placeholder=' Senha'
                            />
                            <button className="loginEntrar" onClick={this.logar}>Entrar</button>
                        </div>


                        <div className="singinBox">
                            <h3 className="registrarSe">Cadastre-se</h3>
                            <div className="directionrow" >
                                <input type="text" className='inputLogin' value={this.state.RegisterName}
                                    onChange={this.handleChangeRegisgerName}
                                    placeholder='Nome Completo'
                                />
                                <input type="text" className='inputLogin' value={this.state.RegisterEmail}
                                    onChange={this.handleChangeRegisgerEmail}
                                    placeholder='Email'
                                />
                            </div>
                            <input type="password" className='inputLogin' value={this.state.RegisterPassword}
                                onChange={this.handleChangeRegisgerPassword}
                                placeholder='Senha'
                            />
                            <input type="password" className='inputLogin' value={this.state.RegisterPasswordAgain}
                                onChange={this.handleChangeRegisgerPasswordAgain}
                                placeholder='Digite a senha novamente'
                            />
                            <input type="text" className='inputLogin' value={this.state.RegisterCpf_cnpj}
                                onChange={this.handleChangeRegisgerCpf_cnpj}
                                placeholder='CPF/CNPJ'
                            />
                            <input type="text" className='inputLogin' value={this.state.RegisterPhone}
                                onChange={this.handleChangeRegisgerPhone}
                                placeholder='Telefone'
                            />
                            <div className="direction">
                                <input type="text" className='inputLogin' value={this.state.RegisterBirthday}
                                    onChange={this.handleChangeRegisgerBirthday}
                                    placeholder='Aniversário'
                                />
                                <button className="loginEntrar" onClick={this.registrar}>Entrar</button>
                            </div>
                        </div>
                    </div>

                </div >
            </div>
        )
    }
}
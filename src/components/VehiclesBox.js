import React from 'react';
import axios from 'axios';
import '../componentsCss/vehiclesBox.css'

export default class VehiclesBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            placa: this.props.licensePlate,
            isParked: this.props.isParked,
            type: this.props.type
        }
        this.delete = this.delete.bind(this);
    }
    parked(isParked) {
        if (isParked === true) {
            return "Estacionado"
        }
        else {
            return "Não Estacionado"
        }
    }
    tipoCarro(type) {
        if (type === 1) {
            return "Carro"
        }
        else {
            return "Ônibus/Caminhão"
        }
    }
    
    delete() {
        console.log(this.state.placa)
        const options = {
            headers: {'Authorization': localStorage.token}
          };
        axios.post('https://zaf-dev.herokuapp.com/v1/deleteVehicle', {licensePlate:this.state.placa},options)
        .then((res) => {
            console.log('deletou')
            window.location = '/home';

        })
    }
    componentDidMount() {
        
    }
    render() {

        return (

            <div className="mainBox">
                <h2 className="placa">{this.state.placa}</h2>
                <p className="veiculo">Veículo: {this.tipoCarro(this.state.type)}</p>
                <p className='estacionado'>{this.parked(this.state.isParked)}</p>
                <button className="btnDeletar" onClick={this.delete}> DELETAR</button>
            </div>
        );
    }
}
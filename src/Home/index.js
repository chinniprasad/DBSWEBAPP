import React, { Component } from "react";
import "./index.css";
import axios from 'axios'

let user = sessionStorage.getItem('userData')
let parsedData = JSON.parse(user)

class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userData: []
        }
    }
    async componentWillMount() {
        let role = parsedData.data.role
        if (role === 'ADMIN') {
            let config = {
                method: "get",
                url: `http://localhost:5000/v1/users`
            };
            let { data } = await axios(config)
            this.setState({ userData: data.data })
        }
    }
    //render user table header data
    renderTableHeader() {
        if (this.state.userData.length) {
            let header = Object.keys(this.state.userData[0])
            let myArray = header.filter(function (obj) {
                return obj !== 'id' && obj !== 'name';
            })
            return myArray.map((key, index) => {
                return <th key={index}>{key.toUpperCase()}</th>
            })
        }
    }
    //render user table body data
    renderTableData() {
        return this.state.userData.map((user, index) => {
            const { id, name, role, email } = user //destructuring
            return (
                <tr key={id}>
                    <td>{name}</td>
                    <td>{email}</td>
                    <td>{role}</td>
                </tr>
            )
        })
    }
    //clear the session
    handleLogout = () => {
        sessionStorage.clear();
    };
    render() {
        let data = parsedData.data
        return (
            <div>
                <div className="header">
                    <div className="fixed-wrapper">
                        <div className="logo">
                            <ul>
                                <li><a href='/home'>LOGO</a></li>
                            </ul>
                        </div>
                        <div className="topnav">
                            <ul>
                                <li><a href="/" onClick={this.handleLogout}> Logout </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                {
                    data.role === 'ADMIN' ? <div>
                        <h1 className='title'>User Details</h1>
                        <table className='user'>
                            <tbody>
                                <tr>{this.renderTableHeader()}</tr>
                                {this.renderTableData()}
                            </tbody>
                        </table>
                    </div>
                        : <div>
                            <h1> Profile</h1>
                            <h3>Name : {data.name}</h3>
                            <h3>Email : {data.email}</h3>
                            <h3>Role : {data.role}</h3>
                        </div>
                }
            </div>

        );
    }
}

export default Home;
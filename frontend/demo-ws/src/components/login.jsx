import React, { Component } from 'react'
import axios from 'axios'
import '../style/login/login.css'

export default class login extends Component {

    constructor(props) {
        super(props)

        this.state = {
            email: '',
            password: '',
        }

        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onSubmit(e) {
        e.preventDefault();
        const { email, password } = this.state;
        const body = {
            email,
            password,
        }

        axios.post(`${process.env.REACT_APP_HOST}/v1/api/auth`, body)
        .then((response) => {
            sessionStorage.setItem('token', response.data.token)
            this.props.history.push('/emp')
        })
        .catch((err) => console.log(err));

    }

    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }


    render() {
        return (
            <div>
                <main className="form-signin">
                    <form onSubmit={this.onSubmit}>
                        <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

                        <div className="form-floating">
                            <input onChange={(e) => this.onChange(e)} name="email" type="email" className="form-control" id="floatingInput" placeholder="name@example.com" />
                            <label for="floatingInput">Email address</label>
                        </div>
                        <div className="form-floating">
                            <input onChange={(e) => this.onChange(e)} name="password" type="password" className="form-control" id="floatingPassword" placeholder="Password" />
                            <label for="floatingPassword">Password</label>
                        </div>
                        <button className="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
                    </form>
                </main>


            </div>
        )
    }
}

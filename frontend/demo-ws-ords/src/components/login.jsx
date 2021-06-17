import React, { Component } from 'react'
import axios from 'axios'
import '../style/login/login.css'

export default class login extends Component {

    constructor(props) {
        super(props)

        this.state = {
            email: 'XbC-pDKxHua4Iw0Jpi7l0w..',
            password: 'azVNOlcV9_tuKji83dQ32Q..',
        }

        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onSubmit(e) {
        e.preventDefault();
        const { email, password } = this.state;
        let credentials = `${email}:${password}`;
        let enconded = btoa(credentials);

        axios({
            method: 'POST',
            url: `${process.env.REACT_APP_HOST}/ords/demo_ords/oauth/token?grant_type=client_credentials`,
            headers: {
                'Authorization': `Basic ${enconded}`,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        })
            .then((response) => {
                console.log(response)
                sessionStorage.setItem('token', `Bearer ${response.data.access_token}`)
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
                            <input onChange={(e) => this.onChange(e)} name="email" type="password" className="form-control" id="floatingInput" placeholder="name@example.com"
                            value={this.state.email} />
                            <label for="floatingInput">User</label>
                        </div>
                        <div className="form-floating">
                            <input onChange={(e) => this.onChange(e)} name="password" type="password" className="form-control" id="floatingPassword" placeholder="Password" 
                            value={this.state.password}
                            />
                            <label for="floatingPassword">Password</label>
                        </div>
                        <button className="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
                    </form>
                </main>


            </div>
        )
    }
}

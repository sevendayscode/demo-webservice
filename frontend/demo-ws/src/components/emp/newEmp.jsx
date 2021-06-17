import React, { Component } from 'react'
import axios from 'axios'
//import { Link } from 'react-router-dom';

export default class newEmp extends Component {
    constructor(props) {
        super(props)

        this.state = {
            empno: 3000,
            ename: '',
            job: '',
            mgr: 0,
            sal: 0,
            comm: 0,
            deptno: 0,
        }

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();
        const { ename, job, mgr, sal, comm, deptno, empno } = this.state;
        const body = {
            empno,
            ename,
            job,
            mgr,
            sal,
            comm,
            deptno,
        }

        axios({
            method: 'POST',
            url: `${process.env.REACT_APP_HOST}/v1/api/emp`,
            data: body,
            headers: {
                'content-type': 'application/json',
                'Authorization': sessionStorage.getItem('token')
            }
        })
            .then((response) => {
                console.log(response);
                setTimeout(() => {
                    this.props.history.push('/emp')
                }, 1000);
            })
            .catch((err) => console.log(err));

    }

    render() {
        return (
            <>

                <form className="row g-3" onSubmit={this.onSubmit}>
                    <div className="col-md-12">
                        <label for="empno" className="form-label">Empno</label>
                        <input name="empno" onChange={(e) => this.onChange(e)} type="text" className="form-control" value={this.state.empno} required />
                    </div>
                    <div className="col-md-12">
                        <label for="ename" className="form-label">Ename</label>
                        <input name="ename" onChange={(e) => this.onChange(e)} type="text" className="form-control" value={this.state.ename} required />
                    </div>
                    <div className="col-md-12">
                        <label for="job" className="form-label">Job</label>
                        <input name="job" onChange={(e) => this.onChange(e)} type="text" className="form-control" value={this.state.job} required />
                    </div>
                    <div className="col-md-12">
                        <label for="mgr" className="form-label">Manager</label>
                        <input name="mgr" onChange={(e) => this.onChange(e)} type="text" className="form-control" value={this.state.mgr} required />
                    </div>
                    <div className="col-md-12">
                        <label for="sal" className="form-label">Salary</label>
                        <input name="sal" onChange={(e) => this.onChange(e)} type="text" className="form-control" value={this.state.sal} required />
                    </div>
                    <div className="col-md-12">
                        <label for="comm" className="form-label">Commpensation</label>
                        <input name="comm" onChange={(e) => this.onChange(e)} type="text" className="form-control" value={this.state.comm} required />
                    </div>
                    <div className="col-md-12">
                        <label for="deptnojob" className="form-label">Department number</label>
                        <input name="deptno" onChange={(e) => this.onChange(e)} type="text" className="form-control" value={this.state.deptno} required />
                    </div>

                    <div className="col-12">
                        <button type="submit" className="btn btn-primary">Save</button>
                    </div>
                </form>


                
            </>
        )
    }
}

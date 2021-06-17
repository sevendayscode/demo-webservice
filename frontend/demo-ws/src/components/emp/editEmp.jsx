import React, { Component } from 'react'
import axios from 'axios'
//import { Link } from 'react-router-dom';

export default class editEmp extends Component {
    constructor(props) {
        super(props)

        this.state = {
            employee: [],
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

    componentDidMount() {
        const { empno } = this.props.match.params;
        axios({
            method: 'GET',
            url: `${process.env.REACT_APP_HOST}/v1/api/emp/${empno}`,
            headers: {
                'content-type': 'application/json',
                'Authorization': sessionStorage.getItem('token')
            }
        }).then((response) => {
            console.log(response)
            this.setState({
                employee: response.data,
                ename: response.data[0].ENAME,
                job: response.data[0].JOB,
                mgr: response.data[0].MGR,
                hiredate: response.data[0].HIREDATE,
                sal: response.data[0].SAL,
                comm: response.data[0].COMM,
                deptno: response.data[0].DEPTNO,
                empno
            })
        })
    }

    onSubmit(e) {
        e.preventDefault();
        const { ename, job, mgr, sal, comm, deptno, empno } = this.state;
        const body = {
            ename,
            job,
            mgr,
            sal,
            comm,
            deptno,
        }

        axios({
            method: 'PUT',
            url: `${process.env.REACT_APP_HOST}/v1/api/emp/${empno}`,
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
                        <label for="ename" className="form-label">Ename</label>
                        <input name="ename" onChange={(e) => this.onChange(e)} type="text" className="form-control" value={this.state.ename} />
                    </div>
                    <div className="col-md-12">
                        <label for="job" className="form-label">Job</label>
                        <input name="job" onChange={(e) => this.onChange(e)} type="text" className="form-control" value={this.state.job} />
                    </div>
                    <div className="col-md-12">
                        <label for="mgr" className="form-label">Manager</label>
                        <input name="mgr" onChange={(e) => this.onChange(e)} type="text" className="form-control" value={this.state.mgr} />
                    </div>
                    <div className="col-md-12">
                        <label for="sal" className="form-label">Salary</label>
                        <input name="sal" onChange={(e) => this.onChange(e)} type="text" className="form-control" value={this.state.sal} />
                    </div>
                    <div className="col-md-12">
                        <label for="comm" className="form-label">Commpensation</label>
                        <input name="comm" onChange={(e) => this.onChange(e)} type="text" className="form-control" value={this.state.comm} />
                    </div>
                    <div className="col-md-12">
                        <label for="deptnojob" className="form-label">Department number</label>
                        <input name="deptno" onChange={(e) => this.onChange(e)} type="text" className="form-control" value={this.state.deptno} />
                    </div>

                    <div className="col-12">
                        <button type="submit" className="btn btn-primary">Save</button>
                    </div>
                </form>


                
            </>
        )
    }
}

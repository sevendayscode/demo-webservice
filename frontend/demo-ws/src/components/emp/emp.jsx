import React, { Component } from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom';

export default class emp extends Component {
    constructor(props) {
        super(props)

        this.state = {
            employees: [],
            empDelete: 0
        }
        this.deleteEmployee = this.deleteEmployee.bind(this);
    }

    componentDidMount() {
        axios({
            method: 'GET',
            url: `${process.env.REACT_APP_HOST}/v1/api/emp`,
            headers: {
                'content-type': 'application/json',
                'Authorization': sessionStorage.getItem('token')
            }
        }).then((response) => {
            this.setState({
                employees: response.data
            })
        })
    }

    deleteEmployee(e) {
        console.log('entea')
        e.preventDefault();
        const { empDelete } = this.state;

        axios({
            method: 'DELETE',
            url: `${process.env.REACT_APP_HOST}/v1/api/emp/${empDelete}`,
            headers: {
                'content-type': 'application/json',
                'Authorization': sessionStorage.getItem('token')
            }
        })
            .then((response) => {
                setTimeout(() => {
                    window.location.reload();
                }, 200);
            })
            .catch((err) => console.log(err));
        
    }

    render() {
        return (
            <>


                <ul className="nav border-bottom border-top">
                    <li className="nav-item">
                        <Link to="/emp/new">
                            <i class="bi bi-person-plus-fill" style={{ fontSize: '2rem' }}></i>
                        </Link>
                    </li>
                </ul>
                <table className='table table-bordered'>
                    <thead>
                        <tr>
                            <th></th>
                            <th>Empno</th>
                            <th>Ename</th>
                            <th>Job</th>
                            <th>Manager</th>
                            <th>Hiredate</th>
                            <th>Salary</th>
                            <th>Commission</th>
                            <th>Department</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.employees.map((emp, i) => (
                            <tr key={emp.EMPNO}>
                                <td>
                                    <Link to={`/emp/${emp.EMPNO}/edit`}>
                                        <i class="bi bi-pencil-square"></i>
                                    </Link>
                                    &nbsp;
                                    <Link to="#" data-bs-toggle="modal" data-bs-target="#exampleModal"
                                        onClick={() => this.setState({empDelete: emp.EMPNO})}
                                    >
                                        <i class="bi bi-trash"></i>
                                    </Link>
                                </td>
                                <td>{emp.EMPNO}</td>
                                <td>{emp.ENAME}</td>
                                <td>{emp.JOB}</td>
                                <td>{emp.MGR}</td>
                                <td>{emp.HIREDATE}</td>
                                <td>{emp.SALARY}</td>
                                <td>{emp.COMM}</td>
                                <td>{emp.DEPTNO}</td>
                            </tr>
                        )
                        )}
                    </tbody>
                </table>



                <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Delete</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        Are you sure you want to delete this employee?
                    </div>
                    <div class="modal-footer">
                        <form>
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary" onClick={(e) => this.deleteEmployee(e)}>Save changes</button>
                        </form>
                    </div>
                    </div>
                </div>
                </div>
            </>
        )
    }
}

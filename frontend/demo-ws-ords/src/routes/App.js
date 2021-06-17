import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Layout from '../components/layout/layout'
import EmployeeIndex from '../components/emp/emp'
import EditEmployee from '../components/emp/editEmp'
import NewEmployee from '../components/emp/newEmp'
import Login from '../components/login'

const App = () => (
    <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Login} />
                <Layout>
                    <Route exact path="/emp" component={EmployeeIndex} />
                    <Route exact path="/emp/:empno/edit" component={EditEmployee} />
                    <Route exact path="/emp/new" component={NewEmployee} />
                </Layout>
            </Switch>
    </BrowserRouter>
);

export default App;

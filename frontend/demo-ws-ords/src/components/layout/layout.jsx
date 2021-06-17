import React from 'react'
import { Link } from 'react-router-dom';
import '../../style/layout.css'

const Layout = ({ children }) => {

    return (
        <>
            <header>
                <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
                    <div className="container-fluid">
                        <a className="navbar-brand" href="#">Demo Web Services</a>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarCollapse">
                            <ul className="navbar-nav me-auto mb-2 mb-md-0">
                                <li className="nav-item">
                                    <Link
                                        to='/emp'
                                        className="nav-link active">
                                        Home
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </header>

            <main className="flex-shrink-0">
                <div className="container">
                    {children}
                </div>
            </main>

            <footer className="footer mt-auto py-3 bg-light fixed-bottom">
                <div className="container">
                    <span className="text-muted">Demo web services - enriqueflores.dev@gmail.com</span>
                </div>
            </footer>
        </>
    );
}

export default Layout;
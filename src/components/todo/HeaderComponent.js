import React, {Component} from 'react'
import { Link } from "react-router-dom";
import AuthenticationService from "./AuthenticationService";
import {withRouter} from 'react-router-dom'

 class HeaderComponent extends Component {
    render() {
      const isUserLoggedIn = AuthenticationService.isUserLoggedIn()
      
      return (
        <header>
          <nav className="navbar navbar-expand-md navbar-dark bg-dark">
            <div>
              <a href="google.com" className="navbar-brand">
                Tanaka
              </a>
            </div>
            <ul className="navbar-nav">
              <li>
               {isUserLoggedIn && <Link to="/welcome/Tanaka" className="nav-link">Home </Link>}
              </li>
              <li>
                {isUserLoggedIn && <Link to="/todos" className="nav-link">Todos </Link>}
              </li>
          
            </ul>
            <ul className="navbar-nav navbar-collapse justify-content-end">
            <li>
                {!isUserLoggedIn && <Link to="/login" className="nav-link">Login </Link>}
              </li>
              <li>
              {  isUserLoggedIn && <Link to="/logout" className="nav-link" onClick={AuthenticationService.logout}>Logout </Link>}
              </li>
            </ul>
          </nav>
        </header>
      );
    }
  }

  export default withRouter(HeaderComponent)
  
import React, { Component } from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'
import { FaReact, FaGithub, FaSpinner, FaInfoCircle } from 'react-icons/fa'
import {IoMdPlanet} from 'react-icons/io'
import './Layout.css'

export default class Layout extends Component {
  render() {
    return (
      <>
      <Navbar inverse collapseOnSelect expand="lg" bg="dark" variant="dark" className="nav-bar">
      <Navbar.Brand href="#home"><div className="logo"><IoMdPlanet size={'2em'}/></div></Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
         <Nav.Link  href="#action/3.1"><div className="icon"><FaInfoCircle size={'2em'} /></div>About</Nav.Link>
          <Nav.Link  href="#action/3.1"><div className="icon"><FaReact size={'2em'} /></div> React</Nav.Link>
          <Nav.Link  href="#action/3.1"><div className="icon"><FaSpinner size={'2em'} /></div>Contact</Nav.Link>
          <Nav.Link  href="#action/3.1"><div className="icon"><FaGithub size={'2em'} /></div>Github</Nav.Link>
        </Nav>
        <br />        
        <Form inline style={{
          float: 'right'
        }}>
      <FormControl type="text" placeholder="Search" className="mr-sm-2" />
      <Button variant="outline-success">Search</Button>
    </Form>
      </Navbar.Collapse>
    </Navbar>
    <div>
      <br></br>
      {/*create space here */}
    </div>
    </>
    )
  }
}

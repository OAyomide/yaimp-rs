import React, { Component } from 'react'
import { Nav, Navbar, NavbarBrand } from 'reactstrap'


class Header extends Component {
  render() {
    return (
      <div>
        <Nav style={{ backgroundColor: "#8960db" }}>
          <Navbar expand="md">
            <NavbarBrand style={{ color: "white", fontSize: "35px" }}>Y.A.I.M.P-RS</NavbarBrand>
          </Navbar>
        </Nav>
      </div>
    )
  }
}

export default Header
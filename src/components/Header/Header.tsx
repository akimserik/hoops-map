import React from "react";

import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";

import { useHistory, Link } from "react-router-dom";

import { useAuthState } from "react-firebase-hooks/auth";
import { useContext } from "react";
import { Context } from "../../index";

interface Props {}

const Header = (props: Props) => {
  let history = useHistory();
  const { auth } = useContext(Context);
  const [user] = useAuthState(auth);

  return (
    <Navbar bg="light" variant="light">
      <Container fluid style={{ padding: "0 3rem" }}>
        <Navbar.Brand>
          <img
            src="./hoops-logo.svg"
            height="30"
            className="d-inline-block align-top"
            alt="React Bootstrap logo"
          />
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav
            className="flex justify-content-between"
            style={{ width: "100%" }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <Link to="/map" className="header-link">
                Карта площадок
              </Link>
            </div>
            <div>
              {user ? (
                <div>
                  <span style={{ marginRight: "8px" }}>{user.email}</span>
                  <Button
                    variant="outline-primary"
                    size="sm"
                    onClick={() => auth.signOut()}
                  >
                    Выйти
                  </Button>
                </div>
              ) : (
                <Button
                  variant="outline-primary"
                  size="sm"
                  onClick={() => history.push("/login")}
                >
                  Вход
                </Button>
              )}
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;

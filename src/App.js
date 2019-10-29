import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Container, Table, ProgressBar } from 'react-bootstrap';
import './App.css';

function App() {
  const [regionals, setRegionals] = useState([]);
  const [national, setNational] = useState(0);

  const getDados = async () => {
    let res = await Axios.get('http://localhost:8000/');
    setRegionals(res.data.regionals);
    setNational(res.data.national);
  }

  useEffect(() => {
    getDados();
  }, [])

  return (
    <div className="App text-center">
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="#home">
          senai front
        </Navbar.Brand>
      </Navbar>
      <br />
      <h1>Relatório</h1>
      <br />
      <Container>
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>Regional</th>
              <th>Média</th>
            </tr>
          </thead>
          <tbody>
            {regionals.map((data) => {
              return <tr key={regionals.description}>
                <td>{data.description}</td>
                <td>
                  {`${data.average.toFixed(2)}%`}
                  <ProgressBar now={data.average.toFixed(2)} />
                </td>
              </tr>
            })}
            <tr>
              <td>
                MÈDIA NACIONAL
              </td>
              <td>                
                {`${national.toFixed(2)}%`}
                <ProgressBar now={national.toFixed(2)} />
              </td>
            </tr>
          </tbody>
        </Table>
        <h1></h1>
      </Container>
    </div>
  );
}

export default App;

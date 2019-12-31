import React from 'react'
import { Container, Col, CardBody, Input, Row, Button } from 'reactstrap'

const wasm = import("../build")

class Fibonacci extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      iteration: 0,
      fibRes: 0
    }
  }

  handleChange(e) {
    let value = e.target.value
    this.setState({
      iteration: parseInt(value, 10)
    })
  }



  render() {
    const { fibRes } = this.state
    console.log(this.state.iteration)
    return (
      <div>
        <Container>
          <Row>
            <Col>
              <CardBody>
                <Input placeholder="Iterations" type="number" onChange={e => this.handleChange(e)} />
                <br />
                <Button type="submit" onClick={async (e) => (await wasm).run_fib(this.state.iteration)}>Go!</Button>
                <br />
                <br />
                {/**I should probably use css to create space.. but not worth is 🤷‍♂🙃*/}
                <span>Fibonacci result is:</span>&nbsp;&nbsp;
                <span>{fibRes}</span>
              </CardBody>
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}

export default Fibonacci
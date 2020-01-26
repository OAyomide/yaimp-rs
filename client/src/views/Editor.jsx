import React, { Component } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Container, Col, Card, CardBody, Media, Row, FormGroup, Label, Input } from 'reactstrap'

export default class Editor extends Component {
  constructor(props) {
    super(props)
    this.state = {
      imgSrc: '',
      src: ''
    }

    this.canvasRef = React.createRef();
    // this.canvasRef2 = React.createRef();
  }

  drawCanvas() {
    const canvas = this.canvasRef.current
    // const canvas2 = this.canvasRef2.current

    console.log(canvas)
    const context = canvas.getContext("2d");
    // const context2 = canvas2.getContext("2d")

    const img = new Image()
    img.src = this.props.location.state.meta.previewUrl
    console.log(img.src)
    img.onload = () => {
      context.drawImage(img, 50, 50, 1920 / 1.5, 1053 / 1.5)
    }

    canvas.height = img.height
    canvas.width = img.width
    function pick(event) {
      console.log(`HOVERING HOVERING`)
      let x = event.layerX
      let y = event.layerY

      let pixel = context.getImageData(x, y, 1, 1)
      let data = pixel.data

      // context.putImageData(pixel, 50, 50)
      // context2.drawImage(canvas, Math.min(Math.max(0, x - 5), img.width - 10), Math.min(Math.max(0, y - 5), img.height - 10), 10, 10, 0, 0, 100, 100)
    }
    // context.canvas.width = window.innerWidth
    // context.canvas.height = window.innerHeight
    canvas.addEventListener('mousemove', pick)
  }

  async componentDidMount() {
    this.drawCanvas()
  }

  render() {
    const { meta: { previewUrl } } = this.props.location.state
    console.log(this.props.location.state.meta)
    return (
      <div>
        <Header />
        <canvas id="my-canvas" ref={this.canvasRef} style={{ marginLeft: '160px' }}></canvas>
        {/* <canvas id="shadow-canvas" ref={this.canvasRef2} /> */}
        {/* <Container> */}
        <div>
          <Row>
            <FormGroup>
              <Label for="select"> Effect </Label>
              <Input>
                <option value="">Select</option>
                <option value="monochrome">Monochrome</option>
                <option value="half-monochrome">Half Monochrome</option>
                <option value="sepia">Sepia</option>
              </Input>
            </FormGroup>
          </Row>
        </div>
        {/* </Container> */}
        <Footer />
      </div >
    )
  }
}

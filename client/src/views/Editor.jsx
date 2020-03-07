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
    window.document.title = this.props.location.state.meta.name
    // console.log(this.props.state.meta)
    // console.log(img.src)
    img.onload = () => {
      context.drawImage(img, 0, 0, img.naturalWidth / 1.5, img.naturalHeight / 1.5)
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
        <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between', marginTop: '50px' }}>
          <div style={{ marginLeft: '20px', width: '120px' }}>
            <Row>
              <FormGroup style={{ width: '150px', marginLeft: '10px' }}>
                <Label for="select"> Effect </Label>
                <Input type="select" name="select" id="effectselect" required>
                  <option value="">Select</option>
                  <option value="monochrome">Monochrome</option>
                  <option value="half-monochrome">Half Monochrome</option>
                  <option value="sepia">Sepia</option>
                </Input>
              </FormGroup>
              <FormGroup style={{ width: '150px', marginLeft: '10px' }}>
                <Label for="compression">Compression</Label>
                <Input type="select">
                  <option value="">Select</option>
                  <option value="oxipng">OxiPNG</option>
                </Input>
              </FormGroup>
            </Row>
          </div>
          <canvas id="my-canvas" ref={this.canvasRef} style={{ marginLeft: '170px' }}></canvas>
        </div>
        {/* </Container> */}
        <Footer />
      </div >
    )
  }
}

// style={{ marginLeft: '160px' }}
// width: 1920, height: 1080, 
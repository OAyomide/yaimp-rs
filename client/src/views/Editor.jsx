import React, { Component } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Container, Col, Card, CardBody, Media, Row, FormGroup, Label, Input } from 'reactstrap'
import Slider, { Range, createSliderWithTooltip } from 'rc-slider'
import 'rc-slider/assets/index.css'

const WasmModule = import('../build')

function UInt8ArrayToBase64(buffer) {
  let bin = ''
  for (let i = 0; i < buffer.length; i++) {
    bin += String.fromCharCode(buffer[i])
  }
  return window.btoa(bin)
}


const SSlider = createSliderWithTooltip(Slider)
export default class Editor extends Component {
  constructor(props) {
    super(props)
    this.state = {
      imgSrc: '',
      src: '',
      effect: '',
      optimization: '',
      compression: '',
      imgBuff: new Uint8Array()
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
    window.document.title = `YAIMP - ${this.props.location.state.meta.name}`
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


  async applyImageEffect(effect) {
    console.log(`Effect s`, effect)
    let fileBlobURL = this.props.location.state.meta.previewUrl
    let fetchBlobURL = await (await fetch(fileBlobURL)).blob()
    let fileReader = new FileReader()
    fileReader.readAsArrayBuffer(fetchBlobURL)
    fileReader.onload = event => {
      let memBuf = new Uint8Array(event.target.result)
      WasmModule.then(res => {
        let imgEffect = res.handle_effect(memBuf, effect)
        if (imgEffect) {
          let img64 = UInt8ArrayToBase64(imgEffect)
          let canv = this.canvasRef.current
          let context = canv.getContext("2d")
          let img = new Image()
          img.src = `data:image/png;base64,${img64}`
          this.setState({ imgBuff: imgEffect, effect: effect })
          img.onload = () => {
            context.drawImage(img, 0, 0, img.naturalWidth / 1.5, img.naturalHeight / 1.5)
          }
        }
      })
    }
  }

  async applyimageCompression(e) {
    let fileBlobURL = this.props.location.state.meta.previewUrl
    let fetchBlobURL = await (await fetch(fileBlobURL)).blob()
    let fileReader = new FileReader()
    fileReader.readAsArrayBuffer(fetchBlobURL)
    fileReader.onload = event => {
      let memBuf = new Uint8Array(event.target.result)
      WasmModule.then(res => {
        let imgCompress = res.compress_image(memBuf, { backup: true, filter: 3, compression: 5, verbose: 1 })
        console.log(`Image compress is`, imgCompress)
        if (imgCompress) {
          let img64 = UInt8ArrayToBase64(imgCompress)
          let canv = this.canvasRef.current
          let context = canv.getContext("2d")
          let img = new Image()
          img.src = `data:image/png;base64,${img64}`
          this.setState({ imgBuff: imgCompress })
          img.onload = () => {
            context.drawImage(img, 0, 0, img.naturalWidth / 1.5, img.naturalHeight / 1.5)
          }
        }
      })
    }
  }


  async rotateImage(deg) {
    let degree = parseInt(deg.target.value, 10)
    let canv = this.canvasRef.current
    let context = canv.getContext("2d")
    context.clearRect(0, 0, context.canvas.width, context.canvas.height)
    let buff = this.state.imgBuff
    // let rotate = await (await WasmModule).rotate(buff, degree)
    WasmModule.then(res => {
      let rotate = res.rotate(buff, degree)
      let rotatedImg = UInt8ArrayToBase64(rotate)
      let img = new Image()
      img.src = `data:image/png;base64,${rotatedImg}`
      img.onload = () => {
        context.drawImage(img, 0, 0, img.naturalWidth / 1.5, img.naturalHeight / 1.5)
      }
    })

  }

  changeImageEffect = async (e) => {
    let value = e.target.value
    await this.applyImageEffect(value)
  }

  changeOptimizationValue = e => {
    this.setState({ optimization: e })
  }

  changeCompression = async (e) => {
    this.setState({ compression: e.target.value })
    await this.applyimageCompression(e)
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
                <Input type="select" name="select" id="effselect" required onChange={e => this.changeImageEffect(e)}>
                  <option value="">Select</option>
                  <option value="monochrome">Monochrome</option>
                  <option value="half-monochrome">Half Monochrome</option>
                  <option value="sepia">Sepia</option>
                </Input>
              </FormGroup>
              <FormGroup style={{ width: '150px', marginLeft: '10px' }}>
                <Label>Rotate</Label>
                <Input type="select" onChange={e => this.rotateImage(e)} disabled={this.state.effect === '' ? true : false}>
                  <option value="">Select</option>
                  <option value={90}>90</option>
                  <option value={180}>180</option>
                  <option value={270}>270</option>
                  <option value={360}>360</option>
                </Input>
              </FormGroup>
              <FormGroup style={{ width: '150px', marginLeft: '10px' }}>
                <Label for="compression">Compression</Label>
                <Input type="select" onChange={e => this.changeCompression(e)}>
                  <option value="">Select</option>
                  <option value="oxipng">OxiPNG</option>
                </Input>
                {this.state.compression !== '' ? <SSlider defaultValue={2} max={6} style={{ marginTop: '5px' }} onChange={e => this.changeOptimizationValue(e)} /> : ''}
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

import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Dropzone from 'react-dropzone-uploader'
import 'react-dropzone-uploader/dist/styles.css'
import { Container, Row, Col, Card, CardBody } from 'reactstrap'
import { withRouter } from 'react-router-dom'


class Intro extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
    }

    this.navigateToNextScreen = this.navigateToNextScreen.bind(this)
  }

  navigateToNextScreen({ meta, file }, status) {
    if (status === 'done') {
      // naivgate to the editor.. pass the meta as a prop
      console.log(meta)
      this.props.history.push({
        pathname: '/editor',
        state: { meta: meta }
      })
      return
    }
  }

  render() {
    return (
      <div>
        <Header />
        <Container>
          <Row>
            <Col md={12} sm={12} xs={12} xl={12}>
              <Dropzone
                onChangeStatus={this.navigateToNextScreen}
                onSubmit={console.log(`SUBMIT`)}
                accept='image/png'
                maxFiles={1}
                styles={{ dropzone: { overflow: 'hidden', border: 0, marginTop: '35vh' }, inputLabel: { fontSize: '40px', color: 'white' } }}
                inputContent={'Drag & Drop image here or upload'}
              />
            </Col>
          </Row>
        </Container>
        <Footer />
      </div>
    )
  }
}

export default withRouter(Intro)
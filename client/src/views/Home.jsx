import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import UploadImageComponent from './Images'

class Home extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <div>
          <UploadImageComponent />
        </div>
        <div>
          <Footer />
        </div>
      </div>
    )
  }
}

export default Home
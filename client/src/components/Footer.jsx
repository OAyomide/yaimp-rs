import React, { Component } from 'react'

class Footer extends Component {
    render() {
        return (
            <div>
                <footer className="footer">
                    &#9400;{`${new Date().getFullYear()}`}. Ayomide Onigbinde. Made with ❤️
        </footer>
            </div>
        )
    }
}

export default Footer
import React, { Component } from 'react';

class Second extends Component {
  sendToTest = () => {
    this.props.history.push('/test')
  }

  render() {
    return(
      <div>
        <h1>Second</h1>
        <button type='button' onClick={this.sendToTest}>Back</button>
      </div>
    )
  }
}

export default Second;
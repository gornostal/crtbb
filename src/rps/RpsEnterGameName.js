import React, { Component } from 'react'
import { FormControl } from 'react-bootstrap'
import { Redirect } from 'react-router-dom'

class RpsEnterGameName extends Component {
  constructor(props) {
    super(props)
    this.onSubmit = this.onSubmit.bind(this)
    this.state = {
      gameName: null
    }
  }

  onSubmit(e) {
    e.preventDefault()
    const gameName = this.input.value.trim()
    this.setState({ gameName })
  }

  render() {
    if (this.state.gameName) {
      return <Redirect push to={`/rps/game/${this.state.gameName}`} />
    }

    return (
      <div>
        <h2>Step 0 of 3. Enter Game Name</h2>
        <form onSubmit={this.onSubmit}>
          <FormControl
            autoFocus
            inputRef={ref => {
              this.input = ref
            }}
            placeholder="Choose name for a new game or join an existing one"
          />
        </form>
      </div>
    )
  }
}

export default RpsEnterGameName

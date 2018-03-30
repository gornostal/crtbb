import React, { Component } from 'react'
import { FormGroup, ButtonGroup, Button, HelpBlock, ControlLabel, FormControl } from 'react-bootstrap'
import { Field } from 'redux-form'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'

import './RpsInput.css'

const parseNumber = value => Number(value)

class RockPaperScissorsOptions extends Component {
  render() {
    const { label, meta, input, required } = this.props
    return (
      <FormGroup validationState={meta.error && 'error'} className={required && 'required'}>
        <ControlLabel className="col-sm-2">{label}</ControlLabel>
        <div className="col-sm-10">
          <ButtonGroup className="rps-input__button-group">
            <Button
              onClick={() => {
                input.onChange('rock')
              }}
              active={input.value === 'rock'}
            >
              <FontAwesomeIcon icon="hand-rock" />
            </Button>
            <Button
              onClick={() => {
                input.onChange('paper')
              }}
              active={input.value === 'paper'}
            >
              <FontAwesomeIcon icon="hand-paper" />
            </Button>
            <Button
              onClick={() => {
                input.onChange('scissors')
              }}
              active={input.value === 'scissors'}
            >
              <FontAwesomeIcon icon="hand-scissors" />
            </Button>
          </ButtonGroup>
          <FormControl.Feedback />
          <HelpBlock>{meta.error}</HelpBlock>
        </div>
      </FormGroup>
    )
  }
}

class RpsInput extends Component {
  render() {
    return (
      <Field
        component={RockPaperScissorsOptions}
        parse={this.props.type === 'number' ? parseNumber : null}
        {...this.props}
      />
    )
  }
}

export default RpsInput

import React, { Component } from 'react'
import { Alert, Button } from 'react-bootstrap'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import { withRouter } from 'react-router-dom'

import { FormInput, FormSelect } from '../layout/FormInput'
import makeFormSubmitHandler from '../utils/makeFormSubmitHandler'
import withAsyncData from '../utils/withAsyncData'

import { getAccounts, startGame, joinGame } from './rpsApi'
import RpsInput from './RpsInput'

class GameForm extends Component {
  constructor(props) {
    super(props)
    this.onSubmit = this.onSubmit.bind(this)
  }

  componentDidMount() {
    this.props.ethAccounts.load()
  }

  async onSubmit(formData) {
    if (this.props.newGame) {
      return await this.props.startGame(formData)
    } else {
      return await this.props.joinGame(formData)
    }
  }

  render() {
    const { handleSubmit, submitting, submitSucceeded, ethAccounts } = this.props
    const accountOptions = ethAccounts.data ? ethAccounts.data.map(i => ({ value: i, displayValue: i })) : []
    accountOptions.unshift({ value: '', displayValue: '(not selected)' })
    var error = this.props.error
    if (ethAccounts.error) {
      error = 'Could not load your accounts. Did you install Metamask browser extension?'
    }
    if (ethAccounts.data && ethAccounts.data.length === 0) {
      error = 'Could not load your accounts. Did you unlock Metamask?'
    }

    return (
      <div>
        {error && (
          <Alert bsStyle="warning">
            <strong>Error!</strong> <br /> {error}
          </Alert>
        )}

        {submitSucceeded && (
          <Alert bsStyle="success">
            <strong>Success!</strong>
          </Alert>
        )}

        <form className="form-horizontal" onSubmit={handleSubmit(this.onSubmit)}>
          <FormInput name="gameName" type="text" placeholder="Choose a unique name for this game" label="Name" />
          <FormSelect
            name="fromAccount"
            label="Address"
            disabled={!ethAccounts.data || ethAccounts.data.length === 0}
            options={accountOptions}
          />
          <FormInput name="bet" type="text" label="Your Bet" addonAfter="ETH" />
          <RpsInput name="shape" />
          <div className="col-sm-offset-2">
            <Button className="btn-lg" bsStyle="success" type="submit" disabled={submitting}>
              {submitting && (
                <span>
                  <i className="fa fa-spinner fa-spin" />&nbsp;
                </span>
              )}
              Submit
            </Button>
          </div>
          <div className="clearfix" />
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  initialValues: {},
  formValues: (state.form.rps && state.form.rps.values) || {},
  startGame: makeFormSubmitHandler(startGame),
  joinGame: makeFormSubmitHandler(joinGame)
})

export default compose(
  withRouter,
  withAsyncData('ethAccounts', getAccounts),
  connect(mapStateToProps),
  reduxForm({ form: 'GameForm' })
)(GameForm)

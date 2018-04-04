import React, { Component } from 'react'
import { Alert, Button } from 'react-bootstrap'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { reduxForm, getFormValues } from 'redux-form'
import { withRouter } from 'react-router-dom'
import { utils } from 'web3'

import { FormInput, FormSelect } from '../layout/FormInput'
import makeFormSubmitHandler from '../utils/makeFormSubmitHandler'
import withAsyncData from '../utils/withAsyncData'

import { getAccounts, getBetValue, startGame, joinGame } from './rpsApi'
import withGameStatus from './withGameStatus'
import RpsInput from './RpsInput'

class GameForm extends Component {
  constructor(props) {
    super(props)
    this.onSubmit = this.onSubmit.bind(this)
  }

  getGameName() {
    return this.props.match.params.gameName
  }

  componentDidMount() {
    this.props.ethAccounts.load()
    if (!this.props.newGame) {
      this.props.betValue.load(this.getGameName())
    }
  }

  componentWillReceiveProps(newProps) {
    if (newProps.submitSucceeded) {
      newProps.refreshGameStatus()
    }
  }

  onSubmit(formData) {
    const gameName = this.getGameName()
    if (this.props.newGame) {
      return this.props.startGame({ ...formData, gameName })
    } else {
      return this.props.joinGame({ ...formData, gameName, betWei: this.props.betWei })
    }
  }

  render() {
    const { handleSubmit, submitting, newGame, betValue, ethAccounts } = this.props
    const accountOptions = ethAccounts.data ? ethAccounts.data.map(i => ({ value: i, displayValue: i })) : []
    accountOptions.unshift({ value: '', displayValue: '(not selected)' })
    var error = this.props.error
    if (ethAccounts.error) {
      error = 'Could not load your accounts. Did you install Metamask browser extension?'
    }
    if (ethAccounts.data && ethAccounts.data.length === 0) {
      error = 'Could not load your accounts. Did you unlock Metamask?'
    }
    if (betValue.error) {
      console.error('Could not load betValue', betValue.error)
      error = 'Could not load bet value'
    }

    return (
      <div>
        {error && (
          <Alert bsStyle="warning">
            <strong>Error!</strong> <br /> {error}
          </Alert>
        )}

        <form className="form-horizontal" onSubmit={handleSubmit(this.onSubmit)}>
          <FormSelect
            name="fromAccount"
            label="Address"
            disabled={!ethAccounts.data || ethAccounts.data.length === 0}
            options={accountOptions}
          />
          <FormInput name="bet" type="text" label="Your Bet" addonAfter="ETH" disabled={!newGame} />
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

const mapStateToProps = (state, ownProps) => {
  var initialValues
  var betWei = ''
  if (ownProps.betValue.data) {
    betWei = ownProps.betValue.data.toString()
    initialValues = { bet: utils.fromWei(betWei, 'ether') }
  }

  return {
    initialValues,
    betWei,
    formValues: getFormValues('JoinGameForm')(state),
    startGame: makeFormSubmitHandler(startGame),
    joinGame: makeFormSubmitHandler(joinGame)
  }
}

export default compose(
  withRouter,
  withAsyncData('ethAccounts', getAccounts),
  withAsyncData('betValue', getBetValue),
  withGameStatus,
  connect(mapStateToProps),
  reduxForm({ form: 'JoinGameForm' })
)(GameForm)

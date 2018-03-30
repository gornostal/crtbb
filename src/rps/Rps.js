import React, { Component } from 'react'
import { Alert, Button } from 'react-bootstrap'
import { compose, bindActionCreators } from 'redux'
import Helmet from 'react-helmet'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import { withRouter } from 'react-router-dom'

import { FormInput, FormSelect } from '../layout/FormInput'

import { actions } from './rpsActions'

class Rps extends Component {
  constructor(props) {
    super(props)
    this.onSubmit = this.onSubmit.bind(this)
  }

  componentDidMount() {
    this.props.actions.getAccounts()
  }

  async onSubmit(data) {}

  render() {
    const { handleSubmit, submitting, submitSucceeded, accounts } = this.props
    const accountOptions = accounts.payload ? accounts.payload.map(i => ({ value: i, displayValue: i })) : []
    accountOptions.unshift({ value: '', displayValue: '(not selected)' })
    var error = this.props.error
    if (accounts.error) {
      error = 'Could not load your accounts. Did you install Metamask browser extension?'
    }
    if (accounts.payload && accounts.payload.length === 0) {
      error = 'Could not load your accounts. Did you unlock Metamask?'
    }

    return (
      <div className="jumbotron">
        <Helmet>
          <title>Rock-Paper-Scissors</title>
        </Helmet>

        <h2>Rock-Paper-Scissors</h2>

        <br />

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
          <FormSelect
            name="fromAccount"
            label="From"
            disabled={!accounts.payload || accounts.payload.length === 0}
            options={accountOptions}
          />
          <FormInput name="ethValue" type="text" label="ETH" />
          <FormInput name="address1" type="text" label="Address 1" />
          <FormInput name="address2" type="text" label="Address 2" />
          <Button className="btn-lg" bsStyle="success" type="submit" disabled={submitting}>
            {submitting && (
              <span>
                <i className="fa fa-spinner fa-spin" />&nbsp;
              </span>
            )}
            Submit
          </Button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  initialValues: {},
  formValues: (state.form.rps && state.form.rps.values) || {},
  accounts: state.rps.accounts
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch)
})

export default compose(withRouter, connect(mapStateToProps, mapDispatchToProps), reduxForm({ form: 'rps' }))(Rps)

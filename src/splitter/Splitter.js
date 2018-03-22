import React, { Component } from "react"
import { Alert, Button } from "react-bootstrap"
import Helmet from "react-helmet"
import { compose } from "redux"
import { connect } from "react-redux"
import { reduxForm } from "redux-form"
import { withRouter } from "react-router-dom"

import makeFormSubmitHandler from "../utils/makeFormSubmitHandler"
import { FormInput } from "../layout/FormInput"

import { split } from "./splitterApi"

class Splitter extends Component {
  constructor(props) {
    super(props)
    this.onSubmit = this.onSubmit.bind(this)
  }

  async onSubmit(data) {
    return await this.props.split(data.ethValue, data.account1, data.account2)
  }

  render() {
    const { handleSubmit, error, submitting, submitSucceeded } = this.props
    return (
      <div className="jumbotron">
        <Helmet>
          <title>Splitter</title>
        </Helmet>

        <h2>Enter two addresses</h2>
        <h3>and you will split sent Ether among them</h3>

        <br/>

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
          <FormInput name="ethValue" type="text" label="ETH" />
          <FormInput name="address1" type="text" label="Address 1" />
          <FormInput name="address2" type="text" label="Address 2" />
          <Button className="btn-lg" bsStyle="success" type="submit" disabled={submitting}>
            Submit
          </Button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  initialValues: {},
  split: makeFormSubmitHandler(split)
})

export default compose(withRouter, connect(mapStateToProps), reduxForm({ form: "splitter" }))(Splitter)

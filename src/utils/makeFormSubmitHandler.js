import { SubmissionError } from 'redux-form'

export default function makeFormSubmitHandler(asyncFn) {
  return async function(...args) {
    try {
      return await asyncFn(...args)
    } catch (e) {
      let error = 'Unexpected error'
      let errors = {}
      if (e.status === 500) {
        error = 'Internal server error occurred. Please try again later.'
      } else if (e.body) {
        error = e.body.message
        errors = e.body.formErrors || {}
      }
      throw new SubmissionError({ ...errors, _error: error })
    }
  }
}

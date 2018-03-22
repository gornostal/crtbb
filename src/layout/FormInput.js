import React from 'react'
import { FormGroup, HelpBlock, ControlLabel, FormControl } from 'react-bootstrap'
import { Field } from 'redux-form'

const parseNumber = value => Number(value)

const BootstrapFormInput = ({ input, label, value, meta, onChange, type, required }) => (
  <FormGroup validationState={meta.error && 'error'} className={required && 'required'}>
    <ControlLabel className="col-sm-2">{label}</ControlLabel>
    <div className="col-sm-10">
      <FormControl value={input.value} onChange={input.onChange} type={type} />
      <FormControl.Feedback />
      <HelpBlock>{meta.error}</HelpBlock>
    </div>
  </FormGroup>
)

export const FormInput = props => (
  <Field component={BootstrapFormInput} parse={props.type === 'number' ? parseNumber : null} {...props} />
)

const BootstrapFormSelect = ({
  input,
  label,
  value,
  meta,
  onChange,
  options,
  select,
  disabled,
  blankOption,
  required
}) => (
  <FormGroup validationState={meta.error && 'error'} className={required && 'required'}>
    <ControlLabel className="col-sm-2">{label}</ControlLabel>
    <div className="col-sm-10">
      <FormControl componentClass="select" value={input.value} onChange={input.onChange} disabled={disabled}>
        {blankOption && <option value="" />}
        {options.map(({ value, displayValue }) => (
          <option key={value} value={value}>
            {displayValue}
          </option>
        ))}
      </FormControl>
      <FormControl.Feedback />
      <HelpBlock>{meta.error}</HelpBlock>
    </div>
  </FormGroup>
)

export const FormSelect = props => (
  <Field component={BootstrapFormSelect} parse={props.type === 'number' ? parseNumber : null} {...props} />
)

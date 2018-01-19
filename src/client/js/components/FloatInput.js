// @flow

import React from 'react'

type Props = {
  name: string,
  type: string,
  value: string,
  textLabel: string,
  handleChange: string,
  readOnly: string,
  autofocus: string
}

class FloatInput extends React.Component<Props> {
  render() {
    const {
      name,
      type,
      value,
      textLabel,
      handleChange,
      readOnly,
      autofocus
    } = this.props

    let autoFocus = false
    if (typeof autofocus !== 'undefined') autoFocus = true
    return (
      <div>
        {readOnly === 'true' ? (
          <div>
            <input
              id={name}
              name={name}
              type={type || 'text'}
              className={value ? 'has-value input__float' : 'input__float'}
              value={value}
              readOnly="readOnly"
              autoFocus={autoFocus}
            />
            <label htmlFor={name}>{textLabel}</label>
          </div>
        ) : (
          <div>
            <input
              id={name}
              name={name}
              type={type || 'text'}
              className={value ? 'has-value input__float' : 'input__float'}
              value={value}
              onChange={handleChange}
              autoFocus={autoFocus}
            />
            <label htmlFor={name}>{textLabel}</label>
          </div>
        )}
      </div>
    )
  }
}

export default FloatInput

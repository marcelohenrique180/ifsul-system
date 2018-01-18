import React from 'react'

class FloatInput extends React.Component {
  render () {
    const {name, type, value, textLabel, handleChange, readOnly, autofocus} = this.props

    let autoFocus = false
    if (typeof autofocus !== 'undefined') autoFocus = true
    return (
      <div>
        {
          readOnly === 'true'
            ? <div>
              <input id={name} name={name} type={type || 'text'}
                className={value ? 'has-value input__float' : 'input__float'}
                value={value} readOnly="readOnly" autoFocus={autoFocus}/>
              <label htmlFor={name}>{textLabel}</label>
            </div>
            : <div>
              <input id={name} name={name} type={type || 'text'}
                className={value ? 'has-value input__float' : 'input__float'}
                value={value} onChange={handleChange} autoFocus={autoFocus}/>
              <label htmlFor={name}>{textLabel}</label>
            </div>
        }
      </div>
    )
  }
}

export default FloatInput

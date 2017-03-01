import React from 'react'

class FloatInput extends React.Component{
    render() {
        const {name, type, value, textLabel, handleChange} = this.props;

        return (
            <div>
                <input id={name} name={name} type={type || "text"} className={value ? 'has-value':''} value={value} onChange={handleChange}/>
                <label htmlFor={name}>{textLabel}</label>
            </div>
        )
    }
}

export default FloatInput
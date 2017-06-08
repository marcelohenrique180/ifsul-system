import React from 'react'

class FloatInput extends React.Component{
    render() {
        const {name, type, value, textLabel, handleChange, readOnly} = this.props;

        return (
            <div>
                {
                    readOnly === "true" ?
                        <div>
                            <input id={name} name={name} type={type || "text"} className={value ? 'has-value':''} value={value} readOnly="readOnly"/>
                            <label htmlFor={name}>{textLabel}</label>
                        </div>
                        :
                        <div>
                            <input id={name} name={name} type={type || "text"} className={value ? 'has-value':''} value={value} onChange={handleChange}/>
                            <label htmlFor={name}>{textLabel}</label>
                        </div>
                }
            </div>
        )
    }
}

export default FloatInput
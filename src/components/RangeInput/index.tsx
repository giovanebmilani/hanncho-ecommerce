import React, { InputHTMLAttributes } from 'react'
import './index.scss'

export type CheckBoxProps = InputHTMLAttributes<HTMLInputElement>

const RangeInput: React.FC<CheckBoxProps> = (props) => {
	return <input {...props} className='range-input-container' type='range'></input>
}

export default RangeInput

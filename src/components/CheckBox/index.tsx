import React, { InputHTMLAttributes } from 'react'
import './index.scss'

export type CheckBoxProps = InputHTMLAttributes<HTMLInputElement>

const CheckBox: React.FC<CheckBoxProps> = (props) => {
	return <input {...props} className='checkbox-container' type='checkbox'></input>
}

export default CheckBox

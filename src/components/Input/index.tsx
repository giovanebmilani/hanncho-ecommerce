import React, { forwardRef, Ref, DetailedHTMLProps, InputHTMLAttributes, useState } from 'react'
import cn from 'clsx'
import './index.scss'

export interface InputProps
	extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
	label: React.ReactNode
	type?: 'tel' | 'text' | 'date' | 'number' | 'search' | 'password'
	ref?: Ref<HTMLInputElement>
}

const Input = forwardRef<HTMLInputElement, InputProps>(function Input(props: InputProps, ref) {
	const [internalValue, setInternalValue] = useState('')

	const {
		type,
		onBlur,
		onChange,
		maxLength,
		name,
		label,
		required,
		disabled,
		value,
		readOnly,
		className
	} = props

	function handleBlur(e: React.FocusEvent<HTMLInputElement>): void {
		// adjust firefox behavior... when input's type is number, firefox doesn't dispatch change event but
		// fill the field with new value, to fix that, we clear input when value is not a number
		if (type === 'number' && !e.target.validity.valid) {
			e.target.value = ''
			setInternalValue('')
		}

		onBlur && onBlur(e)
	}

	function handleChange(e: React.ChangeEvent<HTMLInputElement>): void {
		// adjust input type number behavior... when input type is number, maxlength doesn't work, to fix that,
		// we trunc any value on input change to maxlength declared in input
		if (maxLength && e.target.value && maxLength < e.target.value.length) {
			e.target.value = String(e.target.value).substring(maxLength, 0)
		}

		setInternalValue(e.target.value)

		onChange && onChange(e)
	}

	return (
		<div
			className={cn(className, 'input-container', type, {
				disabled: disabled,
				readonly: readOnly
			})}
		>
			<input
				{...props}
				ref={ref}
				className={cn(className, ['input'], {
					filled:
						!!(value !== undefined ? value : internalValue) || (type === 'number' && value === 0)
				})}
				onChange={handleChange}
				onBlur={handleBlur}
			/>
			<label id={`${name}-input-label`} htmlFor={`${name}-input`} className={'label'} data-label=''>
				{label} {required && !disabled && '*'}
			</label>
		</div>
	)
})

export default Input

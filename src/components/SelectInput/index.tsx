import React, { useState } from 'react'
import clsx from 'clsx'
import { removeDiacritics } from '../../utils/masks/removeDiacritics'
import Input, { InputProps } from '../Input'
import './index.scss'

export interface DropDownInputItem<T> {
	label: string
	value: T
}

export interface DropDownInputProps<T> extends InputProps {
	autoCompletion?: DropDownInputItem<T>[]
	onSelectItem?: (value?: T) => void
}

export default function SelectInput<T>({
	autoCompletion,
	value,
	readOnly,
	className,
	onSelectItem,
	...props
}: DropDownInputProps<T>) {
	const [opened, setOpened] = useState(false)

	const sanitize = (str?: string | number | readonly string[]) =>
		removeDiacritics(String(str || '').toLowerCase())
	// const items = autoCompletion?.filter(
	// 	(term) => readOnly || sanitize(term.label).includes(sanitize(value))
	// )
	const items = autoCompletion
	const item = autoCompletion?.find((item) => item.value === (value as unknown))

	const handleOnFocus = () => {
		setOpened(true)
	}

	const handleOnBlur = () => {
		setOpened(false)
	}

	return (
		<div
			onFocus={handleOnFocus}
			onBlur={handleOnBlur}
			className={clsx(className, 'select-input-container')}
		>
			<Input
				readOnly={readOnly}
				value={item?.label ?? (readOnly ? undefined : value) ?? ''}
				className='box'
				{...props}
			></Input>
			{opened && (
				<div className='items'>
					{items?.map((item, i) => (
						<div
							key={i}
							onTouchEnd={() => onSelectItem?.(item.value)}
							onMouseDown={() => onSelectItem?.(item.value)}
						>
							<p>{item.label}</p>
						</div>
					))}
				</div>
			)}
		</div>
	)
}

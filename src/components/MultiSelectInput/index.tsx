import React, { useRef, useState } from 'react'
import clsx from 'clsx'
import { removeDiacritics } from '../../utils/masks/removeDiacritics'
import Input, { InputProps } from '../Input'
import './index.scss'
import CheckBox from '../CheckBox'

export interface MultiSelectDropDownInputItem<T> {
	label: string
	value: T
}

export interface MultiSelectDropDownInputProps<T> extends InputProps {
	autoCompletion?: MultiSelectDropDownInputItem<T>[]
	onSelectItem?: (value?: T) => void
	values?: T[]
	labelFunction?: (items?: T[]) => string
	isSelectedFunction?: (item: T) => boolean
}

export default function MultiSelectInput<T>({
	autoCompletion,
	values,
	readOnly,
	className,
	onSelectItem,
	labelFunction,
	isSelectedFunction,
	...props
}: MultiSelectDropDownInputProps<T>) {
	const [opened, setOpened] = useState(false)
	const items = autoCompletion

	const handleOnFocus = () => {
		setOpened(true)
	}

	const handleOnBlur = () => {
		setOpened(false)
	}

	const handleSelectItem = (value?: T) => {
		onSelectItem?.(value)
	}

	return (
		<div
			className={clsx(className, 'select-input-container')}
			onFocus={handleOnFocus}
			onBlur={handleOnBlur}
		>
			<Input
				readOnly={readOnly}
				value={labelFunction?.(values) ?? ''}
				className='box'
				inputMode='none'
				{...props}
			></Input>
			{opened && (
				<div className='items'>
					{items?.map((item, i) => (
						<div
							key={i}
							onTouchEnd={() => handleSelectItem?.(item.value)}
							onMouseDown={() => handleSelectItem?.(item.value)}
						>
							<CheckBox
								required={false}
								className='input'
								checked={isSelectedFunction?.(item.value) ?? false}
							/>
							<p>{item.label}</p>
						</div>
					))}
				</div>
			)}
		</div>
	)
}

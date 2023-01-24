import './index.scss'
import React, { useEffect, useState } from 'react'
import Input from '../../../../../components/Input'
import { useModal } from '../../../../../providers/Modal/ModalProvider'
import Button from '../../../../../components/Button'
import Loader from '../../../../../components/Loader'
import {
	useProductVariantCreateMutation,
	useProductVariantUpdateMutation
} from '../../../../../api/admin/product/mutations'
import SelectInput from '../../../../../components/SelectInput'
import { VariantDto } from '../../../../../dtos/Variant'
import { ColorDto } from '../../../../../dtos/Color'
import { useGetAllColors } from '../../../../../api/admin/color/queries'
import CheckBox from '../../../../../components/CheckBox'
import RangeInput from '../../../../../components/RangeInput'
import SizeViewer from '../../../../../components/SizeViewer'
import { StockDto } from '../../../../../dtos/Stock'

export interface VariantModalProps {
	productId: number
	variant?: VariantDto
	isEdit?: boolean
}

export const VariantModal: React.FC<VariantModalProps> = ({ productId, variant, isEdit }) => {
	const { hidden, setVisibility } = useModal()
	const [price, setPrice] = useState<number>(variant?.price || 0)
	const [basePrice, setBasePrice] = useState<number>(variant?.basePrice || 0)
	const [discount, setDiscount] = useState<number>(0)
	const [highlighted, setHighlighted] = useState<boolean>(false)
	const [color, setColor] = useState<ColorDto | undefined>(variant?.color)
	const [colors, setColors] = useState<ColorDto[]>([])
	const [stocks, setStocks] = useState<StockDto[]>(variant?.stocks || [])
	const { data: colorsData } = useGetAllColors()
	const {
		isLoading: isCreationLoading,
		isSuccess: isCreationSuccess,
		mutate: creationMutate
	} = useProductVariantCreateMutation(productId, {
		price,
		basePrice,
		colorId: color?.id || 0,
		highlighted
	})
	const {
		isLoading: isUpdateLoading,
		isSuccess: isUpdateSuccess,
		mutate: updateMutate
	} = useProductVariantUpdateMutation(productId, variant?.id || 0, {
		price,
		basePrice,
		colorId: color?.id || 0,
		highlighted,
		stocks
	})

	useEffect(() => {
		if (!colorsData) return
		setColors(colorsData)
	}, [colorsData])

	useEffect(() => {
		if (isUpdateSuccess || isCreationSuccess) {
			setPrice(0)
			setBasePrice(0)
			setColor(undefined)
			setHighlighted(false)
			setDiscount(0)
			setStocks([])
			setVisibility?.(false)
		}
	}, [isUpdateSuccess, isCreationSuccess])

	useEffect(() => {
		if (!variant) {
			setPrice(0)
			setBasePrice(0)
			setColor(undefined)
			setDiscount(0)
			setHighlighted(false)
			setStocks([])
			return
		}
		setPrice(variant.price)
		setBasePrice(variant.basePrice)
		setDiscount(calculateDiscount(variant.basePrice, variant.price))
		setColor(variant.color)
		setHighlighted(variant.highlighted)
		setStocks(variant.stocks)
	}, [hidden])

	useEffect(() => {
		setPrice(calculatePrice(basePrice, discount))
	}, [basePrice, discount])

	const calculateDiscount = (basePrice: number, price: number) => {
		return 100 - (100 * price / basePrice)
	}

	const calculatePrice = (basePrice: number, discount: number) => {
		return basePrice - (basePrice * discount) / 100 || 0
	}

	const handleBasePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setBasePrice(parseFloat(e.target.value))
	}

	const handleDiscountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setDiscount(parseFloat(e.target.value))
	}

	const handleColorChange = (color?: ColorDto) => {
		setColor(color)
	}

	const handleHighlightedChange = () => {
		setHighlighted(!highlighted)
	}

	const handleStockChange = (stock: StockDto, e: React.ChangeEvent<HTMLInputElement>) => {
		const oldStocks = [...stocks]
		const targetStock = oldStocks.find((s) => s.id === stock.id)
		if (!targetStock) return
		targetStock.quantity = parseInt(e.target.value)
		setStocks(oldStocks)
	}

	const handleCancelClick = () => {
		setVisibility?.(false)
	}

	const isConfirmButtonDisabled =
		!price || !basePrice || !color || isCreationLoading || isUpdateLoading

	return (
		<div className={'variant-modal'}>
			<p className='title'>{isEdit ? 'Editar Variante' : 'Adicionar Variante'}</p>
			<Input label='PREÇO BASE' type='number' value={basePrice} onChange={handleBasePriceChange} />
			<div className='discount-range-input'>
				<div className='discount-display'>
					<p>Desconto</p>
					<p className='value'>{discount.toFixed(2)}%</p>
				</div>
				<RangeInput value={discount} min={0} max={100} step={0.1} onChange={handleDiscountChange} />
				<p>Preço Final</p>
				<p className='value'>R${price.toFixed(2)}</p>
			</div>
			<SelectInput
				value={color?.name}
				autoCompletion={colors.map((color) => ({ label: color.name, value: color }))}
				onSelectItem={handleColorChange}
				label='COR'
				required
			/>
			<div className='highlight-input'>
				<p className='emoji'>⭐</p>
				<CheckBox
					required={true}
					className='input'
					checked={highlighted}
					onChange={handleHighlightedChange}
				/>
				<p>Destacar produto?</p>
			</div>

			{isEdit && (
				<div className='size-stock-content'>
					{stocks.map((stock, index) => (
						<div key={index} className='size-stock'>
							<SizeViewer>{stock.size}</SizeViewer>
							<input
								className='stock-input'
								type={'number'}
								value={stock.quantity}
								onChange={(e) => handleStockChange(stock, e)}
							/>
						</div>
					))}
				</div>
			)}

			<div className='buttons'>
				<Button type='danger' onClick={handleCancelClick}>
					CANCELAR
				</Button>
				{isCreationLoading || isUpdateLoading ? (
					<div className='loader-container'>
						<Loader />
					</div>
				) : (
					<Button
						type='primary'
						onClick={isEdit ? updateMutate : creationMutate}
						disabled={isConfirmButtonDisabled}
					>
						{isEdit ? 'EDITAR' : 'CRIAR'}
					</Button>
				)}
			</div>
		</div>
	)
}

export default VariantModal

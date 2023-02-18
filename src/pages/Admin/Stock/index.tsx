import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
	useProductVariantDeleteMutation,
	useProductVariantUpdateMutation
} from '../../../api/admin/product/mutations'
import { useGetProduct, useGetProductVariants } from '../../../api/admin/product/queries'
import Button from '../../../components/Button'
import ColorViewer from '../../../components/ColorViewer'
import ConfirmationModal from '../../../components/ConfirmationModal'
import Gradient from '../../../components/Gradient'
import IconButton from '../../../components/IconButton'
import Loader from '../../../components/Loader'
import SizeViewer from '../../../components/SizeViewer'
import TextButton from '../../../components/TextButton'
import { ProductDto } from '../../../dtos/Product'
import { VariantDto } from '../../../dtos/Variant'
import { useBackground } from '../../../providers/Background/BackgroundProvider'
import { useModal } from '../../../providers/Modal/ModalProvider'
import IMAGES from '../../../utils/constants/images'
import PAGES from '../../../utils/constants/pages'
import VariantImageModal from './components/VariantImageModal'
import VariantModal from './components/VariantModal'
import './index.scss'

const Stock: React.FC = () => {
	const navigate = useNavigate()
	const { setVisibility, setModalContent } = useModal()
	const { setGradientWith } = useBackground()
	const [editingVariantId, setEditingVariantId] = useState<number>(-1)
	const [idToDelete, setIdToDelete] = useState<number | undefined>()
	const [variantToToggle, setVariantToToggle] = useState<VariantDto>()
	const [productId, setProductId] = useState<number>()
	const [product, setProduct] = useState<ProductDto>()
	const [variants, setVariants] = useState<VariantDto[]>([])
	const { productId: productIdParam } = useParams()
	const { isLoading: isProductLoading, data } = useGetProduct(productId)
	const { isLoading: isVariantsLoading, data: variantsData } = useGetProductVariants(productId)
	const { isLoading: isDeleteLoading, mutate: deleteMutate } = useProductVariantDeleteMutation()
	const { isLoading: isUpdateLoading, mutate: updateMutate } = useProductVariantUpdateMutation(
		productId || 0,
		variantToToggle?.id || 0,
		{
			active: !variantToToggle?.active
		}
	)



	useEffect(() => {
		if (productIdParam) setProductId(parseInt(productIdParam))
	}, [productIdParam])

	useEffect(() => {
		if (!data) return
		setGradientWith?.(data.collection.highlightColorHex)
		setProduct(data)
	}, [data])

	useEffect(() => {
		if (!variantsData) return
		setVariants(variantsData)
	}, [variantsData])

	useEffect(() => {
		if (!idToDelete) return
		deleteMutate({ productId: productId || 0, variantId: idToDelete })
	}, [idToDelete])

	useEffect(() => {
		if (!variantToToggle) return
		updateMutate()
	}, [variantToToggle])

	const onAddClick = () => {
		if (!productId) return
		setModalContent?.(<VariantModal productId={productId} />)
		setVisibility?.(true)
	}

	const onImageClick = (variant: VariantDto) => {
		if (!productId) return
		setModalContent?.(<VariantImageModal productId={productId} variant={variant} />)
		setVisibility?.(true)
	}

	const onEditClick = (variant: VariantDto) => {
		if (!productId) return
		setModalContent?.(<VariantModal productId={productId} variant={variant} isEdit />)
		setVisibility?.(true)
	}

	const onDeleteClick = (variant: VariantDto) => {
		setModalContent?.(
			<ConfirmationModal
				title='Deletar variante?'
				text={`Tem certeza que deseja deletar a variante ${variant.color.name} do produto ${product?.name}?`}
				confirmHandler={() => setIdToDelete(variant.id)}
			/>
		)
		setVisibility?.(true)
	}

	const onToggleVisibilityClick = (variant: VariantDto) => {
		setModalContent?.(
			<ConfirmationModal
				title={variant.active ? 'Desativar variante?' : 'Ativar variante?'}
				text={
					variant.active
						? 'Ao desativar, o produto não será mais visível ao público no ecommerce.'
						: 'Tem certeza de que deseja tornar este produto visível ao público do ecommerce?'
				}
				confirmHandler={() => setVariantToToggle(variant)}
			/>
		)
		setVisibility?.(true)
	}

	const onBackClick = () => {
		navigate(PAGES.adminProduct)
	}

	const isAddButtonDisabled = isProductLoading || isVariantsLoading || isUpdateLoading

	return (
		<div className='stock-dashboard-container'>
			<Gradient />
			<div className='content'>
				<TextButton type='secondary' onClick={onBackClick}>
					VOLTAR
				</TextButton>
				<p className='title'>Estoque</p>
				<div className='row-wrapper'>
					<div className='variant-list'>
						{isVariantsLoading || isDeleteLoading || isUpdateLoading ? (
							<Loader />
						) : variants.length <= 0 ? (
							<p>Nenhuma variante encontrada...</p>
						) : (
							variants.map((variant, index) => (
								<div
									key={index}
									className={`variant-list-item ${
										editingVariantId === variant.id ? 'editing' : ''
									}`}
								>
									<div className='left-content'>
										<div className='main-image-container' onClick={() => onImageClick(variant)}>
											<img
												className='main-image'
												src={
													variant.images.find((img) => img.isMain)?.image.url ||
													IMAGES.imagePlaceholder
												}
											/>
											<div className='image-overlay'>
												<img src={IMAGES.editIcon} />
											</div>
										</div>
										<div className='variant-color-content'>
											<ColorViewer hex={variant.color.hex} />
											<p>{variant.color.name}</p>
										</div>
									</div>

									<div className='price-content'>
										<p className='price-title'>Preço</p>
										{variant.basePrice !== variant.price ? (
											<>
												<p className='line-through'>R${variant.basePrice.toFixed(2)}</p>
												<p>R${variant.price.toFixed(2)}</p>
											</>
										) : (
											<p>R${variant.basePrice.toFixed(2)}</p>
										)}
									</div>

									<div className='size-stock-content'>
										{variant.stocks.map((stock, index) => (
											<div key={index} className='size-stock'>
												<SizeViewer>{stock.size}</SizeViewer>
												<p>{stock.quantity}</p>
											</div>
										))}
									</div>

									<div className='buttons-container'>
										<IconButton onClick={() => onToggleVisibilityClick(variant)}>
											<img src={variant.active ? IMAGES.globeIcon : IMAGES.visibilityOffIcon} />
										</IconButton>
										<IconButton onClick={() => onEditClick(variant)}>
											<img
												src={editingVariantId === variant.id ? IMAGES.saveIcon : IMAGES.editIcon}
											/>
										</IconButton>
										<IconButton onClick={() => onDeleteClick(variant)}>
											<img src={IMAGES.trashIcon} />
										</IconButton>
									</div>
								</div>
							))
						)}
					</div>
					<div className='product-detail'>
						<div className='product-detail-header'>
							<p className='product-name'>{product?.name}</p>
							<p className='product-category'>{product?.category.name}</p>
							<p>{product?.description}</p>
						</div>
						<div className='product-detail-statistics'>
							<p>Total de variantes: {variants.length}</p>
							<p>
								Total de items no estoque:{' '}
								{variants.reduce(
									(prev, current) =>
										prev +
										current.stocks.reduce(
											(stockPrev, stockCurrent) => stockPrev + stockCurrent.quantity,
											0
										),
									0
								)}
							</p>
							<p>
								Valor do estoque: R$
								{variants
									.reduce(
										(prev, current) =>
											prev +
											current.stocks.reduce(
												(stockPrev, stockCurrent) =>
													stockPrev + stockCurrent.quantity * current.price,
												0
											),
										0
									)
									.toFixed(2)}
							</p>
						</div>
						<div className='buttons'>
							<Button type='primary' onClick={onAddClick} disabled={isAddButtonDisabled}>
								+ ADICIONAR
							</Button>
						</div>
					</div>
				</div>
			</div>

		</div>
	)
}

export default Stock

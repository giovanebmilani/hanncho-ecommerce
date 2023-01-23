import './index.scss'
import React, { ReactNode, useEffect, useState } from 'react'
import { VariantDto, VariantImageDto } from '../../../../../dtos/Variant'
import { useGetVariantImages } from '../../../../../api/admin/product/queries'
import Loader from '../../../../../components/Loader'
import IMAGES from '../../../../../utils/constants/images'
import IconButton from '../../../../../components/IconButton'
import Button from '../../../../../components/Button'
import {
	useProductVariantImageDeleteMutation,
	useProductVariantImageHighlightMutation
} from '../../../../../api/admin/product/mutations'

export interface VariantImageGalleryProps {
	productId: number
	variant: VariantDto
}

export const VariantImageGallery: React.FC<VariantImageGalleryProps> = ({ productId, variant }) => {
	const [images, setImages] = useState<VariantImageDto[]>([])
	const [expandedImage, setExpandedImage] = useState<VariantImageDto>()
	const { isLoading, data } = useGetVariantImages(productId, variant.id)
	const {
		isLoading: isDeleleLoading,
		mutate: deleteMutate,
		isSuccess: isDeleteSuccess
	} = useProductVariantImageDeleteMutation()
	const { isLoading: isHighlightImageLoading, mutate: highlighteImageMutate } =
		useProductVariantImageHighlightMutation()

	useEffect(() => {
		if (!data) return
		setImages(data)
	}, [data])

	useEffect(() => {
		if(isDeleteSuccess) onCloseClick()
	}, [isDeleteSuccess])

	const onImageClick = (image: VariantImageDto) => {
		setExpandedImage(image)
	}

	const onHighlightClick = () => {
		if (!expandedImage) return
		highlighteImageMutate({ productId, variantId: variant.id, imageId: expandedImage.id })
	}

	const onDeleteClick = () => {
		if (!expandedImage) return
		deleteMutate({ productId, variantId: variant.id, imageId: expandedImage.id })
	}

	const onCloseClick = () => {
		setExpandedImage(undefined)
	}

	return (
		<div className={'image-gallery-container'}>
			{isLoading ? (
				<Loader />
			) : images.length <= 0 ? (
				<p>Nenhuma imagem</p>
			) : (
				<div className='gallery-grid'>
					{images.map((img, index) => (
						<div
							key={index}
							className={`image-item ${img.isMain && 'highlighted'}`}
							onClick={() => onImageClick(img)}
						>
							<img className='image' src={img.image.url} />
							<div className='image-overlay'>
								<img src={IMAGES.viewIcon} />
							</div>
						</div>
					))}
				</div>
			)}
			<div className={`expanded-image ${expandedImage ? 'active' : ''}`}>
				<img src={expandedImage?.image.url || ''} />
				<div className='buttons'>
					<Button type='danger' onClick={onCloseClick}>
						FECHAR
					</Button>
					{isDeleleLoading ? (
						<div className='loader-container'>
							<Loader />
						</div>
					) : (
						<Button type='danger' onClick={onDeleteClick}>
							EXCLUIR IMAGEM
						</Button>
					)}
					{isHighlightImageLoading ? (
						<div className='loader-container'>
							<Loader />
						</div>
					) : (
						<Button type='primary' onClick={onHighlightClick}>
							TORNAR PRINCIPAL
						</Button>
					)}
				</div>
			</div>
		</div>
	)
}

export default VariantImageGallery

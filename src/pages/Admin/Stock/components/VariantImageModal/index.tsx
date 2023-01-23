import './index.scss'
import React, { ReactNode, useEffect, useState } from 'react'
import { useModal } from '../../../../../providers/Modal/ModalProvider'
import Button from '../../../../../components/Button'
import Loader from '../../../../../components/Loader'
import {
	useProductVariantCreateMutation,
	useProductVariantImageUploadMutation
} from '../../../../../api/admin/product/mutations'
import { VariantDto } from '../../../../../dtos/Variant'
import ImageViewer from '../../../../../components/ImageViewer'
import { ImageDto } from '../../../../../dtos/Image'

export interface VariantImageModalProps {
	productId: number
	variant: VariantDto
}

export const VariantImageModal: React.FC<VariantImageModalProps> = ({ productId, variant }) => {
	const { hidden, setVisibility } = useModal()
	const [images, setImages] = useState<ReactNode[]>([])
	const {
		isLoading: isCreationLoading,
		isSuccess: isCreationSuccess,
		mutate: uploadMutate
	} = useProductVariantImageUploadMutation(productId, variant.id)

	useEffect(() => {
		if (isCreationSuccess) {
			setImages([])
			setVisibility?.(false)
		}
	}, [isCreationSuccess])

	useEffect(() => {
		if (!variant) {
			setImages([])
			return
		}
		setImages(variant.images.map((img, index) => <img key={index} src={img.image.url} />))
		// setImages(variant.images.map((img) => img.image))
	}, [hidden])

	const handleCancelClick = () => {
		setVisibility?.(false)
	}

	const isConfirmButtonDisabled = isCreationLoading

	return (
		<div className={'variant-image-modal'}>
			<p className='title'>Imagens</p>
			<ImageViewer images={images} />
			<input type='file'  />
			<div className='buttons'>
				<Button type='danger' onClick={handleCancelClick}>
					CANCELAR
				</Button>
				{isCreationLoading ? (
					<div className='loader-container'>
						<Loader />
					</div>
				) : (
					<Button type='primary' onClick={uploadMutate} disabled={isConfirmButtonDisabled}>
						SALVAR
					</Button>
				)}
			</div>
		</div>
	)
}

export default VariantImageModal

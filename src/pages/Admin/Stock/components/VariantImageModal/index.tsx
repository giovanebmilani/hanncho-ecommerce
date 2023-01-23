import './index.scss'
import React, { ReactNode, useEffect, useState } from 'react'
import { useModal } from '../../../../../providers/Modal/ModalProvider'
import Button from '../../../../../components/Button'
import Loader from '../../../../../components/Loader'
import { useProductVariantImageUploadMutation } from '../../../../../api/admin/product/mutations'
import { VariantDto } from '../../../../../dtos/Variant'
import { VariantImageGallery } from '../VariantImageGallery'

export interface VariantImageModalProps {
	productId: number
	variant: VariantDto
}

export const VariantImageModal: React.FC<VariantImageModalProps> = ({ productId, variant }) => {
	const { hidden, setVisibility } = useModal()
	const [uploadedImage, setUploadedImage] = useState<File>()
	// const { isLoading: isImagesLoading, data: imagesData} = useGetVariantImages(productId, variant.id)
	const {
		isLoading: isCreationLoading,
		isSuccess: isCreationSuccess,
		mutate: uploadMutate
	} = useProductVariantImageUploadMutation(productId, variant.id)

	useEffect(() => {
		if (isCreationSuccess) {
			setUploadedImage(undefined)
			// setVisibility?.(false)
		}
	}, [isCreationSuccess])

	useEffect(() => {
		setUploadedImage(undefined)
	}, [hidden])

	useEffect(() => {
		console.log(uploadedImage)
	}, [uploadedImage])

	const handleUpload = () => {
		if (!uploadedImage) return
		const form = new FormData()
		form.append('file', uploadedImage, uploadedImage.name)

		uploadMutate(form)
	}

	const handleAddImage = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) setUploadedImage(e.target.files[0])
	}

	const handleCancelClick = () => {
		setVisibility?.(false)
	}

	const isConfirmButtonDisabled = isCreationLoading || !uploadedImage

	return (
		<div className={'variant-image-modal'}>
			<p className='title'>Imagens</p>
			<VariantImageGallery variant={variant} productId={productId} />
			<input type='file' onChange={handleAddImage} />
			<div className='buttons'>
				<Button type='danger' onClick={handleCancelClick}>
					VOLTAR
				</Button>
				{isCreationLoading ? (
					<div className='loader-container'>
						<Loader />
					</div>
				) : (
					<Button type='primary' onClick={handleUpload} disabled={isConfirmButtonDisabled}>
						ADICIONAR
					</Button>
				)}
			</div>
		</div>
	)
}

export default VariantImageModal

import './index.scss'
import React, { ReactNode, useState } from 'react'
import IMAGES from '../../utils/constants/images'
import IconButton from '../IconButton'

export interface ImageViewerProps {
	images: ReactNode[]
}

export const ImageViewer: React.FC<ImageViewerProps> = ({ images }) => {
	const [currentIndex, setCurrentIndex] = useState<number>(0)

	const goToPrev = () => {
		if (currentIndex - 1 < 0) return setCurrentIndex(images.length - 1)
		setCurrentIndex(currentIndex - 1)
	}

	const goToNext = () => {
		if (currentIndex + 1 >= images.length) return setCurrentIndex(0)
		setCurrentIndex(currentIndex + 1)
	}

	const jumpTo = (index: number) => {
		setCurrentIndex(index)
	}

	return (
		<div className={'image-viewer-container'}>
			<div className='displayed-image'>
				<IconButton onClick={goToPrev}>
					<img className='left-arrow' src={IMAGES.arrowIcon} />
				</IconButton>
				{images.length > 0 ? images[currentIndex] : <img src={IMAGES.imagePlaceholder} />}
				<IconButton onClick={goToNext}>
					<img className='right-arrow' src={IMAGES.arrowIcon} />
				</IconButton>
			</div>
			<div className='image-list'>
				{images.map((image, index) => (
					<div key={index} className='image-list-item' onClick={() => jumpTo(index)}>
						{image}
					</div>
				))}
			</div>
		</div>
	)
}

export default ImageViewer

import React from 'react'
import ContentLoader from 'react-content-loader'
// import './index.scss'

const ProductCardPlaceholder: React.FC = () => {
	return (
		<ContentLoader
			className='product-card-place-holder'
			speed={2}
			// width={300}
			height={900}
			// viewBox='0 0 400 160'
			backgroundColor='#1b1b1b'
			foregroundColor='#1f1f1f'
			style={{ minWidth: 'max(16rem, 20vw)', maxWidth: 'max(16rem, 20vw)' }}
		>
			<rect x='5' y='330' rx='10' width='210' height='15' />
			<rect x='5' y='5' rx='20' width='280' height='311' />
			<rect x='5' y='360' rx='10' width='100' height='15' />
		</ContentLoader>
	)
}

export default ProductCardPlaceholder

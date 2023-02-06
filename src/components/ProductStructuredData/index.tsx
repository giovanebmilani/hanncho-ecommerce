import React from 'react'
import { PublicProductDto, PublicProductListDto } from '../../dtos/Product'

export interface ProductStructuredDataProps {
	product: PublicProductDto | PublicProductListDto
}

const ProductStructureData: React.FC<ProductStructuredDataProps> = ({ product }) => {
	return (
		<script type='application/ld+json'>
			{JSON.stringify({
				'@context': 'https://schema.org/',
				'@type': 'Product',
				name: product.name,
				image: product.images.map((img) => img.url),
				description: product.description,
				// sku: '0446310786',
				// mpn: '925872',
				brand: {
					'@type': 'Brand',
					name: 'Hanncho'
				},
				offers: {
					'@type': 'Offer',
					url: `https://hannchoclothing.com/produto/${product.id}`,
					priceCurrency: 'BRL',
					price: product.price.toFixed(2),
					itemCondition: 'https://schema.org/NewCondition',
					availability: 'https://schema.org/InStock'
				}
				// review: {
				// 	'@type': 'Review',
				// 	reviewRating: {
				// 		'@type': 'Rating',
				// 		ratingValue: '4',
				// 		bestRating: '5'
				// 	},
				// 	author: {
				// 		'@type': 'Person',
				// 		name: 'Fred Benson'
				// 	}
				// },
				// aggregateRating: {
				// 	'@type': 'AggregateRating',
				// 	ratingValue: '4.4',
				// 	reviewCount: '89'
				// },
			})}
		</script>
	)
}

export default ProductStructureData

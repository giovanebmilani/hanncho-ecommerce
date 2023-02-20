import './index.scss'
import { useNavigate } from 'react-router-dom'
import IconButton from '../IconButton'
import IMAGES from '../../utils/constants/images'
import { useGetAllCategories } from '../../api/admin/category/queries'
import { useGetAllCollections } from '../../api/admin/collection/queries'
import { useEffect, useState } from 'react'
import { CollectionDto } from '../../dtos/Collection'
import { CategoryDto } from '../../dtos/Category'
import TextButton from '../TextButton'
import PAGES from '../../utils/constants/pages'

const Footer: React.FC = () => {
	const navigate = useNavigate()
	const [collections, setCollections] = useState<CollectionDto[]>([])
	const [categories, setCategories] = useState<CategoryDto[]>([])
	const { data: categoriesData } = useGetAllCategories()
	const { data: collectionsData } = useGetAllCollections()

	useEffect(() => {
		if (!categoriesData) return
		setCategories(categoriesData)
	}, [categoriesData])

	useEffect(() => {
		if (!collectionsData) return
		setCollections(collectionsData)
	}, [collectionsData])

	const handleItemClick = (url: string) => {
		navigate(url)
		window.scrollTo({ top: 0, behavior: 'smooth' })
	}

	return (
		<div className={'footer'}>
			<div className='content-list'>
				<p className='title'>PRODUTOS</p>
				{categories.map((cat, index) => (
					<TextButton
						onClick={() => handleItemClick(PAGES.shop + `?product.categoryId=${cat.id}`)}
						type='secondary'
						key={index}
					>
						{cat.name}
					</TextButton>
				))}
			</div>
			<div className='content-list'>
				<p className='title'>COLEÇÕES</p>
				{collections.map((col, index) => (
					<TextButton
						onClick={() => handleItemClick(PAGES.shop + `?product.collectionId=${col.id}`)}
						type='secondary'
						key={index}
					>
						{col.name}
					</TextButton>
				))}
			</div>
			<div className='content-list'>
				<p className='title'>SIGA-NOS</p>
				<IconButton onClick={() => window.open('https://www.instagram.com/hanncho_/')}>
					<img src={IMAGES.social.instagram} />
				</IconButton>
				<IconButton onClick={() => window.open('https://www.facebook.com/hanncho.clothing')}>
					<img src={IMAGES.social.facebook} />
				</IconButton>
				<IconButton
					onClick={() => window.open('https://www.tiktok.com/@hannchoclothing?_t=8a2hMEqUfmn&_r=1')}
				>
					<img src={IMAGES.social.tiktok} />
				</IconButton>
				<IconButton onClick={() => window.open('https://twitter.com/Hannchoclothing')}>
					<img src={IMAGES.social.twitter} />
				</IconButton>
			</div>
		</div>
	)
}

export default Footer

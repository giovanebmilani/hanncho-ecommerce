import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGetAllCategories } from '../../../api/admin/category/queries'
import { useProductDeleteMutation } from '../../../api/admin/product/mutations'
import { useGetAllProducts } from '../../../api/admin/product/queries'
import Input from '../../../components/Input'
import Button from '../../../components/Button'
import ConfirmationModal from '../../../components/ConfirmationModal'
import IconButton from '../../../components/IconButton'
import Loader from '../../../components/Loader'
import SelectInput from '../../../components/SelectInput'
import TextButton from '../../../components/TextButton'
import { CategoryDto } from '../../../dtos/Category'
import { ProductDto } from '../../../dtos/Product'
import { useModal } from '../../../providers/Modal/ModalProvider'
import IMAGES from '../../../utils/constants/images'
import PAGES from '../../../utils/constants/pages'
import ProductModal from './components/ProductModal'
import './index.scss'
import { CollectionDto } from '../../../dtos/Collection'
import { useGetAllCollections } from '../../../api/admin/collection/queries'

const ProductDashboard: React.FC = () => {
	const navigate = useNavigate()
	const [products, setProducts] = useState<ProductDto[]>([])
	const [idToDelete, setIdToDelete] = useState<number | undefined>()
	const [page, setPage] = useState<number>(1)
	const [name, setName] = useState<string | undefined>()
	const [categories, setCategories] = useState<CategoryDto[]>([])
	const [category, setCategory] = useState<CategoryDto>()
	const [collections, setCollections] = useState<CollectionDto[]>([])
	const [collection, setCollection] = useState<CollectionDto | null>()
	const { setModalContent, setVisibility } = useModal()
	const { data: categoriesData } = useGetAllCategories()
	const { data: collectionsData } = useGetAllCollections()
	const { isLoading, data } = useGetAllProducts(
		{ collectionId: collection?.id || null, categoryId: category?.id, name: { contains: name } },
		page,
		8
	)
	const { isLoading: isDeleteLoading, mutate: deleteMutate } = useProductDeleteMutation()

	useEffect(() => {
		setPage(1)
	}, [category, name])

	useEffect(() => {
		if (!categoriesData) return
		setCategories([{ id: -1, name: 'TODAS' }, ...categoriesData])
	}, [categoriesData])

	useEffect(() => {
		if (!collectionsData) return
		setCollections([
			{ id: -1, name: 'NENHUMA', description: '', highlightColorHex: '' },
			...collectionsData
		])
	}, [collectionsData])

	useEffect(() => {
		if (!data) return
		setProducts(data.data)
	}, [data])

	useEffect(() => {
		if (!idToDelete) return
		deleteMutate(idToDelete)
	}, [idToDelete])

	const handleCategoryChange = (cat?: CategoryDto) => {
		if (cat?.id === -1) return setCategory(undefined)
		setCategory(cat)
	}

	const handleCollectionChange = (col?: CollectionDto) => {
		if (col?.id === -1) return setCollection(null)
		setCollection(col)
	}

	const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setName(e.target.value)
	}

	const onAddClick = () => {
		setModalContent?.(<ProductModal />)
		setVisibility?.(true)
	}

	const onEditClick = (product: ProductDto) => {
		setModalContent?.(<ProductModal product={product} isEdit />)
		setVisibility?.(true)
	}

	const onDeleteClick = (product: ProductDto) => {
		setModalContent?.(
			<ConfirmationModal
				title='Deletar produto?'
				text={`Tem certeza que deseja deletar o produto ${product.name}?`}
				confirmHandler={() => setIdToDelete(product.id)}
			/>
		)
		setVisibility?.(true)
	}

	const onDetailClick = (product: ProductDto) => {
		navigate(PAGES.stock(product.id))
	}

	const onBackClick = () => {
		navigate(PAGES.admin)
	}

	const previousPage = () => {
		setPage((prev) => {
			if (prev - 1 > 0) return prev - 1
			return prev
		})
	}

	const nextPage = () => {
		setPage((prev) => {
			if (data?.total && page * 8 < data?.total) return prev + 1
			return prev
		})
	}

	const isAddButtonDisabled = isLoading || isDeleteLoading

	return (
		<div className='product-dashboard-container'>
			<div className='content'>
				<TextButton type='secondary' onClick={onBackClick}>
					VOLTAR
				</TextButton>
				<p className='title'>Produtos</p>

				<div className='row-wrapper'>
					<div className='product-list'>
						{isLoading || isDeleteLoading ? (
							<Loader />
						) : products.length <= 0 ? (
							<p>Nenhum resultado encontrado...</p>
						) : (
							products.map((product, index) => (
								<div key={index} className='product-list-item'>
									<div className='left-content'>
										<p>{product.id}</p>
										<p className='long-text'>{product.name}</p>
									</div>
									<div className='middle-content'>
										<p>{product.category.name}</p>
									</div>
									<div className='right-content'>
										<IconButton onClick={() => onEditClick(product)} helperLabel='Editar'>
											<img src={IMAGES.editIcon} />
										</IconButton>
										<IconButton onClick={() => onDeleteClick(product)} helperLabel='Excluir'>
											<img src={IMAGES.trashIcon} />
										</IconButton>
										<IconButton onClick={() => onDetailClick(product)} helperLabel='Visualizar'>
											<img src={IMAGES.viewIcon} />
										</IconButton>
									</div>
								</div>
							))
						)}
					</div>
					<div className='buttons'>
						<Button type='primary' onClick={onAddClick} disabled={isAddButtonDisabled}>
							+ ADICIONAR
						</Button>
						<Input label='NOME' value={name} onChange={handleNameChange} />
						<SelectInput
							value={category?.name}
							autoCompletion={categories.map((cat) => ({ label: cat.name, value: cat }))}
							onSelectItem={handleCategoryChange}
							label='CATEGORIAS'
						/>
						<SelectInput
							value={collection?.name}
							autoCompletion={collections.map((col) => ({ label: col.name, value: col }))}
							onSelectItem={handleCollectionChange}
							label='COLEÇÕES'
						/>
					</div>
				</div>
				<div className='pagination-buttons'>
					<TextButton type='secondary' onClick={previousPage}>
						ANTERIOR
					</TextButton>
					<p>{page}</p>
					<TextButton type='secondary' onClick={nextPage}>
						PRÓXIMA
					</TextButton>
				</div>
			</div>
		</div>
	)
}

export default ProductDashboard

import './index.scss'

const Home: React.FC = () => {
	return (
		<div className='home-container'>
			<div className='sale-image-container'>
				<img src={process.env.PUBLIC_URL + './assets/hanncho-sale.png'} />
			</div>

			<div className='content'>HOME</div>
		</div>
	)
}

export default Home

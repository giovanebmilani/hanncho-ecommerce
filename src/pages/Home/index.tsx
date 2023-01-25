import ConcreteBeam from '../../components/ConcreteBeam'
import IMAGES from '../../utils/constants/images'
import './index.scss'

const Home: React.FC = () => {
	return (
		<div className='home-container'>
			<div className='images-container'>
				<div className='sale-image-container'>
					<img src={process.env.PUBLIC_URL + './assets/hanncho-sale.png'} />
				</div>
				<ConcreteBeam />
			</div>

			<div className='highlighted-products'>
				<p className='title'>Destaques</p>
			</div>

			<div className='hanncho-info'>
				<div className='text-container'>
					<p className='title'>Conheça a Hanncho</p>
					<p className='text'>
						A Hanncho Clothing é uma marca de roupas cujo nome é inspirado na cultura urbana
						brasileira. Visite nossa Loja de roupas para apostar em peças super estilosas e
						exclusivos da marca.
					</p>
				</div>
				{/* <img className='image' src={IMAGES.knowHannchoImage}/> */}
			</div>
		</div>
	)
}

export default Home

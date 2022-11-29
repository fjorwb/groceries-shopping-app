import { Modal } from './Modal'
import { useModal } from '../Hooks/useModal'

export const Modals = () => {
	const [isOpen1, openModal1, closeModal1] = useModal(false)
	const [isOpen2, openModal2, closeModal2] = useModal(false)

	return (
		<div>
			<h2>Modals</h2>
			<button onClick={openModal1}> Modal 1</button>
			<Modal isOpen={isOpen1} closeModal={closeModal1}>
				<br />
				<h3>Modal 1</h3>
				<p>This is modal 1 content</p>
				<br />
				<img src="http://www.placeimg.com/200/200/animals" alt="animals" />
			</Modal>
			<button onClick={openModal2}> Modal 2</button>
			<Modal isOpen={isOpen2} closeModal={closeModal2}>
				<br />
				<h3>Modal 2</h3>
				<p>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos alias tenetur soluta
					assumenda, repellendus mollitia possimus delectus nisi vitae explicabo et suscipit
					quibusdam omnis debitis porro ab officiis impedit aut beatae! Optio est eos sequi
					explicabo vero, reiciendis veniam tempora atque illo veritatis omnis voluptates.
					Voluptatibus amet illo recusandae eum.
				</p>
				<br />
				<img src="http://www.placeimg.com/200/200/nature" alt="nature" />
			</Modal>
			<br />
		</div>
	)
}

export default Modals

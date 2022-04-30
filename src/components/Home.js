
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";

const Home = (props) => {
	// const { msgAlert, user } = props
	console.log('props in home', props)

	return (
		<>
			<h1 className='home-page-title'>Greetings Traveler</h1>
			<h4 className='home-page-subtitle'>Where should we start today?</h4>
			<Link to="/addExpense">
  				<Button className='app-select-button' id='button2'>Add Expense</Button>
			</Link>
			<Link to="/addDeposit">
  				<Button className='app-select-button' id='button1'>Add Deposit</Button>
			</Link>
			<h4 id='or'>Or</h4>
			<Link to="/expenses">
  				<Button className='app-select-button' id='button3'>View Budget Overview</Button>
			</Link>

			

			
{/* <button className='app-select-button' id='button3'>View Budget Overview</button>
<button className='app-select-button' id='button1'>Get Paid!</button>
<button className='app-select-button' id='button2'>Add Expense</button> */}

	</>
	)
}

export default Home

import { Link, Route } from 'react-router-dom'

function Navbar() {
  return (
    <div className='navbar'>
      <h1>GuitarFinder</h1>
      <h1>Home</h1>
      <input type='text' placeholder='Search Gear'></input>
      <h1>Login</h1>
      <h1>Register</h1>
    </div>
  )
}

export default Navbar

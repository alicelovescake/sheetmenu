import { NavLink, routes } from '@redwoodjs/router'

const Logo = () => {
  return (
    <NavLink to={routes.home()} className="text-green-800 text-2xl">
      <span>sheet</span>
      <span className="font-extrabold">menu</span>
    </NavLink>
  )
}

export default Logo

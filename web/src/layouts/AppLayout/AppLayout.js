import { useAuth } from '@redwoodjs/auth'
import { navigate, NavLink, routes } from '@redwoodjs/router'

const AppLayout = ({ children }) => {
  const { loading, isAuthenticated, logIn, logOut } = useAuth()

  if (loading) {
    return null
  }

  async function handleAuth() {
    if (isAuthenticated) {
      await logOut()
      navigate('/')
    } else {
      await logIn()
    }
  }

  return (
    <>
      <nav className="max-w-6xl mx-auto p-4 flex justify-between items-center">
        <NavLink to={routes.home()} className="text-green-800 text-2xl">
          <span>sheet</span>
          <span className="font-extrabold">menu</span>
        </NavLink>

        <div>
          <button onClick={handleAuth}>
            {isAuthenticated ? 'Log out' : 'Log in'}
          </button>
        </div>
      </nav>

      {children}
    </>
  )
}

export default AppLayout

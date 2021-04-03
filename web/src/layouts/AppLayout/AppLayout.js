import { useAuth } from '@redwoodjs/auth'
import { navigate } from '@redwoodjs/router'

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
      <header>
        <nav>
          <button onClick={handleAuth}>
            {isAuthenticated ? 'Log out' : 'Log in'}
          </button>
        </nav>
      </header>
      {children}
    </>
  )
}

export default AppLayout

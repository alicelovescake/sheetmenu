import { useAuth } from '@redwoodjs/auth'
import {
  navigate,
  Redirect,
  routes,
  useLocation,
  Link,
} from '@redwoodjs/router'

import Logo from 'src/components/Logo'

const AppLayout = ({ children }) => {
  const { loading, isAuthenticated, logIn, logOut, currentUser } = useAuth()
  const { pathname } = useLocation()

  const requiresOnboarding =
    currentUser && !currentUser?.onboarded && pathname !== routes.onboard()

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
  console.log(currentUser)
  return (
    <>
      {requiresOnboarding ? (
        <Redirect to={routes.onboard()} />
      ) : (
        <>
          <nav className="max-w-6xl mx-auto p-4 flex justify-between items-center">
            <Logo />

            <div>
              {currentUser && (
                <button className="bg-green-800 py-2 px-6 text-white rounded-lg hover:opacity-75 mr-4 font-bold">
                  <Link
                    to={routes.restaurant({
                      id: currentUser.restaurantId,
                    })}
                  >
                    View Website
                  </Link>
                </button>
              )}
              <button onClick={handleAuth}>
                {isAuthenticated ? 'Log out' : 'Log in'}
              </button>
            </div>
          </nav>

          {children}
        </>
      )}
    </>
  )
}

export default AppLayout

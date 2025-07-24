import { ColorModeContext, useMode } from './theme'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { Route, Routes, useLocation } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css'
import MainSideBar from './scenes/gobal/MainSideBar'
import Dashboard from './scenes/dashboard'
import Hospitals from './scenes/hospitals'
import ServiceProvider from './scenes/serviceProvider'
import BusinessUsers from './scenes/businessUsers'
import Analytics from './scenes/analytics'
import Profile from './scenes/profile'
import Settings from './scenes/settings'
import { ToastContainer } from 'react-toastify'
import Login from './scenes/login'
import Signup from './scenes/signup'
import PrivateRoute from './components/PrivateRoute'
import ForgetPassword from './scenes/forgetPassword'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import Referrals from './pages/Referrals'
import AddReferral from './pages/AddReferral'
import Subscription from './pages/Subscription'

function App () {
  const [theme, colorMode] = useMode()
  const mode = theme.palette.mode
  const location = useLocation()

  const isLoginRoute = location.pathname === '/login'
  const isSignupRoute = location.pathname === '/signup'

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/forgetpassword' element={<ForgetPassword />} />
        </Routes>

        <div
          className={` ${!isLoginRoute && !isSignupRoute && 'app-container'}`}
          style={{
            background:
              mode === 'light'
                ? 'var(--Final, linear-gradient(116deg, #143056 -4.61%, #418FD2 111.1%), #FFF)'
                : 'linear-gradient(180deg, #000 0%, #5ECB95 100%), #FFF'
          }}
        >
          <div>
            <main className='main-scene'>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <ToastContainer />
                {/* <MainSideBar /> */}
                {!isLoginRoute && !isSignupRoute && <MainSideBar />}

                <Routes>
                  <Route element={<PrivateRoute />}>
                    <Route path='/' element={<Referrals />} />
                    <Route path='/dashboard' element={<Dashboard />} />
                    <Route
                      path='/serviceProvider'
                      element={<ServiceProvider />}
                    />
                    <Route path='/businessUsers' element={<BusinessUsers />} />
                    <Route path='/analytics' element={<Analytics />} />
                    <Route path='/profile' element={<Profile />} />
                    <Route path='/settings' element={<Settings />} />
                    <Route path='/hospitals' element={<Hospitals />} />
                    <Route path='/referrals' element={<Referrals />} />
                    {/* <Route path='/subscription' element={<Subscription />} /> */}
                    {/* <div className='bg-gray-100 min-h-screen p-4'> */}
                      <Route path='/subscription' element={<Subscription />} />
                    {/* </div> */}
                    <Route path='/add-referral/*' element={<AddReferral />} />
                  </Route>
                </Routes>
              </LocalizationProvider>
            </main>
          </div>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  )
}

export default App

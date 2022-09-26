
import {BrowserRouter} from 'react-router-dom'
import { AppRoutes } from './routes/App.routes'

export const App = () => {
  return (
    <BrowserRouter>
      <AppRoutes/>
    </BrowserRouter>
  )
}

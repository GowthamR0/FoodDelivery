import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter as Router } from 'react-router-dom'
import { UserMenuContext } from './Components/Context/UserMenuContext.jsx'
import { AuthContext } from './Components/Context/AuthContext.jsx'
import { CartContext } from './Components/Context/CartContext.jsx'
import { LoaderContext } from './Components/Context/LoaderContext.jsx'
import { SearchQueryContext } from './Components/Context/SearchQueryContext.jsx'
import { SearchRecommedation } from './Components/Context/SearchRecommedation.jsx'
import { LocationContext } from './Components/Context/LocationContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>
    <React.StrictMode>
      <LocationContext>
        <SearchQueryContext>
          <SearchRecommedation>
            <AuthContext>
              <UserMenuContext>
                <LoaderContext>
                  <CartContext>
                    <App />
                  </CartContext>
                </LoaderContext>
              </UserMenuContext>
            </AuthContext>
          </SearchRecommedation>
        </SearchQueryContext>
      </LocationContext>
    </React.StrictMode>
  </Router>
)

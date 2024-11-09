import './App.css'
import ItemConsuming from './Components/ItemConsuming';
import SignUp from './Components/AuthenticationPages/SignUp';
import Login from './Components/AuthenticationPages/Login';
import Items from './Pages/Items';
import { Route, Routes, useLocation } from 'react-router-dom';
import HomeLayout from './Layout/Home.layout';
import AuthLayout from './Layout/Auth.layout';
import HomePage from './Pages/HomePage';
import DeliveryCategory from './Pages/DeliveryCategory';
import ItemsDescription from './Pages/ItemsDescription';
import ItemsDescriptionLayout from './Layout/ItemsDescription.layout';
import AddToCart from './Pages/AddToCart';
import PrivateRoute from './Components/Context/PrivateRoute';
import PaymentPage from './Pages/PaymentPage';
import Checkout from './Pages/Checkout';
import { useAuth } from './Components/Context/AuthContext';
import DeleteAccount from './Pages/DeleteAccount';
import Modal from './Components/Navbar/Modal';
import Loader from './Pages/Loader';
import { useLoader } from './Components/Context/LoaderContext';
import { useEffect, useRef } from 'react';
import Order from './Components/OrderPage/Order';
import { useLocationContext } from './Components/Context/LocationContext';

function App() {

  const { loading, handleLoading } = useLoader();

  const location = useLocation();

  const { locationVal, handleLocation } = useLocationContext();

  useEffect(() => {
    if (location) {
      if (location.pathname !== locationVal.pathName || location.search !== locationVal.search) {
        handleLoading(true);
        handleLocation({ PathName: location.pathname, Search: location.search });
      }
    }
  }, [location]);

  return (
    <div>
      <Routes>
        <Route path="/" exact element={<HomePage />} />
        <Route path="/signup" exact element={<AuthLayout> <SignUp /> </AuthLayout>} />
        <Route path="/login" exact element={<Login />} />
        <Route path="/items" exact element={<Items />} />
        <Route path="/myProfile" exact element={<Modal />} />
        <Route path='/loader' exact element={<Loader />} />
        <Route path='/delivery/cart' exact element={<PrivateRoute />}>
          <Route path='' exact element={<HomeLayout><AddToCart /></HomeLayout>} />
          <Route path="checkout" exact element={<HomeLayout><Checkout /></HomeLayout>} />
        </Route>
        <Route path='/order' exact element={<PrivateRoute />}>
          <Route path='' exact element={<HomeLayout><Order /></HomeLayout>} />
        </Route>
        <Route path='/cart' exact element={<PrivateRoute />} >
          <Route path='payment' exact element={<HomeLayout><PaymentPage /></HomeLayout>} />
        </Route>
        <Route path='/delete' exact element={<PrivateRoute />}>
          <Route path='account' exact element={<HomeLayout><DeleteAccount /></HomeLayout>} />
        </Route>
        <Route path="/:type" exact element={<HomeLayout><ItemConsuming /></HomeLayout>} />
        <Route path="/:type/food" exact element={<HomeLayout><DeliveryCategory /></HomeLayout>} />
        <Route path="/:type/food/:title" exact element={<ItemsDescriptionLayout><ItemsDescription /></ItemsDescriptionLayout>} />
      </Routes>
    </div>
  )
}
export default App;

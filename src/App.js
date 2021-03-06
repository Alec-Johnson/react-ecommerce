import "./main.scss";
import React, { useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { checkUserSession } from "./redux/User/user.actions";

// Components
import AdminTools from "./components/AdminTools";

// Higher order components
import WithAuth from "./hoc/withAuth";
import WithAdmin from "./hoc/withAdmin";

// Layouts
import DefaultLayout from "./layouts/DefaultLayout";
import HomepageLayout from "./layouts/HomepageLayout";
import AdminLayout from "./layouts/AdminLayout";
import DashboardLayout from "./layouts/DashboardLayout";

// Pages
import Homepage from "./pages/Homepage";
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import Recovery from "./pages/Recovery";
import Dashboard from "./pages/Dashboard";
import Admin from "./pages/Admin";
import Shop from "./pages/Shop";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Payment from "./pages/Payment";
import Order from "./pages/Order";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkUserSession());
  }, []);

  return (
    <div className='App' id='App'>
      <AdminTools />
      <Switch>
        <Route
          exact
          path='/'
          render={() => (
            <HomepageLayout>
              <Homepage />
            </HomepageLayout>
          )}
        />
        <Route
          exact // wont match "/search/:filterType" without {exact}
          path='/shop'
          render={() => (
            <DefaultLayout>
              <Shop />
            </DefaultLayout>
          )}
        />
        <Route
          path='/shop/:filterType'
          render={() => (
            <DefaultLayout>
              <Shop />
            </DefaultLayout>
          )}
        />
        <Route
          path='/product/:productID'
          render={() => (
            <DefaultLayout>
              <ProductDetails />
            </DefaultLayout>
          )}
        />
        <Route
          path='/cart'
          render={() => (
            <DefaultLayout>
              <Cart />
            </DefaultLayout>
          )}
        />
        <Route
          path='/payment'
          render={() => (
            <WithAuth>
              <DefaultLayout>
                <Payment />
              </DefaultLayout>
            </WithAuth>
          )}
        />
        <Route
          path='/register'
          render={() => (
            <DefaultLayout>
              <Registration />
            </DefaultLayout>
          )}
        />
        <Route
          path='/login'
          render={() => (
            <DefaultLayout>
              <Login />
            </DefaultLayout>
          )}
        />
        <Route
          path='/recovery'
          render={() => (
            <DefaultLayout>
              <Recovery />
            </DefaultLayout>
          )}
        />

        <Route
          path='/dashboard'
          render={() => (
            <WithAuth>
              <DashboardLayout>
                <Dashboard />
              </DashboardLayout>
            </WithAuth>
          )}
        />
        <Route
          path='/order/:orderID'
          render={() => (
            <WithAuth>
              <DashboardLayout>
                <Order />
              </DashboardLayout>
            </WithAuth>
          )}
        />
        <Route
          path='/admin'
          render={() => (
            <WithAdmin>
              <AdminLayout>
                <Admin />
              </AdminLayout>
            </WithAdmin>
          )}
        />
      </Switch>
    </div>
  );
};

export default App;

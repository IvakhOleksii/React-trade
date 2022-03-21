import React, { lazy } from "react";
import { Router, Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import { ToastContainer } from "react-toastify";
import { history } from "./helpers/history";
import Privacy from "./views/pages/privacy";
import TermsAndCondition from "./views/pages/TermsAndCondition";
import AuctionBidsModal from "./components/AuctionBidsModal";

const Home = lazy(() => import("./views/pages/home"));
const Login = lazy(() => import("./views/pages/login"));
const Registration = lazy(() => import("./views/pages/registration"));
const Contactus = lazy(() => import("./views/pages/contactus"));
const Aboutus = lazy(() => import("./views/pages/aboutus"));
const TradeYourCar = lazy(() => import("./views/pages/tradeYourCar"));
const SellYourCar = lazy(() => import("./views/pages/sellYourCar"));
const CarViewer = lazy(() => import("./views/pages/carViewer"));
const Dashboard = lazy(() => import("./views/pages/dashboard"));
const AuctionDetail = lazy(() => import("./views/pages/auctionDetail"));
class AppRouter extends React.Component {
  render() {
    return (
      <Router basename={window.location.pathname || ""} history={history}>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={true}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        ></ToastContainer>
        <AuctionBidsModal />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Registration} />
          <Route exact path="/contactus" component={Contactus} />
          <Route exact path="/aboutus" component={Aboutus} />
          <Route exact path="/trade-your-car" component={TradeYourCar} />
          <Route exact path="/Sell-your-car" component={SellYourCar} />
          <Route exact path="/car-viewer" component={CarViewer} />
          <Route exact path="/privacy" component={Privacy} />
          <Route
            exact
            path="/terms-and-condition"
            component={TermsAndCondition}
          />
          {this.props.user?.isLogin ? (
            <Switch>
              <Route exact path="/dashboard" component={Dashboard} />
              <Route exact path="/auction-detail" component={AuctionDetail} />
            </Switch>
          ) : (
            ""
          )}
        </Switch>
      </Router>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.app.user,
  };
};
export default connect(mapStateToProps)(AppRouter);

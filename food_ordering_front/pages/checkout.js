import React, { useContext } from "react";

import { Row, Col } from "reactstrap";
import InjectedCheckoutForm from "../components/checkout/CheckoutForm";
import AppContext from "../context/AppContext";

import Cart from "../components/cart";

function Checkout() {
  // get app context
  const appContext = useContext(AppContext);
  // isAuthenticated is passed to the cart component to display order button
  const { isAuthenticated } = appContext;
  return (
    <Row>
      <Col style={{ paddingRight: 0 }} sm={{ size: 3, order: 1, offset: 2 }}>
        <h1 style={{ margin: 20 }}>Checkout</h1>
        <Cart isAuthenticated={isAuthenticated} />
      </Col>
      <Col style={{ paddingLeft: 5 }} sm={{ size: 6, order: 2 }}>
        <InjectedCheckoutForm />
      </Col>
    </Row>
  );
  // }
}
export default Checkout;
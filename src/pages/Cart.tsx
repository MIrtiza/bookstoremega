import Layout from "../Layout/Layout";
import { NavLink } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { Close } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { RootState } from "../redux-store/store";
import {
  removeItem,
  updateItemQuantity,
} from "../redux-store/features/cartSlice";
import React from "react";

const Cart = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.cart);

  const { totalPrice, items = [] } = cart;

  const handleRemoveFromCart = (id: number) => {
    dispatch(removeItem(id));
  };

  const handleQuantityChange = (id: number, newQuantity: number) => {
    if (newQuantity > 0) {
      dispatch(updateItemQuantity({ id, quantity: newQuantity }));
    }
  };
  return (
    <Layout>
      <section className="cartBucketSec">
        <Container>
          <Row className="justify-content-center g-0">
            <Col lg={8}>
              <h2>My Cart</h2>
              <div className="cartInfoWrapper">
                <table className="cartTable">
                  <thead>
                    <tr>
                      <th>Products</th>
                      <th>Price</th>
                      <th>quantity</th>
                      <th colSpan={2}>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items?.length > 0 &&
                      items?.map((data, index) => {
                        const { id, title, price, bookUrl, quantity } =
                          data ?? {};
                        return (
                          <React.Fragment key={index}>
                            <tr style={{ border: 0, height: 15 }}></tr>
                            <tr>
                              <td>
                                <div className="thumbNtitle">
                                  <div className="thumbWrap">
                                    {bookUrl?.length && (
                                      <img src={bookUrl} alt={title} />
                                    )}
                                  </div>
                                  {title?.length && <span> {title} </span>}
                                </div>
                              </td>
                              <td> {price && <span>Rs. {price} </span>}</td>
                              <td>
                                {" "}
                                <div className="quantityInput">
                                  <input
                                    type="number"
                                    value={quantity}
                                    min="1"
                                    onChange={(e) =>
                                      handleQuantityChange(
                                        id!,
                                        Number(e.target.value)
                                      )
                                    }
                                  />
                                </div>
                              </td>
                              <td>{totalPrice}</td>
                              <td>
                                <button
                                  className="btnClose"
                                  onClick={() => handleRemoveFromCart(id!)}
                                >
                                  <Close />
                                </button>
                              </td>
                            </tr>
                            <tr style={{ border: 0, height: 15 }}></tr>
                          </React.Fragment>
                        );
                      })}
                  </tbody>
                </table>
                <div className="orderSummary">
                  <h6>Order Summary</h6>

                  <ul className="sumDetail">
                    <li>
                      <span>Sub Total:</span>
                      <span>Rs. {totalPrice}</span>
                    </li>

                    <li>
                      <span>Total:</span>
                      <span>Rs. {totalPrice}</span>
                    </li>
                  </ul>
                  <div className="navigatedBtns">
                    <NavLink to="/checkout" className="btn btn-purple">
                      Proceed to Checkout
                    </NavLink>

                    <NavLink to="/" className="btn btnWhite">
                      Continue Shopping
                    </NavLink>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </Layout>
  );
};

export default Cart;

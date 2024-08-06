import { Close } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { RootState } from "../redux-store/store";
import {
  removeItem,
  updateItemQuantity,
} from "../redux-store/features/cartSlice";
import { NavLink } from "react-router-dom";

interface CartPopupProps {
  onClose: () => void;
}

const CartPopup: React.FC<CartPopupProps> = ({ onClose }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.cart);

  const { totalQuantity, totalPrice, items = [] } = cart;

  const handleRemoveFromCart = (id: number) => {
    dispatch(removeItem(id));
  };

  const handleQuantityChange = (id: number, newQuantity: number) => {
    if (newQuantity > 0) {
      dispatch(updateItemQuantity({ id, quantity: newQuantity }));
    }
  };

  return (
    <div className="cartPopupContent">
      <div className="cartHead">
        <strong>Your Cart</strong>
        <button className="btnClose" onClick={onClose}>
          <Close /> Close
        </button>
      </div>
      <div className="totalItem">
        <span>
          {cart.items.length > 1
            ? totalQuantity + " items"
            : totalQuantity + " item"}
        </span>
      </div>
      <div className="cartBody">
        {items?.length > 0 &&
          items?.map((data, index) => {
            const { id, title, author, price, bookUrl, quantity } = data ?? {};
            return (
              <div className="itemAdded" key={index}>
                <div className="thumbWrap">
                  {bookUrl?.length && <img src={bookUrl} alt={title} />}
                </div>
                <div className="itemDet">
                  <button
                    className="btnClose"
                    onClick={() => handleRemoveFromCart(id!)}
                  >
                    <Close />
                  </button>

                  {title?.length && <span> {title} </span>}
                  {author?.length && <span> {author} </span>}
                  {price && <span>Rs. {price} </span>}
                  <div className="quantityInput">
                    <input
                      type="number"
                      value={quantity}
                      min="1"
                      onChange={(e) =>
                        handleQuantityChange(id!, Number(e.target.value))
                      }
                    />
                  </div>
                </div>
              </div>
            );
          })}
      </div>
      <div className="cartFoot">
        <div className="totalPrice">
          <span>Total</span>
          <span>Rs. {totalPrice}</span>
        </div>
        <div className="navigatedBtns">
          <NavLink to="/checkout" className="btn btn-purple">
            Check out
          </NavLink>

          <NavLink to="/cart" className="btn btnWhite">
            View Cart
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default CartPopup;

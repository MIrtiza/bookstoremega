import { NavLink } from "react-router-dom";
import Logo from "../assets/Images/smalllogo.png";
import { Image } from "react-bootstrap";
import { useState } from "react";

import {
  TurnedInNot,
  ShoppingCartOutlined,
  ArrowDropDownCircleSharp,
  LayersOutlined,
  Search,
} from "@mui/icons-material";

import { RootState } from "../redux-store/store";
import { useDispatch, useSelector } from "react-redux";
import { setSearchTerm } from "../redux-store/features/searchSlice";
import useDebounce from "../hooks/useDebounce";

interface HeaderProps {
  onCartIconClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const Header: React.FC<HeaderProps> = ({ onCartIconClick }) => {
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState("");

  // const [showNavbar, setShowNavbar] = useState(false);

  // const handleShowNavbar = () => {
  //   setShowNavbar(!showNavbar);
  // };

  const debouncedSearch = useDebounce((value: string) => {
    dispatch(setSearchTerm(value));
  }, 350); // Adjust the delay as needed

  const handleSearch = () => {
    dispatch(setSearchTerm(inputValue));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    debouncedSearch(value);
  };

  const cart = useSelector((state: RootState) => state.cart);
  const savedItems = useSelector((state: RootState) => state.savedItems.items);
  return (
    <nav className="navbar">
      <div className="container">
        <div className="header-wrap">
          <NavLink className="logo" to="/">
            <div className="imgWrap">
              <Image src={Logo} />
            </div>
            <span>BookStores</span>
          </NavLink>

          <div className="search-bar">
            <div className="menudropdown">
              <button className="menubtn">
                <LayersOutlined className="menuIcon" />
                <span>Menu</span>
                <ArrowDropDownCircleSharp className="arrowIcon" />
              </button>
            </div>
            <input
              type="text"
              placeholder="Search Books | Author | Catogory"
              value={inputValue}
              onChange={handleInputChange}
            />
            <button className="searchbtn" onClick={handleSearch}>
              <Search />
            </button>
          </div>

          {/* <div className="menu-icon" onClick={handleShowNavbar}>
            <Hamburger />
          </div> */}

          <div className={`nav-elements`}>
            <ul>
              <li>
                <NavLink to="/saved">
                  <TurnedInNot />
                  <span> {savedItems.length} </span>
                </NavLink>
              </li>

              <li>
                <button onClick={onCartIconClick}>
                  <ShoppingCartOutlined />
                  <span> {cart.totalQuantity} </span>
                </button>
              </li>
              <li>
                <div className="profileWrap">
                  <div
                    className="imgWrap"
                    style={{ backgroundImage: `url(${Logo})` }}
                  />
                  <div className="dropDownProfile"></div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};
// const Hamburger = () => (
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     width="52"
//     height="24"
//     viewBox="0 0 52 24"
//   >
//     <g id="Group_9" data-name="Group 9" transform="translate(-294 -47)">
//       <rect
//         id="Rectangle_3"
//         data-name="Rectangle 3"
//         width="42"
//         height="4"
//         rx="2"
//         transform="translate(304 47)"
//         fill="#574c4c"
//       />
//       <rect
//         id="Rectangle_5"
//         data-name="Rectangle 5"
//         width="42"
//         height="4"
//         rx="2"
//         transform="translate(304 67)"
//         fill="#574c4c"
//       />
//       <rect
//         id="Rectangle_4"
//         data-name="Rectangle 4"
//         width="52"
//         height="4"
//         rx="2"
//         transform="translate(294 57)"
//         fill="#574c4c"
//       />
//     </g>
//   </svg>
// );
export default Header;

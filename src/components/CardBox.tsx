import React from "react";
import { Card, Button } from "react-bootstrap";
import { ProductData } from "../types/homeTypes";
import { TurnedInNot, TurnedIn, ShoppingCart } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux-store/store";

import { addItem } from "../redux-store/features/cartSlice";
import { toggleSavedItem } from "../redux-store/features/saveSlice";
import StarRating from "./StarRating";

interface CardBoxProps {
  product: ProductData;
}
export const CardBox: React.FC<CardBoxProps> = ({ product }) => {
  const {
    title,
    price,
    author,
    bookUrl,
    category,
    ratings = 0,
  } = product ?? {};
  const dispatch = useDispatch();
  const savedItems = useSelector((state: RootState) => state.savedItems.items);
  const isSaved = savedItems.some((item) => item.id === product.id);

  const handleAddToCart = () => {
    dispatch(addItem(product));
  };
  const handleSaveToggle = () => {
    dispatch(toggleSavedItem(product));
  };

  return (
    <>
      <Card className="cardBook">
        <div className="bookBg">
          <Card.Img variant="top" src={bookUrl} alt={title} />

          <div className="pageflip"></div>
        </div>

        <Card.Body>
          <button className="saveIcon" onClick={handleSaveToggle}>
            {isSaved ? (
              <TurnedIn fontSize="small" />
            ) : (
              <TurnedInNot fontSize="small" />
            )}
          </button>
          <h6 className="titleTxt"> {title} </h6>
          <span className="authorTxt">{author}</span>
          <Card.Text>{category}</Card.Text>
          <StarRating ratings={ratings} />
          <span className="priceTxt">Rs. {price}</span>

          <div className="buttonContain">
            <Button className="btn btn-purple" onClick={handleAddToCart}>
              <ShoppingCart style={{ fontSize: 15 }} /> Add to Cart
            </Button>
          </div>
        </Card.Body>
      </Card>
    </>
  );
};

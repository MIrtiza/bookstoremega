import React from "react";
import { Card, Button } from "react-bootstrap";
import { ProductData } from "../types/homeTypes";
import { TurnedInNot, TurnedIn, ShoppingCart } from "@mui/icons-material";
import { useDispatch } from "react-redux";

import { addItem } from "../redux-store/features/cartSlice";
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
    save,
    ratings = 0,
  } = product ?? {};
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addItem(product));
  };

  return (
    <>
      <Card className="cardBook">
        <div className="bookBg">
          <Card.Img variant="top" src={bookUrl} alt={title} />

          <div className="pageflip"></div>
        </div>

        <Card.Body>
          <div className="saveIcon">
            {save ? (
              <TurnedIn fontSize="small" />
            ) : (
              <TurnedInNot fontSize="small" />
            )}
          </div>
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

import React from "react";
import { Card } from "react-bootstrap";
import { ProductData } from "../types/homeTypes";
import { TurnedInNot, TurnedIn } from "@mui/icons-material";

interface CardBoxProps {
  product: ProductData;
}
export const CardBox: React.FC<CardBoxProps> = ({ product }) => {
  const { title, price, author, bookUrl, category, save, ratings } =
    product ?? {};

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
          <h5> {title} </h5>
          <span className="authorTxt">{author}</span>
          <Card.Text>{category}</Card.Text>
          <span className="priceTxt">Rs. {price}</span>

          <Card.Text>{ratings}</Card.Text>
        </Card.Body>
      </Card>
    </>
  );
};

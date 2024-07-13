import React from "react";
import { Card } from "react-bootstrap";
import { ProductData } from "../types/homeTypes";
import { TurnedInNot, TurnedIn } from "@mui/icons-material";

interface CardBoxProps {
  product: ProductData;
}
export const CardBox: React.FC<CardBoxProps> = ({ product }) => {
  const {
    title,
    plot,
    price,
    author,
    bookUrl,
    category,
    images, // this is an array, i want first image set in card.img
    save,
    rating,
  } = product ?? {};

  return (
    <>
      <Card className="cardBook">
        <div className="bookBg">
          <Card.Img variant="top" src={bookUrl} alt={title} />

          <div className="pageflip"></div>
        </div>

        <Card.Body>
          <div className="saveIcon">
            {save ? <TurnedIn /> : <TurnedInNot />}
          </div>
          <Card.Title> {title} </Card.Title>
          <Card.Text>{category}</Card.Text>
          <Card.Text>{rating}</Card.Text>
        </Card.Body>
      </Card>
    </>
  );
};

import React from "react";

const CardImage = ({ card }) => {
  let image;

  if (
    card.card_faces &&
    card.layout !== "split" &&
    card.layout !== "adventure" &&
    card.layout !== "flip"
  ) {
    image = (
      <>
        <img src={card.card_faces[0].image_uris?.normal} alt={card.name} />
        <img src={card.card_faces[1].image_uris?.normal} alt={card.name} />
      </>
    );
  } else {
    image = (
      <>
        <img src={card.image_uris?.normal} alt={card.name} />
      </>
    );
  }
  return image;
};

export default CardImage;

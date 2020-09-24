import React, { useContext } from "react";
import { SanityContext } from "../../context/";
import styles from "./CastingCost.module.css";

const CastingCost = ({ card }) => {
  const { castingCostSort } = useContext(SanityContext);
  let image;

  if (
    card.card_faces &&
    (card.layout === "transform" || card.layout === "modal_dfc")
  ) {
    image =
      card.card_faces[0].mana_cost &&
      castingCostSort(card.card_faces[0].mana_cost)?.map((cardFace) => {
        return cardFace.map((cost, i) => {
          return cost?.src ? <img src={cost.src} alt={cost.alt} key={i} /> : "";
        });
      });
  } else if (
    card.card_faces &&
    card.layout !== "split" &&
    card.layout !== "adventure" &&
    card.layout !== "flip"
  ) {
    image = castingCostSort(card.card_faces[0].mana_cost)?.map((cardFace) => {
      return cardFace.map((cost, i) => (
        <img src={cost.src} alt={cost.alt} key={i} />
      ));
    });
  } else {
    const castingCostSorted = castingCostSort(card.mana_cost);
    image =
      card.mana_cost &&
      castingCostSorted?.map((cardFace, i) => {
        return cardFace.map((cost, j) => {
          const elements = [];
          if (cost?.src) {
            elements.push(<img src={cost.src} alt={cost.alt} key={j} />);

            if (
              j === cardFace.length - 1 &&
              i !== castingCostSorted.length - 1
            ) {
              elements.push(
                <span id={styles.split} key={i}>
                  {"/".repeat(2)}
                </span>
              );
            }
          }
          return elements;
        });
      });
  }
  return <>{image}</>;
};

export default CastingCost;

import React, { useContext } from "react";
import { AppContext, SanityContext } from "../../context/";
import { Link } from "react-router-dom";
import { CastingCost } from "../";
import getCardTypes from "../../utils/GetCardTypes";
import {
  DeckWrapper,
  CardTypeSection,
  CardList,
  CardLine,
  CardCount,
  Cost,
} from "./styled";
import styles from "./CurrentDeck.module.css";

const CurrentDeck = () => {
  const { deckBuild } = useContext(AppContext);
  const { data } = useContext(SanityContext);

  let cardTypes = getCardTypes(deckBuild).sort();

  return (
    <DeckWrapper className={!data ? styles.hidden : ""}>
      {cardTypes?.map((type, i) => {
        let typePresent = deckBuild.filter((card) =>
          card.type_line.includes(type)
        );
        if (type === "Instant" || type === "Sorcery" || type === "Enchantment" || type === "Planeswalker" || type === "Land" || type === "Artifact"){
          typePresent = typePresent.filter(card => !card.type_line.includes("Creature"))
        }
        if (type === "Land"){
          typePresent = typePresent.filter(card => !card.type_line.includes("//"))
        }
        if (typePresent?.length) {
          return (
            <CardTypeSection key={i}>
              <h2>{type}</h2>
              <CardList>
                {typePresent?.sort((a, b) => (a.cmc - b.cmc) - (a.name < b.name)).map((card) => (
                    <CardLine key={card.id}>
                      <CardCount>{card.count}</CardCount>
                      <Link to={`/card/${card.id}`} target="_blank">
                        { (card.layout === "adventure" || card.layout === "transform" || card.layout === "modal_dfc") ? card.name.split("//")[0] : card.name}
                      </Link>
                      <Cost>
                        <CastingCost card={
                          card.layout === "adventure" ? {card_faces:[{mana_cost:card.card_faces[0].mana_cost}], layout:"transform"} : card
                          } />
                      </Cost>
                    </CardLine>
                ))}
              </CardList>
            </CardTypeSection>
          );
        } else {
          return null;
        }
      })}
    </DeckWrapper>
  );
};

export default CurrentDeck;

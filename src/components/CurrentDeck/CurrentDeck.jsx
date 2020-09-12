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
  Cost,
} from "./styled";
import styles from "./CurrentDeck.module.css";

const CurrentDeck = () => {
  const { deckBuild } = useContext(AppContext);
  const { data } = useContext(SanityContext);

  let cardTypes = getCardTypes(deckBuild).sort();

  console.log(cardTypes);
  console.log(deckBuild);
  return (
    <DeckWrapper className={!data ? styles.hidden : ""}>
      {cardTypes?.map((type, i) => {
        const typePresent = deckBuild.filter((card) =>
          card.type_line.includes(type)
        );
        if (typePresent?.length) {
          return (
            <CardTypeSection key={i}>
              <h2>{type}</h2>
              <CardList>
                {typePresent?.sort((a, b) => a.cmc > b.cmc).map((card) => (
                  <Link to={`/card/${card.id}`} target="_blank">
                    <CardLine key={card.id}>
                      <span>{card.count}</span>
                      <span>{card.name}</span>
                      <Cost>
                        <CastingCost card={card} />
                      </Cost>
                    </CardLine>
                  </Link>
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

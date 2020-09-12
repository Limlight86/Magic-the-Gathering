import React, { useContext } from "react";
import { AppContext } from "../../context/";
import { CastingCost } from "../"
import getCardTypes from "../../utils/GetCardTypes";
import { DeckWrapper, CardTypeSection, CardList, CardLine, Cost } from "./styled"

const CurrentDeck = () => {
  const { deckBuild } = useContext(AppContext);

  let cardTypes = getCardTypes(deckBuild).sort();

  console.log(cardTypes);
  console.log(deckBuild);
  return (
    <DeckWrapper>
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
                  <CardLine key={card.id}>
                    <span>{card.count}</span>
                    <span>{card.name}</span>
                    <Cost><CastingCost card={card} /></Cost>
                  </CardLine>
                  ))
                }
              </CardList>
            </CardTypeSection>
          )
        } else {
          return null
        }
      })}
    </DeckWrapper>
  );
};

export default CurrentDeck;

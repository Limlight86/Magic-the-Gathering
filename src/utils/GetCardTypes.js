const getCardTypes = (cards) => {
  let cardTypes = cards.map((card) => {
    if (card.type_line.includes("Creature")) return "Creature";
    if (card.type_line.includes("Enchantment")) return "Enchantment";
    if (card.type_line.includes("Planeswalker")) return "Planeswalker";
    if (card.type_line.includes("Artifact")) return "Artifact";
    if (card.type_line.includes("Instant")) return "Instant";
    if (card.type_line.includes("Sorcery")) return "Sorcery";
    if (card.type_line.includes("Land")) return "Land";
    return card.type_line;
  });
  return [...new Set(cardTypes)].sort();
};

export default getCardTypes;

import { v4 as uuidv4 } from "uuid";
import { LoremIpsum } from "lorem-ipsum";

const ITEMS_PER_PAGE = 20;
const list = [];

const lorem = new LoremIpsum({
  wordsPerSentence: { min: 10, max: 30 }
});

const itemBuilder = no => ({
  id: uuidv4(),
  no,
  text: lorem.generateWords()
});

const listBuilder = page =>
  Array.from({ length: ITEMS_PER_PAGE }).map((_, i) =>
    itemBuilder(page * ITEMS_PER_PAGE + i + 1)
  );

const getList = (page = 0) => {
  if (!list[page]) list[page] = listBuilder(page);
  return list[page];
};

export default getList;

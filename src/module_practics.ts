import fs from "fs";
import path from "path";
import url from "url";

const ownFilePath: string = url.fileURLToPath(import.meta.url);
const ownFileDir: string = path.dirname(ownFilePath);
const textFilePath: string = path.join(ownFileDir, "../file/uhyo.txt");

const countText = (textFilePath: string, word: string): void => {
  try {
    const data: string = fs.readFileSync(textFilePath, "utf-8");
    const regex: RegExp = new RegExp(word, "g");
    const matches: RegExpMatchArray | null = data.match(regex);
    if(matches === null){
      console.log(`「${word}」は見つかりませんでした。`);
    } else {
      console.log(`「${word}」は${matches.length}件見つかりました。`);
    }
  } catch (e) {
    console.error(e);
  }
};

countText(textFilePath, "uhyo");

import { createInterface } from "readline";

class Card {
  #suit: string;
  #rank: number | string;
  isOpen: boolean;

  constructor(suit: string, rank: number | string, isOpen: boolean) {
    this.#suit = suit;
    this.#rank = rank;
    this.isOpen = isOpen;
  }

  get suit(): string {
    return this.isOpen ? this.#suit : "?";
  }

  get rank(): number | string {
    return this.isOpen ? this.#rank : "?";
  }

  get suitAndRank(): string {
    const convertMark = (suit: string): string => {
      return { spades: "♠", hearts: "♥", diams: "♦", clubs: "♣" }[suit] || suit;
    };
    return this.isOpen ? `${convertMark(this.suit)} ${this.rank}` : "???";
  }
}

class Deck<T> {
  cards: (T | undefined)[];

  constructor(cards: T[]) {
    this.cards = cards;
  }

  shuffle(): void {
    for (let i = this.cards.length; 1 < i; i--) {
      const k = Math.floor(Math.random() * i);
      [this.cards[k], this.cards[i - 1]] = [this.cards[i - 1], this.cards[k]];
    }
  }
}

class Player {
  name: string;
  hand: Card[];

  constructor(name: string) {
    this.name = name;
    this.hand = [];
  }

  get score(): number {
    let score: number = 0;
    let numOfAce: number = 0;
    for (const card of this.hand) {
      if (card.isOpen) {
        switch (card.rank) {
          case "A":
            numOfAce += 1;
            break;
          case "J":
          case "Q":
          case "K":
            score += 10;
            break;
          default:
            if (typeof card.rank === "number") score += card.rank;
        }
      }
    }
    for (let i = 0; i < numOfAce; i++) {
      score += score <= 10 ? 11 : 1;
    }
    return score;
  }

  draw(deck: Deck<Card>, number: number, isOpen: boolean): void {
    for (let i = 0; i < number; i++) {
      const drawCard = deck.cards.shift();
      if (drawCard === undefined) {
        console.log("There are no cards in the deck.");
        break;
      } else {
        drawCard.isOpen = isOpen;
        this.hand.push(drawCard);
      }
    }
  }

  holeCardOpen(): void {
    for (const card of this.hand) {
      card.isOpen = true;
    }
  }
}

class Console {
  players: Player[];

  constructor(players: Player[]) {
    this.players = players;
  }

  message(text: string): void {
    console.log(text);
  }

  info(text: string): void {
    const line = (name: string = ""): string => {
      let result = name;
      let line_length = 64 - name.length;
      for (let i = 0; i < line_length; i++) {
        result += "-";
      }
      return result;
    };

    console.log(text);
    for (const player of this.players) {
      console.log(line(player.name));
      console.log(
        `hand: ${player.hand.map((card) => card.suitAndRank).join()}`
      );
      console.log(`score: ${player.score}`);
      console.log(line());
    }
  }

  readUserInput(question: string): Promise<string> {
    const readline = createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    return new Promise<string>((resolve) => {
      readline.question(question, (answer) => {
        resolve(answer);
        readline.close();
      });
    });
  }

  sleep(duration: number): Promise<void> {
    return new Promise<void>((resolve) => {
      setTimeout(resolve, duration);
    });
  }
}

class Game {
  deck: Deck<Card>;
  dealer: Player;
  you: Player;
  console: Console;
  result: {
    dealer: number;
    you: number;
  };

  constructor() {
    const sequence = (start: number, end: number): number[] =>
      [...Array(end + 1).keys()].slice(start);
    const suits: string[] = ["spades", "hearts", "diams", "clubs"];
    const ranks: (number | string)[] = [...sequence(2, 10), "J", "Q", "K", "A"];
    const cards: Card[] = [];
    for (const suit of suits) {
      for (const rank of ranks) {
        cards.push(new Card(suit, rank, false));
      }
    }
    this.deck = new Deck<Card>(cards);
    this.dealer = new Player("DEALER");
    this.you = new Player("YOU");
    this.console = new Console([this.dealer, this.you]);
    this.result = { dealer: 0, you: 0 };
  }

  async start(): Promise<void> {
    this.console.message("Game start!");
    this.deck.shuffle();
    this.dealer.draw(this.deck, 1, true);
    this.dealer.draw(this.deck, 1, false);
    this.you.draw(this.deck, 2, true);

    await this.console.sleep(1000);
    this.console.info("Dealer dealt cards.");

    if (this.you.score === 21) {
      await this.console.sleep(1000);
      this.console.message("You get natural 21!");
      this.result["you"] = 22;
    } else {
      let isContinue: boolean = true;
      while (isContinue) {
        await this.console.sleep(1000);
        const answer = await this.console.readUserInput(
          "Would you like to draw another card? [y(hit)/n(stand)]:"
        );
        switch (answer.toLowerCase()) {
          case "y":
          case "yes":
          case "hit":
            this.you.draw(this.deck, 1, true);
            this.console.info("YOU draw card.");
            if (this.you.score === 21) {
              this.console.message("YOU get 21!");
              this.result["you"] = 21;
              isContinue = false;
            } else if (this.you.score > 21) {
              this.console.message("YOU bust!");
              this.result["you"] = -1;
              isContinue = false;
            }
            break;
          case "n":
          case "no":
          case "stand":
            this.console.message("YOU stand.");
            this.result["you"] = this.you.score;
            isContinue = false;
            break;
          default:
            this.console.message("Invalid command.");
        }
      }
    }

    await this.console.sleep(1000);
    this.dealer.holeCardOpen();
    this.console.info("Hole card open!");

    if (this.dealer.score === 21) {
      await this.console.sleep(1000);
      this.console.message("DEALER get natural 21!");
      this.result["dealer"] = 22;
    } else {
      let isContinue: boolean = true;
      while (isContinue) {
        await this.console.sleep(1000);
        if (this.dealer.score < 17) {
          this.dealer.draw(this.deck, 1, true);
          this.console.info("DEALER draw card.");
          if (this.dealer.score === 21) {
            this.console.message("DEALER get 21!");
            this.result["dealer"] = 21;
            isContinue = false;
          } else if (this.dealer.score > 21) {
            this.console.message("DEALER bust!");
            this.result["dealer"] = 0;
            isContinue = false;
          }
        } else {
          this.result["dealer"] = this.dealer.score;
          isContinue = false;
        }
      }
    }

    await this.console.sleep(1000);
    if (this.result["dealer"] === this.result["you"]) {
      this.console.message("Draw game.");
    } else if (this.result["dealer"] < this.result["you"]) {
      this.console.message("You win!");
    } else {
      this.console.message("You lose.");
    }
  }
}

new Game().start();

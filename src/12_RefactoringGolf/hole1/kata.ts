/* eslint-disable */

const firstRow = 0;
const secondRow = 1;
const thirdRow = 2;
const firstColumn = 0;
const secondColumn = 1;
const thirdColumn = 2;

const playerO = 'O';
const noPlayer = ' ';

export class Game {
  private _lastPlayer = noPlayer;
  private _board: Board = new Board();

  public Play(player: string, x: number, y: number): void {
    const tile = new Tile(x, y, player);

    this.validateFirstMove(player);
    this.validatePlayer(player);
    this.validatePositionIsEmpty(tile);

    this.updateLastPlayer(player);
    this.updateBoard(tile);
  }

  private validateFirstMove(player: string) {
    if (this._lastPlayer == noPlayer) {
      if (player == playerO) {
        throw new Error('Invalid first player');
      }
    }
  }

  private validatePlayer(player: string) {
    if (player == this._lastPlayer) {
      throw new Error('Invalid next player');
    }
  }

  private validatePositionIsEmpty(tile: Tile) {
    if (this._board.isTilePlayed(tile)) {
      throw new Error('Invalid position');
    }
  }

  private updateLastPlayer(player: string) {
    this._lastPlayer = player;
  }

  private updateBoard(tile: Tile) {
    this._board.AddTileAt(tile);
  }

  public Winner(): string {
    return this._board.findRowFullWithSamePlayer();
  }
}

class Tile {
  public x: number = 0;
  public y: number = 0;
  private player: string = noPlayer;

  constructor(x: number, y: number, player: string) {
    this.x = x;
    this.y = y;
    this.player = player;
  }

  get Player() {
    return this.player;
  }

  get isNotEmpty() {
    return this.Player !== noPlayer;
  }

  hasSamePlayerAs(other: Tile) {
    return this.Player === other.Player;
  }

  hasSameCoordinatesAs(other: Tile) {
    return this.x == other.x && this.y == other.y;
  }

  updatePlayer(newPlayer: string) {
    this.player = newPlayer;
  }
}

class Board {
  private _plays: Tile[] = [];

  constructor() {
    for (let x = firstRow; x <= thirdRow; x++) {
      for (let y = firstColumn; y <= thirdColumn; y++) {
        this._plays.push(new Tile(x, y, noPlayer));
      }
    }
  }

  public isTilePlayed(tile: Tile) {
    return this._plays.find((t: Tile) => t.hasSameCoordinatesAs(tile))!.isNotEmpty;
  }

  public AddTileAt(tile: Tile): void {
    this._plays.find((t: Tile) => t.hasSameCoordinatesAs(tile))!.updatePlayer(tile.Player);
  }

  public findRowFullWithSamePlayer(): string {
    if (this.isRowFull(firstRow) && this.isRowFullWithSamePlayer(firstRow)) {
      return this.playerAt(firstRow, firstColumn);
    }

    if (this.isRowFull(secondRow) && this.isRowFullWithSamePlayer(secondRow)) {
      return this.playerAt(secondRow, firstColumn);
    }

    if (this.isRowFull(thirdRow) && this.isRowFullWithSamePlayer(thirdRow)) {
      return this.playerAt(thirdRow, firstColumn);
    }

    return noPlayer;
  }

  private hasSamePlayer(x: number, y: number, otherX: number, otherY: number) {
    return this.TileAt(x, y)!.hasSamePlayerAs(this.TileAt(otherX, otherY)!);
  }

  private playerAt(x: number, y: number) {
    return this.TileAt(x, y)!.Player;
  }

  private TileAt(x: number, y: number): Tile {
    return this._plays.find((t: Tile) => t.hasSameCoordinatesAs(new Tile(x, y, noPlayer)))!;
  }

  private isRowFull(row: number) {
    return (
      this.isTilePlayed(new Tile(row, firstColumn, noPlayer)) &&
      this.isTilePlayed(new Tile(row, secondColumn, noPlayer)) &&
      this.isTilePlayed(new Tile(row, thirdColumn, noPlayer))
    );
  }

  private isRowFullWithSamePlayer(row: number) {
    return (
      this.hasSamePlayer(row, firstColumn, row, secondColumn) &&
      this.hasSamePlayer(row, secondColumn, row, thirdColumn)
    );
  }
}

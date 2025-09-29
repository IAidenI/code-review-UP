/* eslint-disable */

const firstRow = 0;
const secondRow = 1;
const thirdRow = 2;
const firstColumn = 0;
const secondColumn = 1;
const thirdColumn = 2;

const playerO = 'O';
const emptyPlay = ' ';

export class TicTacToe {
  private _lastSymbol = emptyPlay;
  private _grid: Grid = new Grid();

  public Play(symbol: string, row: number, col: number): void {
    this.validateFirstMove(symbol);
    this.validatePlayer(symbol);
    this.validatePositionIsEmpty(row, col);

    this.updateLastPlayer(symbol);
    this.updateGrid(symbol, row, col);
  }

  private validateFirstMove(player: string) {
    if (this._lastSymbol == emptyPlay) {
      if (player == playerO) {
        throw new Error('Invalid first player');
      }
    }
  }

  private validatePlayer(player: string) {
    if (player == this._lastSymbol) {
      throw new Error('Invalid next player');
    }
  }

  private validatePositionIsEmpty(row: number, col: number) {
    if (this._grid.cellAt(row, col).isNotEmpty) {
      throw new Error('Invalid position');
    }
  }

  private updateLastPlayer(player: string) {
    this._lastSymbol = player;
  }

  private updateGrid(player: string, row: number, col: number) {
    this._grid.writeCellAt(player, row, col);
  }

  public Winner(): string {
    return this._grid.findRowFullWithSamePlayer();
  }
}

class Cell {
  private row: number = 0;
  private col: number = 0;
  private symbol: string = ' ';

  constructor(row: number, col: number, symbol: string) {
    this.row = row;
    this.col = col;
    this.symbol = symbol;
  }

  get Symbol() {
    return this.symbol;
  }

  get isNotEmpty() {
    return this.Symbol !== emptyPlay;
  }

  hasSameSymbolAs(other: Cell) {
    return this.Symbol === other.Symbol;
  }

  hasSameCoordinatesAs(other: Cell) {
    return this.row == other.row && this.col == other.col;
  }

  updateSymbol(newSymbol: string) {
    this.symbol = newSymbol;
  }
}

class Grid {
  private _cells: Cell[] = [];

  constructor() {
    for (let r = firstRow; r <= thirdRow; r++) {
      for (let c = firstColumn; c <= thirdColumn; c++) {
        this._cells.push(new Cell(r, c, emptyPlay));
      }
    }
  }

  public cellAt(row: number, col: number): Cell {
    return this._cells.find((cell: Cell) =>
      cell.hasSameCoordinatesAs(new Cell(row, col, emptyPlay))
    )!;
  }

  public writeCellAt(symbol: string, row: number, col: number): void {
    this._cells
      .find((cell: Cell) => cell.hasSameCoordinatesAs(new Cell(row, col, symbol)))!
      .updateSymbol(symbol);
  }

  public findRowFullWithSamePlayer(): string {
    if (this.isRowFull(firstRow) && this.isRowFullWithSameSymbol(firstRow)) {
      return this.cellAt(firstRow, firstColumn)!.Symbol;
    }

    if (this.isRowFull(secondRow) && this.isRowFullWithSameSymbol(secondRow)) {
      return this.cellAt(secondRow, firstColumn)!.Symbol;
    }

    if (this.isRowFull(thirdRow) && this.isRowFullWithSameSymbol(thirdRow)) {
      return this.cellAt(thirdRow, firstColumn)!.Symbol;
    }

    return emptyPlay;
  }

  private isRowFull(row: number) {
    return (
      this.cellAt(row, firstColumn)!.isNotEmpty &&
      this.cellAt(row, secondColumn)!.isNotEmpty &&
      this.cellAt(row, thirdColumn)!.isNotEmpty
    );
  }

  private isRowFullWithSameSymbol(row: number) {
    return (
      this.cellAt(row, firstColumn)!.hasSameSymbolAs(this.cellAt(row, secondColumn)!) &&
      this.cellAt(row, thirdColumn)!.hasSameSymbolAs(this.cellAt(row, secondColumn)!)
    );
  }
}

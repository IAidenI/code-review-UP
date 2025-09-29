/* eslint-disable */

const topRow = 0;
const middleRow = 1;
const bottomRow = 2;
const leftCol = 0;
const centerCol = 1;
const rightCol = 2;

const MARK_O = 'O';
const EMPTY_MARK = ' ';

export class TicTacToe {
  private _lastMark = EMPTY_MARK;
  private _grid: Grid = new Grid();

  public placeMark(mark: string, row: number, col: number): void {
    this.ensureFirstPlayerIsX(mark);
    this.ensureTurnsAlternate(mark);
    this.ensureCellIsEmpty(row, col);

    this.updateLastMark(mark);
    this.updateGrid(mark, row, col);
  }

  public winner(): string {
    return this._grid.findRowFullWithSamePlayer();
  }

  private ensureFirstPlayerIsX(mark: string) {
    if (this._lastMark == EMPTY_MARK) {
      if (mark == MARK_O) {
        throw new Error('Invalid first player');
      }
    }
  }

  private ensureTurnsAlternate(mark: string) {
    if (mark == this._lastMark) {
      throw new Error('Invalid next player');
    }
  }

  private ensureCellIsEmpty(row: number, col: number) {
    if (this._grid.cellAt(row, col).isNotEmpty) {
      throw new Error('Invalid position');
    }
  }

  private updateLastMark(mark: string) {
    this._lastMark = mark;
  }

  private updateGrid(mark: string, row: number, col: number) {
    this._grid.writeCellAt(mark, row, col);
  }
}

class Cell {
  private row: number = 0;
  private col: number = 0;
  private mark: string = EMPTY_MARK;

  constructor(row: number, col: number, mark: string) {
    this.row = row;
    this.col = col;
    this.mark = mark;
  }

  get Mark() {
    return this.mark;
  }

  get isNotEmpty() {
    return this.Mark !== EMPTY_MARK;
  }

  hasSameMarkAs(other: Cell) {
    return this.Mark === other.Mark;
  }

  hasSameCoordinatesAs(other: Cell) {
    return this.row == other.row && this.col == other.col;
  }

  updateMark(newMark: string) {
    this.mark = newMark;
  }
}

class Grid {
  private _cells: Cell[] = [];

  constructor() {
    for (let r = topRow; r <= bottomRow; r++) {
      for (let c = leftCol; c <= rightCol; c++) {
        this._cells.push(new Cell(r, c, EMPTY_MARK));
      }
    }
  }

  public cellAt(row: number, col: number): Cell {
    return this._cells.find((c: Cell) =>
      c.hasSameCoordinatesAs(new Cell(row, col, EMPTY_MARK))
    )!;
  }

  public writeCellAt(mark: string, row: number, col: number): void {
    this._cells
      .find((c: Cell) => c.hasSameCoordinatesAs(new Cell(row, col, mark)))!
      .updateMark(mark);
  }

  public findRowFullWithSamePlayer(): string {
    if (this.isRowFull(topRow) && this.isRowFullWithSameSymbol(topRow)) {
      return this.cellAt(topRow, leftCol)!.Mark;
    }

    if (this.isRowFull(middleRow) && this.isRowFullWithSameSymbol(middleRow)) {
      return this.cellAt(middleRow, leftCol)!.Mark;
    }

    if (this.isRowFull(bottomRow) && this.isRowFullWithSameSymbol(bottomRow)) {
      return this.cellAt(bottomRow, leftCol)!.Mark;
    }

    return EMPTY_MARK;
  }

  private isRowFull(row: number) {
    return (
      this.cellAt(row, leftCol)!.isNotEmpty &&
      this.cellAt(row, centerCol)!.isNotEmpty &&
      this.cellAt(row, rightCol)!.isNotEmpty
    );
  }

  private isRowFullWithSameSymbol(row: number) {
    return (
      this.cellAt(row, leftCol)!.hasSameMarkAs(this.cellAt(row, centerCol)!) &&
      this.cellAt(row, rightCol)!.hasSameMarkAs(this.cellAt(row, centerCol)!)
    );
  }
}

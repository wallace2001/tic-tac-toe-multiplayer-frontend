
export interface IMoveGame {
    matrix: string[][];
    turn: boolean;
    start: boolean;
    winnerSymbol: 'x' | 'o' | '';
    symbol: string;
    matrixWinner: string[][];
}

export type ICallback = (options: IMoveGame) => void;
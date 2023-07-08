import { joinGameRoom } from "@/services/game-service";
import _ from "lodash";
import { Socket, io } from "socket.io-client";
import { create } from "zustand";

export interface User{
    name: string;
    roomJoined: string;
    yourTurn?: boolean;
    symbol?: string;
}

export interface IWinner {
    winnerSymbol: 'x' | 'o' | '';
    matrixWinner: string[][];
}

interface GameStore {
    socket: Socket | undefined;
    user: User;
    gameStart: boolean;
    winnerPlayer: IWinner;
    updateWinnerPlayer: (value: IWinner) => void;
    updateStart: (value: boolean) => void;
    addUser: (user: User) => void;
    updateUser: (user: User) => void;
    connectSocket: () => void;
}

const useGame = create<GameStore>((set, get) => ({
    user: {
        name: '',
        roomJoined: ''
    },
    gameStart: false,
    winnerPlayer: {
        winnerSymbol: '',
        matrixWinner: []
    },
    socket: undefined,
    updateWinnerPlayer: (value: IWinner ) => set({ winnerPlayer: value }),
    connectSocket: (): Promise<any> => {
        return new Promise((rs, rj) => {

            if (!get().socket === undefined) return rs(get().socket);

            const socket = io("http://localhost:9000");
    
            if (!socket) {
                return rj();
            }
    
            socket.on("connect", () => {
                rs(socket);
            });
    
            socket.on("connect_error", (err) => {
                console.log("Connection error: ", err);
            })

            set({socket: socket});
        })
    },
    addUser: async (user) => {
        const response = await joinGameRoom(get().socket, user);
        set({user, gameStart: response.start});
    },
    updateUser: (user) => set({ user }),
    updateStart: (value: boolean) => set({ gameStart: value })
}));

export default useGame;
import { User } from "@/hooks/use-game";
import { ICallback, IMoveGame } from "@/types";
import { toast } from "react-hot-toast";
import { Socket } from "socket.io-client";

const joinGameRoom = (socket: Socket | undefined, user: User): Promise<IMoveGame> => {
    return new Promise((rs, rj) => {

        if (socket === undefined) return rj("Error");

        socket.emit("join_game", user, (response: IMoveGame) => {
            rs(response);
        });
        socket.on("room_joined", () => {
            toast.success("Entrando na sala...");
        });
        socket.on("room_join_error", ({error}) => {
            toast.error(error);
        });
    })
}

const updateGame = (socket: Socket, gameMatrix: string[][], symbol: string) => {
    socket.emit("update_game", { matrix: gameMatrix, symbol });
}

const onGameUpdate = (socket: Socket, callback: ICallback) => {
    socket.on("on_game_update", callback);
};

const onStartGame = async (socket: Socket, listiner: ICallback) => {
    socket.on("start_game", listiner);
};

const checkGameState = (socket: Socket, matrix: string[][], user: User) => {
    socket.emit("winner", {matrix, user});
};

const onCheckGameState = (socket: Socket, callback: ICallback) => {
    socket.on("on_winner", callback);
};

export { 
    joinGameRoom, 
    updateGame, 
    onGameUpdate, 
    onStartGame, 
    checkGameState, 
    onCheckGameState 
};
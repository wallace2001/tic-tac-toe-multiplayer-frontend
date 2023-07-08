"use client";

import useGame, { User } from "@/hooks/use-game";
import { checkGameState, onCheckGameState, onGameUpdate, onStartGame, updateGame } from "@/services/game-service";
import _ from "lodash";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

const GameBoard = () => {

  const {
    user: player,
    gameStart,
    socket,
    winnerPlayer,
    updateStart,
    updateWinnerPlayer
  } = useGame();

  if (_.isEmpty(player.name)) {
    redirect('/sign-up');
  }

  const [matrix, setMatrix] = useState([
    ["", "", ""],
    ["", "", ""],
    ["", "", ""]
  ]);
  const [user, setUser] = useState<User>(player);

  const handleClick = (row: number, column: number, value: string | undefined) => {
    const newMatrix = [...matrix];

    if (value && !winnerPlayer.winnerSymbol) {
      if (matrix[row][column] === "") {
        const newMatrix = [...matrix];
        newMatrix[row][column] = value;
        setMatrix(newMatrix);
      }

      if (socket?.connected) {
        updateGame(socket, newMatrix, value);

        setUser(prevState => {
          return {
            ...prevState,
            yourTurn: false,
          }
        });
      }
    }
  };

  const handleGameUpdate = () => {
    if (socket) {
      onGameUpdate(socket, ({ matrix, turn, symbol }) => {
        setMatrix(matrix);
        setUser(prevState => {
          return {
            ...prevState,
            yourTurn: turn,
            symbol
          }
        });
      })
    }
  }

  const handleGameStart = () => {
    if (socket?.connected) {
      onStartGame(socket, (options) => {
        updateStart(options?.start);
        setUser(prevState => {
          return {
            ...prevState,
            symbol: options?.symbol,
            yourTurn: options?.start
          }
        });
      });
    }
  }

  const handleCheckWinnerGame = () => {
    if (socket) {
      onCheckGameState(socket, (options) => {
        updateWinnerPlayer({matrixWinner: options.matrixWinner, winnerSymbol: options.winnerSymbol});
      });
    }
  };

  useEffect(() => {
    handleGameStart();
    handleGameUpdate();
    handleCheckWinnerGame();
  }, []);

  useEffect(() => {
    if (socket) {
      checkGameState(socket, matrix, user);
    }
  }, [matrix]);

  return (
    <>
      <div className="w-full h-full flex justify-center items-center flex-col">
        {!gameStart && <div className="flex items-center justify-center">Você está sozinho na sala, espere o próximo jogador!</div>}
        {(!user.yourTurn && gameStart && !winnerPlayer.winnerSymbol) && (
          <div className="flex items-center justify-center">
            <span className="p-5 text-xl">Espere a sua vez!</span>
          </div>
        )}
        {winnerPlayer.winnerSymbol && winnerPlayer.winnerSymbol === user.symbol && (
          <div className="flex items-center justify-center">
            <span className="p-5 text-xl text-green-500">Parabéns, você ganhou!</span>
          </div>
        )}
        {winnerPlayer.winnerSymbol && winnerPlayer.winnerSymbol !== user.symbol && (
          <div className="flex items-center justify-center">
            <span className="p-5 text-xl text-red-500">Você perdeu!</span>
          </div>
        )}
        <div className=" flex justify-center items-center flex-col">
          {matrix.map((row, rowIndex) => {
            return (
              <div className="flex justify-center items-center flex-row" key={rowIndex}>
                {row.map((column, columnIndex) => {

                  const fieldWinner = winnerPlayer.matrixWinner[columnIndex] && winnerPlayer.winnerSymbol === column;

                  return (
                  <div key={columnIndex} className={`
                  w-[5rem]
                  h-[5rem]
                  md:w-[10rem]
                  md:h-[10rem]
                  aspect-square
                  cursor-pointer
                  flex
                  items-center
                  justify-center
                  border-2 border-white
                  ${!winnerPlayer.winnerSymbol && user.yourTurn ? 'cursor-pointer hover:opacity-50' : 'cursor-wait'}
                  ${fieldWinner ? 'bg-green-300' : 'bg-black'}
                `}
                      onClick={() => user.yourTurn && handleClick(rowIndex, columnIndex, user?.symbol)}
                    >
                      <h1 className="text-8xl font-semibold">
                        {!_.isEmpty(column) ? column === "x" ? 'X' : 'O' : ''}

                      </h1>
                    </div>
                  );
                })}
              </div>
            )
          })}
        </div>
      </div>
    </>
  );
}

export default GameBoard;
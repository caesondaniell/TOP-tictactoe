// function newPlayer(name, marker) {
//     return {name, marker};
// }

// const playerOne = newPlayer("Tim", "X");
// const playerTwo = newPlayer("Paul", "O");

// console.log(playerOne, playerTwo);

const game = (() => {
    const board = [
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        ""
    ];

    function place(square, marker) {
        if (board[square - 1] === "") {
            board.splice(square - 1, 1, marker)
        } else console.log("That space is already taken!");
        console.log(game.board);
        console.log(endCheck());
    };

    function endCheck() {
        let vertVictory, horzVictory, diagVictory, catGame, h = 0;
        while (h < 7) {
            if (board[h] !== "" &&
                board[h] === board[h + 1] &&
                board[h] === board[h + 2]) horzVictory = true;
            h += 3;
        };
        for (let v = 0; v < 3; v++) {
            if (board[v] !== "" &&
                board[v] === board[v + 3] &&
                board[v] === board[v + 6]) vertVictory = true;
        }
        if (
            board[4] !== "" &&
            ((board[4] === board[0] && board[4] === board[8]) ||
            (board[4] === board[2] && board[4] === board[6]))
        ) diagVictory = true;
        if (
            !board.includes("") && !(vertVictory || horzVictory || diagVictory)
        ) catGame = true;
        return { vertVictory, horzVictory, diagVictory, catGame };
    }

    function reset() {
        board.forEach(square => { board.splice(board.indexOf(square), 1, "") });
        console.log(game.board);
    }

    return { board, place, reset };
})();

game.place(1, "X");
game.place(4, "O");
game.place(3, "X");
game.place(2, "O");
game.place(6, "X");
game.place(9, "O");
game.place(5, "X");
game.place(7, "O");
game.place(8, "X");
game.reset();
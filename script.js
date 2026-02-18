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
        board.splice(square - 1, 1, marker);
        console.log(game.board);
    };

    return { board, place, };
})();

game.place(3, "X");
game.place(2, "O");
game.place(6, "X");
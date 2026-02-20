const board = (() => {
    const grid = [
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

    function clear() {
        grid.forEach(square => { grid.splice(grid.indexOf(square), 1, "") });
        console.log(grid);
    }

    return { grid, clear };
})();

const game = (() => {
    const playerList = [];

    function newGame() {
        const player1 = newPlayer();
        const player2 = newPlayer();
        setMarker(player1);
        player2.marker = player1.marker === "X" ? "O" : "X";
        playerList.push(player1, player2);
        play();
    }

    function play() {
        const [player1, player2] = coinFlip();
        while (!gameStatus().outcome) {
            const currPlayer = whoseTurn(player1, player2);
            console.log(`Next: ${currPlayer.name} (${currPlayer.marker})`);
            claim(currPlayer);
        }
        console.log("Game over.");
        console.log(`${player1.name}'s score: ${player1.getScore()}`);
        console.log(`${player2.name}'s score: ${player2.getScore()}`);
    }

    function newPlayer() {
        let marker, score = 0;
        const player = prompt("What's your name?");
        const name = player[0].toUpperCase()+player.slice(1).toLowerCase();
        const getScore = () => score;
        const addWin = () => { score++ };
        return { name, marker, getScore, addWin };
    }

    function setMarker(player) {
        player.marker = prompt(`Will ${player.name} play X or O?`).toUpperCase();
        while (player.marker !== "X" && player.marker !== "O") {
            player.marker = prompt(`Invalid entry. Choose X or O, please.`).toUpperCase();
        }
    }

    function whoseTurn(one, two) {
        const oneCount = board.grid.filter(space => space === one.marker);
        const twoCount = board.grid.filter(space => space === two.marker);
        const currPlayer = oneCount.length === twoCount.length ? one : two;
        return currPlayer;
    }

    function claim(player) {
        let square = prompt(`${player.name}: Claim a square (1-9)`);
        while (!(board.grid[square - 1] === "")) {
            square = prompt(`Sorry ${player.name}, that square is claimed.\nClaim a square (1-9)`)
        }
        board.grid.splice(square - 1, 1, player.marker);
        console.log(board.grid);
    };

    function gameStatus() {
        let h = 0, outcome, winMark;
        while (h < 7) {
            if (board.grid[h] !== "" &&
                board.grid[h] === board.grid[h + 1] &&
                board.grid[h] === board.grid[h + 2]) {
                    outcome = "horizontal victory";
                    winMark = board.grid[h];
                }
            h += 3;
        };
        for (let v = 0; v < 3; v++) {
            if (board.grid[v] !== "" &&
                board.grid[v] === board.grid[v + 3] &&
                board.grid[v] === board.grid[v + 6]) {
                    outcome = "vertical victory";
                    winMark = board.grid[v];
                }
        }
        if (
            board.grid[4] !== "" &&
            ((board.grid[4] === board.grid[0] && 
                board.grid[4] === board.grid[8]) ||
            (board.grid[4] === board.grid[2] && 
                board.grid[4] === board.grid[6]))
        ) {
            outcome = "diagonal victory";
            winMark = board.grid[4];
        }
        if (!board.grid.includes("")) outcome = "cat's game";
        if (outcome) {
            if (outcome === "cat's game") {
                console.log(`It's a ${outcome}!`);
            } else {
                let victor
                playerList.forEach(player => {
                    if (winMark === player.marker) victor = player;
                })
                console.log(`It's a ${outcome}; ${victor.name} wins!`);
                victor.addWin();
            }
        }
        return { outcome };
    }

    function coinFlip() {
        const flip = Math.floor(Math.random() * 2);
        const [player1, player2] = playerList;
        const [firstPlayer, secondPlayer] = flip === 0 ?
                                [player1, player2] :
                                [player2, player1];
        return [firstPlayer, secondPlayer];
    }

    return { newGame };
})();


// for testing
// board.claim(1, "X");
// board.claim(2, "O");
// board.claim(5, "X");
// board.claim(8, "O");
// board.claim(9, "X");
// board.claim(9, "O");
// board.claim(5, "X");
// board.claim(7, "O");
// board.claim(8, "X");
// board.clear();
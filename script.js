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
        // play();
    }

    // function play() {

    // }

    function newPlayer() {
        let marker, score = 0;
        const player = prompt("What's your name?");
        const name = player[0].toUpperCase()+player.slice(1).toLowerCase();
        const getScore = () => score;
        const addWin = () => { score++ };
        return { name, marker, getScore, addWin };
        // playerList.push({ name, marker, getScore, addWin });
        // console.log(playerList);
    }

    function setMarker(player) {
        player.marker = prompt(`Will ${player.name} play X or O?`).toUpperCase();
        while (player.marker !== "X" && player.marker !== "O") {
            player.marker = prompt(`Invalid entry. Choose X or O, please.`).toUpperCase();
        }
    }

    function whoseTurn() {
        let turn;
        let currentPlayer;
        if (board.grid.every(item => item === "")) {
            const first = coinFlip();
            turn = first === 0 ? "O" : "X";
        } else {
            const oCount = board.grid.filter(space => space === "O");
            const xCount = board.grid.filter(space => space === "X");
            turn = xCount.length > oCount.length ? "O" : "X";
        }
        playerList.forEach(player => {
            if (player.marker === turn) currentPlayer = player;
        })
        return currentPlayer;
    }

    function claim(square) {
        if (board.grid[square - 1] === "") {
            board.grid.splice(square - 1, 1, whoseTurn().marker);
            console.log(board.grid);
        } else {
            alert("That space is already claimed!");
            return;
        }
        const status = statusCheck();
        if (status.outcome) {
            if (status.outcome === "cat's game") {
                console.log(`It's a ${status.outcome}!`);
            } else {
                console.log(`It's a ${status.outcome}; ${status.winner} wins!`)
            }
        } else console.log(`Next up: ${whoseTurn().name} (${whoseTurn().marker})`);
        
    };

    function statusCheck() {
        let h = 0, outcome, winner;
        while (h < 7) {
            if (board.grid[h] !== "" &&
                board.grid[h] === board.grid[h + 1] &&
                board.grid[h] === board.grid[h + 2]) {
                    outcome = "horizontal victory";
                    winner = board.grid[h];
                }
            h += 3;
        };
        for (let v = 0; v < 3; v++) {
            if (board.grid[v] !== "" &&
                board.grid[v] === board.grid[v + 3] &&
                board.grid[v] === board.grid[v + 6]) {
                    outcome = "vertical victory";
                    winner = board.grid[v];
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
            winner = board.grid[4];
        }
        if (!board.grid.includes("")) outcome = "cat's game";
        return { outcome, winner };
    }

    function coinFlip() {
        return Math.floor(Math.random() * 2);
    }

    return { claim, newGame };
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
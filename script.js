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

    function claim(square) {
        if (grid[square - 1] === "") {
            grid.splice(square - 1, 1, whoseTurn());
            console.log(grid);
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
        } else console.log(`Next up: ${whoseTurn()}`);
        
    };

    function statusCheck() {
        let h = 0, outcome, winner;
        while (h < 7) {
            if (grid[h] !== "" &&
                grid[h] === grid[h + 1] &&
                grid[h] === grid[h + 2]) {
                    outcome = "horizontal victory";
                    winner = grid[h];
                }
            h += 3;
        };
        for (let v = 0; v < 3; v++) {
            if (grid[v] !== "" &&
                grid[v] === grid[v + 3] &&
                grid[v] === grid[v + 6]) {
                    outcome = "vertical victory";
                    winner = grid[v];
                }
        }
        if (
            grid[4] !== "" &&
            ((grid[4] === grid[0] && grid[4] === grid[8]) ||
            (grid[4] === grid[2] && grid[4] === grid[6]))
        ) {
            outcome = "diagonal victory";
            winner = grid[4];
        }
        if (!grid.includes("")) outcome = "cat's game";
        return { outcome, winner };
    }

    function clear() {
        grid.forEach(square => { grid.splice(grid.indexOf(square), 1, "") });
        console.log(grid);
    }

    return { grid, claim, clear };
})();

function newPlayer(name, marker) {
    let score = 0;
    const getScore = () => score;
    const addWin = () => { score++ };
    return { name, marker, getScore, addWin };
}

function whoseTurn() {
    let turn = "X";
    const oCount = board.grid.filter(space => space === "O");
    const xCount = board.grid.filter(space => space === "X");
    if (xCount.length > oCount.length) turn = "O";
    return turn;
}

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
const game = (() => {
    //EXTERNAL
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
        }

        return { grid, clear };
    })();
    //EXTERNAL
    let players = (() => {
        let list = [];
        return { list };
    })();
    //EXTERNAL: clear board and reset players.list w/ two new players
    function startGame() {
        board.clear();
        players.list = [];
        const player1 = newPlayer();
        const player2 = newPlayer();
        setMarker(player1);
        player2.marker = player1.marker === "X" ? "O" : "X";
        players.list.push(player1, player2);
        coinFlip();
    }
    //EXTERNAL: clear board and optionally switch player markers
    function startRound() {
        board.clear();
        if (confirm("Switch markers?")) {
            const [player1, player2] = players.list;
            [player1.marker, player2.marker] = [player2.marker, player1.marker];
        }
        coinFlip();
    }
        //EXTERNAL: place current player's marker in chosen space
    function claimSpace(space) {
        const currPlayer = whoseTurn();
        if (board.grid[space] === "") {
            board.grid.splice(space, 1, currPlayer.marker);
        } else alert(`Whoopsie! That space is already claimed.`);
    };
    //EXTERNAL: check game status, RETURN outcome and display text
    function checkStatus() {
        let h = 0, gameText, outcome, winMark;
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
        if (!board.grid.includes("") && !outcome) outcome = "cat's game";
        if (outcome) {
            if (outcome === "cat's game") {
                gameText = `Game over. It's a ${outcome}!`;
            } else {
                let victor
                players.list.forEach(player => {
                    if (winMark === player.marker) victor = player;
                })
                gameText = `Game over. It's a ${outcome}; ${victor.name} wins!`;
                victor.addWin();
            }
        } else {
            const player = whoseTurn();
            gameText = `${player.name} (${player.marker}), claim a space.`
        }
        return { outcome, gameText }; 
    }
    //INTERNAL (newGame): RETURN player objects
    function newPlayer() {
        let turn = 0, marker, score = 0;
        const player = prompt("What's your name?");
        const name = player[0].toUpperCase()+player.slice(1).toLowerCase();
        const getScore = () => score;
        const addWin = () => { score++ };
        return { name, marker, turn, getScore, addWin };
    }
    //INTERNAL (newGame): set markers on player objects
    function setMarker(player) {
        player.marker = prompt(`Will ${player.name} play X or O?`).toUpperCase();
        while (player.marker !== "X" && player.marker !== "O") {
            player.marker = prompt(`Invalid entry. Choose X or O, please.`).toUpperCase();
        }
    }
    //INTERNAL (newGame, newRound): set turn order in player objects
    function coinFlip() {
        players.list[0].turn = 0;
        players.list[1].turn = 0;
        const flip = Math.floor(Math.random() * 2);
        players.list[0].turn = flip === 0 ? 1 : 2;
        players.list[1].turn = players.list[0].turn === 1 ? 2 : 1;
    }
    //INTERNAL (claim, gameStatus): RETURN current player
    function whoseTurn() {
        const [player1, player2] = players.list[0].turn < players.list[1].turn ?
                                    players.list : [players.list[1], players.list[0]];
        const oneCount = board.grid.filter(space => space === player1.marker);
        const twoCount = board.grid.filter(space => space === player2.marker);
        const currPlayer = oneCount.length === twoCount.length ? player1 : player2;
        return currPlayer;
    }

    return { 
        board, 
        players, 
        startGame, 
        startRound, 
        claimSpace, 
        checkStatus 
    };
})();

const domControl = (() => {
    const gameText = document.querySelector(".game-text");
    const controlBtns = document.querySelectorAll(".game-control");
    const gridSquares = document.querySelectorAll(".grid-square");
    //Add functions to start a new game or round
    controlBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            gridSquares.forEach(square => {
                square.toggleAttribute("disabled");
            });
            switch (btn.classList[1]) {
                case ("new"):
                    controlBtns[1].toggleAttribute("hidden", false);
                    game.startGame();
                    break;
                case ("reset"):
                    game.startRound();
                    break;
            };
            updatePlayers();
            updateGrid();
            gameText.textContent = game.checkStatus().gameText;
        });
    });
    //Add functions to claim a space and check game status
    gridSquares.forEach(square => {
        square.addEventListener("click", () => {
            const position = Number(square.dataset.position);
            game.claimSpace(position);
            updateGrid();
            const status = game.checkStatus();
            gameText.textContent = status.gameText;
            if (status.outcome) {
                gridSquares.forEach(square => {
                    square.toggleAttribute("disabled");
                });
                updatePlayers();
                controlBtns.forEach(btn => {
                    btn.toggleAttribute("hidden", false);
                });
            }
        })
    });
    //Render the board
    function updateGrid() {
        const btns = document.querySelectorAll(".grid-square");
        for (let i = 0; i < btns.length; i++) {
            btns[i].textContent = game.board.grid[i];
        }
    }
    //Render each players' name, marker, score
    function updatePlayers() {
        const [player1, player2] = game.players.list;
        const p1Name = document.querySelector(".p1-name");
        const p1Mark = document.querySelector(".p1-mark");
        const p1Score = document.querySelector(".p1-score");
        const p2Name = document.querySelector(".p2-name");
        const p2Mark = document.querySelector(".p2-mark");
        const p2Score = document.querySelector(".p2-score");
        p1Name.textContent = player1.name;
        p1Mark.textContent = `marker: ${player1.marker}`;
        p1Score.textContent = `score: ${player1.getScore()}`;
        p2Name.textContent = player2.name;
        p2Mark.textContent = `marker: ${player2.marker}`;
        p2Score.textContent = `score: ${player2.getScore()}`;
    }
})();
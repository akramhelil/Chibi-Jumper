

const formField = document.querySelector("form")

formField.addEventListener("submit", ev => {
	ev.preventDefault()
	const playerName = document.querySelector("#player-name").value
	
	function renderPlayerName(player) {
		formField.remove()
		let nameSpan = document.querySelector("span")
		nameSpan.innerHTML = `<h2 data-id="${player.id}"> 
		${player.name} </h2>
		`
	}
	adapter.createPlayer(playerName)
	.then(renderPlayerName)
	// app.startgame
	
}) // end of the submit action

const endGame = document.querySelector("#end-game")
endGame.addEventListener("click", ev => {
	// userID
	adapter.createGame(userID, timer)
	// render the game again via canvas or via rendinring the whole page
})



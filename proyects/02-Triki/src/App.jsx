import { useState } from 'react'
import confetti from 'canvas-confetti'
import { Square } from './components/Square'
import {TURNS} from './constants'
import { checkWinnerFrom, checkEndGame } from './logic/board'
import { WinnerModal } from './components/WinnerModal'
import { Tablero } from './components/Tablero'
import { saveGameToStorage, resetGameStorage } from './storage'
import './App.css'


function App() {
  const [board, setBoard] = useState(() =>{
      const boardFromStorage = window.localStorage.getItem('board')
      if(boardFromStorage) return JSON.parse(boardFromStorage)
      return Array(9).fill(null)
    })
  console.log(board)
  const [turn, setTurn] = useState(() =>{
    const turnFromStorage = window.localStorage.getItem('turn')
    return turnFromStorage ?? TURNS.X
  })
  const [winner, setWinners] = useState(null) //
  
  const updateBoard = (index) => {
    //no actualizamos el tablero
    // si ya tiene algo
    if (board[index]!= null || winner) {
      return
    }
    // actualizamos el tablero

    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)
    // cambiamos el turno
    const newturn = turn == TURNS.X ? TURNS.O : TURNS.X
    setTurn(newturn)

    //guardar aqui partidda
    saveGameToStorage({
      board: newBoard,
      turn: newturn,
    })

    //revisar si  hay ganador
    const newWinner = checkWinnerFrom(newBoard)
    if (newWinner) {
      confetti()
      setWinners(newWinner)
    } else if (checkEndGame(newBoard)) {
      setWinners(false)
    }
  }
 

  const resetGame = () =>{
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinners(null)

    resetGameStorage()
  }

  return(
    <main className='board'>
      <h1>Triki</h1>
      <button onClick={resetGame}>Reset del juego</button>
      <section className='game'>
       <Tablero board={board} updateBoard={updateBoard}/>
      </section>

      <section className='turn'>
        <Square isSelected = {turn == TURNS.X}>{TURNS.X}</Square>
        <Square isSelected = {turn == TURNS.O}>{TURNS.O}</Square>
      </section>

      <WinnerModal resetGame={resetGame} winner={winner} />


    </main>
  )
}

export default App

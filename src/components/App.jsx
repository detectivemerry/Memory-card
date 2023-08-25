import { useEffect, useState } from 'react'
import '../style/App.css'
import {card_names, giphyTranslateUrl, scoreBoardMessagesData} from '../utils/data.jsx'
import Card from './Card.jsx'

function App() {

  const [cardData, setCardData] = useState([])
  const [score, setScore] = useState(null)
  const [selectedCards, setSelectedCards] = useState([])
  const [{loseGame}, {selectCard}, {winGame}] = scoreBoardMessagesData
  const [gameStatus, setGameStatus] = useState("Playing") // Playing, Won, Lost
  const gamePoint = 12

  //API call to retrieve images on first render
  let isLoaded = false
  useEffect(()=>{
      !isLoaded && card_names.map((card_name)=>{
        fetch(giphyTranslateUrl + card_name.replace(/\s+/g, '%2B'),{mode: 'cors'})
        .then(function(response){
          return response.json()
        })
        .then(function(response){
          setCardData((prevData)=>{
            return [...prevData, {card_name : card_name, src : response.data.images.original.url, id : "id" + Math.random().toString(16).slice(2)}]
          })
        })
        .catch(function(error){
          console.error(error);
        })
      })
      return () => {
        isLoaded = true
      }
  },[])

  //helper function to shuffle cardData
  const shuffle = (array)=>{
    for(let i = array.length - 1; i > 0; i--){
      const j = Math.floor(Math.random()*(i+1));
      [array[i], array[j]] = [array[j], array[i]]
    }
    return array
  }

  const restartGame = () => {
    setScore(() => {
      return 0;
    })
    setSelectedCards(()=>{
      return []
    })
  }

  const handleCardClick = (e) => {
    e.preventDefault();
    
    // resets score if card has been already selected
    const cardText = e.target.innerText;
    if(!selectedCards.find((selectedCard)=>{
        return selectedCard == cardText 
    })){ //if is new card
      setScore((prevScore) => {
        const newScore = prevScore + 1

        if(newScore == gamePoint){
          restartGame()
          setGameStatus("Won")
        }
        else{
          setGameStatus("Playing")
        }

        return newScore > gamePoint? 1 : newScore;
      })
      setSelectedCards((prevSelectedCards)=>{
        return [...prevSelectedCards, cardText]
      })
    }
    else{ //if card has already been selected
      restartGame()
      setGameStatus("Lost")
    }

    //randomize card order
    setCardData((prevCardData)=>{
      return shuffle(prevCardData)
    })
  }

  return (
    <>
    <div className = "scoreboard">
      <p>{gameStatus == "Playing" ? selectCard : gameStatus == "Won" ? winGame :gameStatus == "Lost" ? loseGame : selectCard }</p>
      Score: {score}
    </div>
    <div className = "card_content">
      <div key = {1} className = "card_row">
        {cardData && cardData.map((data, idx)=>{
            if(idx < (cardData.length / 2)){
              return <div key = {data.id}  className = "card"><Card card_name = {data.card_name} src = {data.src} handleCardClick = {handleCardClick}/></div>
            }
          })}
      </div>
      <div key = {2} className = "card_row">
        {cardData && cardData.map((data, idx)=>{
            if(idx >= (cardData.length / 2)){
              return <div key = {data.id} className = "card"><Card card_name = {data.card_name} src = {data.src} handleCardClick = {handleCardClick}/></div>
            }
          })}
      </div>

    </div>

    </>
  )
}

export default App

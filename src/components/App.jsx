import { useEffect, useState } from 'react'
import '../style/App.css'
import {card_names, giphyTranslateUrl, scoreBoardMessagesData} from '../utils/data.jsx'
import Card from './Card.jsx'

function App() {

  const [cardData, setCardData] = useState([])
  const [score, setScore] = useState(null)
  const [selectedCards, setSelectedCards] = useState([])

  const [{newGame}, {loseGame}, {selectCard}, {winGame}] = scoreBoardMessagesData
  const [gameStatus, setGameStatus] = useState(newGame)

  //API call to retrieve images on first render
  let isLoaded = false
  
  useEffect(()=>{
      !isLoaded && card_names.map((card_name, idx)=>{
        fetch(giphyTranslateUrl + card_name.replace(/\s+/g, '%2B'),{mode: 'cors'})
        .then(function(response){
          return response.json()
        })
        .then(function(response){
          setCardData((prevData)=>{
            return [...prevData, {card_name : card_name, src : response.data.images.original.url, id : idx}]
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

  const handleCardClick = (e) => {
    e.preventDefault();
    
    // resets score if card has been already selected
    const cardText = e.target.innerText;
    if(!selectedCards.find((selectedCard)=>{
        return selectedCard == cardText 
    })){ //if is new card
      setScore((prevScore) => {
        return prevScore + 1;
      })
      setSelectedCards((prevSelectedCards)=>{
        return [...prevSelectedCards, cardText]
      })
    }
    else{ //if card has already been selected
      setScore(() => {
        return 0;
      })
      setSelectedCards(()=>{
        return []
      })
      
    }

    //randomize card order
    setCardData((prevCardData)=>{
      return shuffle(prevCardData)
    })
  }

  // update scoreboard message
  useEffect(()=>{
    switch(score){
      case null:
        setGameStatus(newGame)
        break
      case 12:
        setGameStatus(winGame)
        break
      case 0:
        setGameStatus(loseGame)
        break
      default:
        setGameStatus(selectCard)
        break
    }
  },[score])


  return (
    <>
    <div className = "scoreboard">
      <p>{gameStatus}</p>
      Score: {score}
    </div>
    <div className = "card_content">
      <div className = "card_row">
      {cardData && cardData.map((data)=>{
          if(data.id < (cardData.length / 2)){
            return <div className = "card"><Card key = {data.id} card_name = {data.card_name} src = {data.src} handleCardClick = {handleCardClick}/></div>
          }
        })}
      </div>
      <div className = "card_row">
      {cardData && cardData.map((data)=>{
          if(data.id >= (cardData.length / 2)){
            return <div className = "card"><Card key = {data.id} card_name = {data.card_name} src = {data.src} handleCardClick = {handleCardClick}/></div>
          }
        })}
      </div>

    </div>

    </>
  )
}

export default App

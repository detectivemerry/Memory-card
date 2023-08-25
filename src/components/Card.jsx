import { useState } from 'react'
import '../style/Card.css'

export default function Card({card_name, src, handleCardClick}){
    const [cardColor, setCardColor] = useState("lightyellow"); 
    const style = {
        'boxSizing': 'border-box',
        'height': '100%',
        'width': '100%',
        'display': 'flex',
        'flexDirection': 'column',
        'backgroundColor': cardColor
    }

    return(
        <div className = "card_container" onClick={handleCardClick} style = {style} onMouseEnter={() => setCardColor("lightgreen")} onMouseLeave={() => setCardColor("lightyellow")}>
            <div className = "image">
                <img src = {src}></img>
            </div>
            <div className = "image_name">
                {card_name}
            </div>
        </div>
    )
}
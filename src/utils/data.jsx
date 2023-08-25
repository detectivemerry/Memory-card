export const card_names = ['Finn the human', 'Adventure time Lich','Princess Bubblegum',
'Marceline the vampire', 'Ice King','Jake the dog',
'Penguin Gunter', 'Adventure time BMO','Adventure time Abraham Lincoln',
'Adventure time Captain Banana Guard', 'Lumpy space princess','Lady rainicorn'];

const apiKey = import.meta.env.VITE_GIPHY_API_KEY

export const giphyTranslateUrl = `https://api.giphy.com/v1/gifs/translate?api_key=${apiKey}&s=`

export const scoreBoardMessagesData = [
    {"loseGame" : "You lose! Try again by clicking another card."},
    {"selectCard" : "Select all 12 unique cards to win the game."},
    {"winGame" : "You win! Click any card to play again."},
]
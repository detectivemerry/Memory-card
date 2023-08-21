export const card_names = ['Finn the human', 'Adventure time Lich','Princess Bubblegum',
'Marceline the vampire', 'Ice King','Jake the dog',
'Penguin Gunter', 'Adventure time BMO','Adventure time Abraham Lincoln',
'Adventure time Captain Banana Guard', 'Lumpy space princess','Lady rainicorn'];

const apiKey = import.meta.env.VITE_GIPHY_API_KEY

export const giphyTranslateUrl = `https://api.giphy.com/v1/gifs/translate?api_key=${apiKey}&s=`

export const scoreBoardMessagesData = [
    {"newGame" : "Welcome to memory card. Select unique cards 12 times in a row to win!"},
    {"loseGame" : "You lose! Try again by clicking another card!"},
    {"selectCard" : "Good job, you have selected a unique card."},
    {"winGame" : "You win! Click any card to play again"},
]
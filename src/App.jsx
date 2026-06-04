 
// @property {number} interval  days until next review
// @property {number} easeFactor EF   how easy the card is (SM-2)
// @property {string} nextReviw ISO date string

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import wordsData from './data/words';
import { calculateSM2, getDueCards } from './utils/sm2';



 export default function App() {


 const [ cards, setCards] = useState(wordsData)
  const [dueCards, setDueCards] = useState(() => getDueCards(wordsData))
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const [isSessionDone, setSessionDone] = useState(false)

const currentCard = dueCards[currentIndex]

if (isSessionDone || !currentCard) {
  return (
  <Box sx={{ minHeight: "100vh", display: 'flex', alignItems: "center", justifyContent: 
    "center"}}>
      <Typography variant="h5">Session complete! Come back tomorrow for more practice. </Typography>
    </Box>
  )
}

const handleRating = (rating) => {
  // calculate the updated card

  const updatedCard = calculateSM2(currentCard, rating)
  // update the cards array
  const updatedCards = cards.map(card =>
    card.id === updatedCard.id ? updatedCard : card
  )
  setCards(updatedCards)

  // move to the next card and reset flip
  setIsFlipped(false)
  setCurrentIndex(currentIndex + 1)

  if (currentIndex + 1 >= dueCrds.length) {
    setSessionDone(true)
  }
}
   return (
  <Box
  
  sx={{ minHeight: "100vh", display: 'flex', alignItems: 'center', flexDirection: 'column', justifyContent: 'center', gap: 3 

  }}
  >

  {isFlipped && (
<Typography variant="h5">Rate the card to go to the next one</Typography>
  )}


 
  <Card sx={{ width: 400, padding: 2, justifyContent: 'center'}}>
  <CardContent>
    {/* <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
      The Word
    </Typography>
    <Typography variant="h5" component="div">
      {currentCard.word}
      </Typography>
      <Typography>{currentCard.type}</Typography>
     <Typography variant="body2">
     {currentCard.definition}
    
    </Typography>
    <Typography variant="body2" sx={{ color: 'text.secondary', mt:'16px'}}>{currentCard.example}</Typography> */}

     {isFlipped ? (
          <>
           <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
      Definition
    </Typography>
          <Typography>{currentCard.definition}</Typography>
           <Typography gutterBottom sx={{ color: 'text.secondary', mt: "14" }}>
      Example
    </Typography>
          <Typography>{currentCard.example}</Typography>
          </>
        ):(
        <>
         <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
      The Word
    </Typography>
        <Typography variant="h5">{currentCard.word}</Typography>
        <Typography gutterBottom sx={{ color: 'text.secondary'}}>
      Type
    </Typography>
        <Typography>{currentCard.type}</Typography>
        
        </>
      )}
    </CardContent>
      <CardActions>
        <Button size="small" onClick={() => setIsFlipped(!isFlipped)}>Flip</Button>
       {isFlipped && (
        <>
        <Button size="small" color="error" onClick={() => handleRating(1)}>Hard</Button>
        <Button size="small" color="warning" onClick={() => handleRating(3)}>Good</Button>
        <Button size="small" color="success" onClick={() => handleRating(5)}>Easy</Button>
        </>
       )}
       
      </CardActions>
      </Card>
      </Box>
);
    
   
}

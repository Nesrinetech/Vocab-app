import React from 'react'
// This file is pure logic
// The brain of the app


// The first function calculates the updated card after a review
// Recieves a card object and a rating (from 0 to 5)
// It returns the updated card with new interval, easeFactor, repititions and nextReview date.

function calculateSM2(card, rating) {
    let { interval, easeFactor, repetitions } = card

    // Update ease factor
    easeFactor = easeFactor + (0.1 - (5 - rating) * (0.08 + ( 5 - rating) * 0.02))
    if (easeFactor < 1.3) easeFactor = 1.3

    // update interval and repetitions based on rating
    if (rating < 3) {
        // poor rating reset
        repetitions = 0
        interval = 1
    } else {
        // good rating - progress
        if (repetitions === 0) interval = 1
        else if (repetitions === 1) interval = 6
        else interval = Math.round(interval * easeFactor)
        repetitions += 1
    }

    // calculate next review date

    const nextReview = new Date()
    nextReview.setDate(nextReview.getDate() + interval)

    // Return the updated card

    return {
        ...card,
        interval,
        easeFactor,
        repetitions,
        nextReview: nextReview.toISOString().split('T')[0]
    }

}


// Second function filters cards that are due for review today
// It recieves an array of all cards
// It returns the cards where nextReview date is today or earlier

function getDueCards(cards) {
const today = new Date().toISOString().split('T')[0]

return cards.filter(card => card.nextReview <= today)
}
// Each card has a nextReview date, to decide which card should I show the user today, I need to filter the cards that are due for review today or earlier. 

 export { calculateSM2, getDueCards }


// If the user rates a card below 3, the interval and the repetitions are reset to 1.
// If the user rates a card 3 or above, the interval changes how many times the card has been reviewew, the interval should be 1 for the first review, 6 for the second review, and then the previous interval multiplied by the ease factor.
// newInterval = previousInterval * easeFactor
// The ease factor is updated based on the rating 











// const sm2 = () => {

//     // Empty shell 1: the interval
//     // The param it receives is {number}
//     // It returns the number of days until the next review
//     const [interval, setInterval] = React.useState(0)

//     // Empty shell 2: The EaseFactor EF
//     // The param it receives is {number}
//     // It returns the new EF based on the review result

//     const [easeFactor, setEaseFactor] = React.useState(2.5)
//   return (
//     <div>
      
//     </div>
//   )
// }


// export default sm2

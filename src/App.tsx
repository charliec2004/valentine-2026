import { useState } from 'react'
import FloatingElements from './components/FloatingElements/FloatingElements'
import Opening from './components/Opening/Opening'
import PolaroidScroll from './components/PolaroidScroll/PolaroidScroll'
import ValentineAsk from './components/ValentineAsk/ValentineAsk'
import Celebration from './components/Celebration/Celebration'

function App() {
  const [showCelebration, setShowCelebration] = useState(false)

  const handleYesClick = () => {
    setShowCelebration(true)
  }

  return (
    <>
      <FloatingElements intensify={showCelebration} />

      {!showCelebration ? (
        <>
          <Opening />
          <PolaroidScroll />
          <ValentineAsk onYesClick={handleYesClick} />
        </>
      ) : (
        <Celebration />
      )}
    </>
  )
}

export default App

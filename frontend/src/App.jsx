import React, { useEffect, useState } from 'react';
import { fetchTodayGames } from './api';
import GameCard from './components/GameCard';
import { getStored, setStored } from './utils';
import { celebrate } from './confetti';


function App() {
  const todayDateString = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
  // Check lastPlayedDate
  const lastPlayedDate = getStored('lastPlayedDate', todayDateString);

  const isSameDay = lastPlayedDate === todayDateString;

  // If same day, use stored; else reset to default

  //const [currentIndex, setCurrentIndex] = useState(()=> isSameDay ? getStored('currentIndex', 0): 0);
  const [score, setScore] = useState(() => getStored('score', 0));
  const [streak, setStreak] = useState(() => getStored('streak', 0));
  const [lives, setLives] = useState(() => isSameDay ? getStored('lives', 3) : 3);
  const [hintUsed, setHintUsed] = useState(() => isSameDay ? getStored('hintUsed', false) : false);
  const [solvedGames, setSolvedGames] = useState(()=> isSameDay ? getStored('solvedGames',{}):{});

  const [mode, setMode] = useState('easy');  // 'hard' | 'easy'
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetchTodayGames()
      .then(data => {
        setGames(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    setStored('score', score);
    setStored('streak', streak);
    setStored('lives', lives);
    setStored('hintUsed', hintUsed);
    setStored('lastPlayedDate', todayDateString);
    //setStored('currentIndex', currentIndex);
    setStored('solvedGames',solvedGames)

  }, [score, streak, lives, hintUsed,todayDateString,solvedGames]);

  

  const handleGuess = (game, tickerGuess, yearGuess) => {
    let correct = false;
    let pointsEarned = 0;

    const tickerCorrect = tickerGuess.toUpperCase() === game.ticker.toUpperCase();
    const yearCorrect = parseInt(yearGuess) === game.end_year;

    if (tickerCorrect) {
      correct = true;

      const base = hintUsed ? 1 : 2;
      const bonus = streak;
      pointsEarned = base + bonus + (yearCorrect ? 1 : 0);

      setScore(score + pointsEarned);
      setStreak(streak + 1);

      // mark game as solved
      setSolvedGames(prev=> ({
        ...prev,
        [game.id]: true
      }))

    } else {
      setLives(lives - 1);
      setStreak(0);
    }

    return {
      correct,
      points: pointsEarned,
      livesLeft: lives - (correct ? 0 : 1),
    };
  };

  const currentGame = games[mode];
  console.log(currentGame);
  //console.log(games);

  return (
    <div className ="max-w-5xl mx-auto px-6 py-8">
      <h1 className="text-3xl font-bold mb-2">Guess The Stock 📈</h1>
      <p className="text-lg mb-6">🏆 Score: {score} | 🔥 Streak: {streak} | ❤️ Lives: {lives}</p>

      {/* Mode toggle */}
      <div className="flex gap-2 mb-6">
        <button
          className={`px-4 py-2 rounded ${mode === 'hard' ? 'bg-yellow-600 text-white' : 'bg-card border border-gray-700'}`}
          onClick={() => setMode('hard')}
        >
          Hard
        </button>
        <button
          className={`px-4 py-2 rounded ${mode === 'easy' ? 'bg-yellow-600 text-white' : 'bg-card border border-gray-700'}`}
          onClick={() => setMode('easy')}
        >
          Easy
        </button>
        <button
          className={`px-4 py-2 rounded ${'bg-blue-600 text-white' }`}
          onClick={() => celebrate()}
        >
          Confetti
        </button>
      </div>

      {loading && <p>Loading games...</p>}

      {!loading && games.length === 0 && <p>No games found.</p>}

      {!loading && currentGame && (

        
        <>

        

        <GameCard
          key={`${mode}-${currentGame.id}`} 
          game={currentGame}
          onGuess={handleGuess}
          hintUsed={hintUsed}
          setHintUsed={setHintUsed}
          isSolved={!!solvedGames[currentGame.id]}
          date={todayDateString}
          pointsPerCorrect={mode === 'hard' ? 3 : 1}
          showDates={mode === 'easy'}
        />
        </>
        
        
      )}
    </div>
  );
}


export default App;

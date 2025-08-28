
const API_URL = process.env.REACT_APP_API_URL || 'https://l2n8tswpob.execute-api.us-east-2.amazonaws.com/';

export async function fetchTodayGames() {
  const response = await fetch(`${API_URL}/game/today`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch games');
  }
  
  //console.log(API_URL)
  //console.log('test')
  return response.json();
}
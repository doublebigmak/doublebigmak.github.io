
const API_URL = process.env.REACT_APP_API_URL || 'http://ec2-3-135-62-56.us-east-2.compute.amazonaws.com';

export async function fetchTodayGames() {
  const response = await fetch(`${API_URL}/game/today`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch games');
  }
  
  //console.log(API_URL)
  //console.log('test')
  return response.json();
}
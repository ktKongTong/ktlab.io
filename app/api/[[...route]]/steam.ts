export const createSteamAPI = (key: string) => {

  async function fetchWebApi(endpoint: string, method: string, body?: any) {
    const res = await fetch(`https://api.steampowered.com/${endpoint}`, {
      headers: {
        AcceptLanguage: 'zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6',
      },
      method,
      body:JSON.stringify(body)
    });
    return await res.json();
  }

  async function getRecentPlayTime(steamid: string) {
    const res =  (await fetchWebApi(`IPlayerService/GetRecentlyPlayedGames/v1/?key=${key}&steamid=${steamid}`, 'GET'))
    return res?.response?.games ?? []
  }

  async function getOwnedGame(steamid: string) {
    const res =  (await fetchWebApi(`IPlayerService/GetOwnedGames/v1/?key=${key}&steamid=${steamid}`, 'GET'))
    const games = res?.response?.games ?? []
    games.sort((a: any, b: any) => b.rtime_last_played - a.rtime_last_played)
    return games
  }

  return {
    getRecentPlayTime,
    getOwnedGame
  }

}
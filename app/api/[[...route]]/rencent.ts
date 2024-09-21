import {Hono} from "hono";
import {env} from "hono/adapter";

import { createSpotifyAPI } from "./spotify";
import {createSteamAPI} from "@/app/api/[[...route]]/steam";
import {creatGitHubAPI} from "@/app/api/[[...route]]/github";

type ActivityEnv = {
  SPOTIFY_TOKEN: string
  STEAM_API_KEY: string
  GITHUB_TOKEN: string
}

const convertGitHubEvent = (event: any) => {
  const action = event.payload.action
  let ghType: string = ''
  if(action === 'stared') {
    ghType = 'star'
  }

  if(event.type === 'PushEvent' && event.payload.commits) {
    ghType = 'push'
  }

  if(event.type === 'PullRequestEvent' && event.payload.pull_request) {
    ghType = 'pr'
  }

  return {
    type: 'github',
    ghType: ghType,
    relateRepo: event.repo.name,
    relateRepoLink: `https://github.com/${event.repo.name}`,
    actor: event.actor.display_login,
    actorLink: `https://github.com/${event.actor.display_login}`,
    avatar: event.actor.avatar_url,
    public: event.public,
    time: event.created_at ? new Date(event.created_at).getTime() : new Date().getTime(),
    payload: event.payload
  }
}
// export interface GithubActivityProps {
//   ghType: 'issue' | 'pr' | 'star' | 'push',
//   relateRepo: string
//   relateRepoLink: string
//   author: string
//   authorLink: string
//   avatar: string
// }
export const Activity = (app:Hono)=>{

  app.get( '/api/activities/recent', async (c)=> {
    const activityEnv = env<ActivityEnv>(c)
    const spotifyAPI = createSpotifyAPI(activityEnv.SPOTIFY_TOKEN)
    const steamAPI = createSteamAPI(activityEnv.STEAM_API_KEY)
    const githubAPI = creatGitHubAPI(activityEnv.GITHUB_TOKEN)

    const [recentGamePlaytime, recentTracks, recentGitHubEvents]= await Promise.all([
      steamAPI.getOwnedGame("76561198339986544"),
      spotifyAPI.getRecentTracks(),
      githubAPI.getRecentEvent("ktKongTong"),
    ])

    const spotifyActivities = recentTracks.map((recentTrack: any) => ({
      type: 'music',
      platform: 'spotify',
      author: recentTrack.track.artists[0].name,
      name: recentTrack.track.name,
      coverImage: recentTrack.track.album.images[0].url,
      link: recentTrack.track.external_urls.spotify,
      time: new Date(recentTrack.played_at).getTime(),
    }))

    const  recentGitHubEvent = recentGitHubEvents.map((githubEvent:any) => convertGitHubEvent(githubEvent))

    const gameActivities = recentGamePlaytime.slice(0,5).map((playtime: any) => ({
      type: 'game',
      platform: 'steam',
      coverImage: `https://cdn.akamai.steamstatic.com/steam/apps/${playtime.appid}/header.jpg`,
      name: playtime.name,
      length: playtime.playtime_forever,
      link: `https://store.steampowered.com/app/${playtime.appid}`,
      time: playtime.rtime_last_played * 1000,
    }))
    const res = [...spotifyActivities, ...gameActivities, ...recentGitHubEvent]
    res.sort((a,b) => b.time - a.time)
    return c.json({
      status: "ok",
      success: true,
      data: res
    })
  })

}



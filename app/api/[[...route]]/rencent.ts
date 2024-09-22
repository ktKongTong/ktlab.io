import {Hono} from "hono";
import {env} from "hono/adapter";
// import * as _ from 'lodash-ts'
import { createSpotifyAPI } from "./spotify";
import {createSteamAPI} from "@/app/api/[[...route]]/steam";
import {creatGitHubAPI} from "@/app/api/[[...route]]/github";

type ActivityEnv = {
  SPOTIFY_TOKEN: string
  STEAM_API_KEY: string
  GITHUB_TOKEN: string
  STEAM_ID: string
}

const convertGitHubEvent = (event: any) => {
  const action = event.payload.action
  let ghType: string = ''
  if(action === 'started') {
    ghType = 'star'
  }

  if(event.type === 'PushEvent' && event.payload.commits) {
    ghType = 'push'
  }

  if(event.type === 'PullRequestEvent' && event.payload.pull_request) {
    ghType = 'pr'
  }

  return {
    id: Math.random().toString(36),
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

  app.get('/api/activities/recent', async (c)=> {
    const activityEnv = env<ActivityEnv>(c)
    const spotifyAPI = createSpotifyAPI(activityEnv.SPOTIFY_TOKEN)
    const steamAPI = createSteamAPI(activityEnv.STEAM_API_KEY)
    const githubAPI = creatGitHubAPI(activityEnv.GITHUB_TOKEN)

    const [ recentOwnedGame,recentGamePlaytime, recentTracks, recentGitHubEvents]= await Promise.all([
      steamAPI.getOwnedGame(activityEnv.STEAM_ID),
      steamAPI.getRecentPlayTime(activityEnv.STEAM_ID),
      spotifyAPI.getRecentTracks(),
      githubAPI.getRecentEvent("ktKongTong"),
    ])

    const spotifyActivities = recentTracks.map((recentTrack: any) => ({
      id: Math.random().toString(36),
      type: 'music',
      platform: 'spotify',
      author: recentTrack.track.artists[0].name,
      name: recentTrack.track.name,
      coverImage: recentTrack.track.album.images[0].url,
      link: recentTrack.track.external_urls.spotify,
      time: new Date(recentTrack.played_at).getTime(),
    }))

    const  recentGitHubEvent = recentGitHubEvents.map((githubEvent:any) => convertGitHubEvent(githubEvent))
    const gameActivities = recentOwnedGame.slice(0,5).map((game: any) => {
      const recentGame = recentGamePlaytime.find((recentGame: any) => recentGame.appid === game.appid);
      return {
        id: Math.random().toString(36),
        type: 'game',
        platform: 'steam',
        coverImage: `https://cdn.akamai.steamstatic.com/steam/apps/${game.appid}/header.jpg`,
        name: recentGame?.name ?? 'Unknown Game',
        length: recentGame?.playtime_2weeks ?? 0,
        link: `https://store.steampowered.com/app/${game.appid}`,
        time: game.rtime_last_played * 1000,
      };
    });


    // const res = [...spotifyActivities, ...gameActivities, ...recentGitHubEvent]
    // res.sort((a,b) => b.time - a.time)
    const res = {
      music: spotifyActivities,
      game: gameActivities,
      github: recentGitHubEvent,
    }

    return c.json({
      status: "ok",
      success: true,
      data: res
    })
  })

  app.get('/api/activities/recent/music', async (c)=> {
    const before = c.req.query('before')
    const activityEnv = env<ActivityEnv>(c)
    const spotifyAPI = createSpotifyAPI(activityEnv.SPOTIFY_TOKEN)
    const recentTracks = await spotifyAPI.getRecentTracks(10)
    const spotifyActivities = recentTracks.map((recentTrack: any) => ({
      id: Math.random().toString(36),
      type: 'music',
      platform: 'spotify',
      author: recentTrack.track.artists[0].name,
      name: recentTrack.track.name,
      coverImage: recentTrack.track.album.images[0].url,
      link: recentTrack.track.external_urls.spotify,
      time: new Date(recentTrack.played_at).getTime(),
    }))
    return c.json({
      status: "ok",
      success: true,
      data: spotifyActivities
    })
  })

  app.get('/api/activities/recent/game', async (c)=> {
    const before = c.req.query('before')
    const activityEnv = env<ActivityEnv>(c)
    const steamAPI = createSteamAPI(activityEnv.STEAM_API_KEY)
    const [ recentOwnedGame,recentGamePlaytime]= await Promise.all([
      steamAPI.getOwnedGame(activityEnv.STEAM_ID),
      steamAPI.getRecentPlayTime(activityEnv.STEAM_ID),
    ])
    const gameActivities = recentOwnedGame.slice(0,20).map((game: any) => {
      const recentGame = recentGamePlaytime.find((recentGame: any) => recentGame.appid === game.appid);
      return {
        type: 'game',
        platform: 'steam',
        coverImage: `https://cdn.akamai.steamstatic.com/steam/apps/${game.appid}/header.jpg`,
        name: recentGame?.name ?? 'Unknown Game',
        length: recentGame?.playtime_2weeks ?? 0,
        link: `https://store.steampowered.com/app/${game.appid}`,
        time: game.rtime_last_played * 1000,
      };
    });
    return c.json({
      status: "ok",
      success: true,
      data: gameActivities
    })
  })

  app.get('/api/activities/recent/github', async (c)=> {
    const activityEnv = env<ActivityEnv>(c)
    const githubAPI = creatGitHubAPI(activityEnv.GITHUB_TOKEN)
    const recentGitHubEvents = await githubAPI.getRecentEvent("ktKongTong", 20)
    const  recentGitHubEvent = recentGitHubEvents.map((githubEvent:any) => convertGitHubEvent(githubEvent))
    return c.json({
      status: "ok",
      success: true,
      data: recentGitHubEvent
    })
  })
}



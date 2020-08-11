import React, { useContext, useEffect, useState } from "react";
import { StreamerPanel, Schedule, StreamerClip, MusicalTaste } from "./components";
import axios from "axios";
import _ from "lodash";
import { AppContext } from "../Landing";
import "./style.css";

export default function StreamerInfo() {
  const [channelData, setChannelData] = useState({
    mature: false,
    status: "The Longest Day: Fundraiser for Alzheimer's Association",
    broadcaster_language: "en",
    broadcaster_software: "unknown_rtmp",
    display_name: "PaulGoldmanMusic",
    game: "Music & Performing Arts",
    language: "en",
    _id: "116138077",
    name: "paulgoldmanmusic",
    created_at: "2016-02-17T18:07:41Z",
    updated_at: "2020-08-08T17:17:53Z",
    partner: false,
    logo:
      "https://static-cdn.jtvnw.net/jtv_user_pictures/paulgoldmanmusic-profile_image-bc52c53faf2e69b8-300x300.png",
    video_banner:
      "https://static-cdn.jtvnw.net/jtv_user_pictures/paulgoldmanmusic-channel_offline_image-efa519b12421cc21-1920x1080.png",
    profile_banner:
      "https://static-cdn.jtvnw.net/jtv_user_pictures/paulgoldmanmusic-profile_banner-e15a3b5cef4d7ad8-480.png",
    profile_banner_background_color: null,
    url: "https://www.twitch.tv/paulgoldmanmusic",
    views: 13781,
    followers: 915,
    broadcaster_type: "",
    description:
      "Hi! I'm Paul, a classically-trained piano entertainer from Chicago. But I also rock your f'in socks. I'll play/sing your requests, jam out, and talk anything music! ",
    private_video: false,
    privacy_options_enabled: false,
  });
  const [clips, setClips] = useState({});
  console.log('woah', clips);
  const streamers = useContext(AppContext);
  const leadingStreamer = _.get(streamers, "streamers.0.name", "");
  const leadingStreamerName =
    "iron_wolves" || _.last(leadingStreamer.split("/"));
  useEffect(() => {
    if (leadingStreamerName) {
      axios
        .get(
          `https://api.twitch.tv/kraken/users?login=${leadingStreamerName}`,
          {
            headers: {
              Accept: "application/vnd.twitchtv.v5+json",
              "Client-ID": "iw331l7zx5sqkuhfdpu9iwrn37jrgf",
            },
          }
        )
        .then(({ data }) => data.users[0]._id)
        .then((id) => {
          return axios.get(`https://api.twitch.tv/kraken/channels/${id}`, {
            headers: {
              Accept: "application/vnd.twitchtv.v5+json",
              "Client-ID": "iw331l7zx5sqkuhfdpu9iwrn37jrgf",
            },
          });
        })
        .then(({ data }) => {
          setChannelData(data);
          return axios.get(
            `https://api.twitch.tv/kraken/clips/top?channel=${leadingStreamerName}&period=month&trending=true&limit=1`,
            {
              headers: {
                Accept: "application/vnd.twitchtv.v5+json",
                "Client-ID": "iw331l7zx5sqkuhfdpu9iwrn37jrgf",
              },
            }
          );
        })
        .then(({ data }) => {
          setClips(data.clips.length ? data.clips[0] : {});
        });
    }
  }, [leadingStreamerName]);
  console.log(streamers);
  return (
    <div className="streamer-info-wrapper">
      <StreamerPanel
        displayName={channelData.display_name}
        description={channelData.description}
        logoUrl={channelData.logo}
      />
      <Schedule />
      <StreamerClip clip={clips} />
      <MusicalTaste/>
    </div>
  );
}

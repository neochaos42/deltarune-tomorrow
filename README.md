# deltarune-tomorrow

This is a small static site for tracking the probability of **Deltarune Chapter 5** releasing tomorrow.

## Daily news

A Netlify function is included to fetch the most recent upload from the [DailyDeltaNews](https://www.youtube.com/channel/UC0DdLfs6iJcDzaPTE1F9Oxg) YouTube channel. Set an environment variable `YT_API_KEY` to your YouTube API key. The function caches results for 12 hours to avoid hitting the API too often.

The function lives in `netlify/functions/latestNews.js`.

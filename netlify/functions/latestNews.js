let cache = null;
let lastFetched = 0;

exports.handler = async function (event, context) {
  const now = Date.now();
  const twelveHours = 12 * 60 * 60 * 1000;

  if (cache && now - lastFetched < twelveHours) {
    return {
      statusCode: 200,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify(cache),
    };
  }

  const API_KEY = process.env.YT_API_KEY;
  const CHANNEL_ID = 'UC0DdLfs6iJcDzaPTE1F9Oxg'; // DailyDeltaNews
  const url = `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&order=date&part=snippet&type=video&maxResults=1`;

  try {
    const res = await fetch(url);
    const data = await res.json();
    const videoId = data.items?.[0]?.id?.videoId;

    if (!videoId) throw new Error('No video found.');

    cache = { videoId };
    lastFetched = now;

    return {
      statusCode: 200,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify(cache),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};

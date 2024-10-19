import axios from "axios";
import * as cheerio from 'cheerio';
import api from "./Api.js";



export async function searchSong(query) {
    try {
        const res = await api.get(`/search`, {
            params: {
                q: query,
            },
        });
        if (res.data.response.hits.length > 0) {
            return res.data.response.hits.map(hit => ({
                title: `${hit.result.title} by ${hit.result.primary_artist.name}`,
                id: hit.result.id,
            }));
        } else {
            return 'No songs found :C';
        }
    } catch (error) {
        console.error('Error searching for song 😥:', error.response ? error.response.data : error.message);
    }
}

export async function getSongLyrics(songId) {

    try {
        const res = await api.get(`/songs/${songId}`);

        const lyricsRes = await axios.get(`https://genius.com${res.data.response.song.path}`);

        const $ = cheerio.load(lyricsRes.data);
        const lyricsDivs = $('div[class*="Lyrics__Container"]');
        // this hell line
        const lyrics = lyricsDivs.map((i, element) => $(element).html().replace(/<br\s*\/?>/gi, '\n').replace(/<[^>]*>/g, '')).get().join('\n');
        return lyrics;
    } catch (error) {
        console.error('Error getting lyrics 😥:', error.response ? error.response.data : error.message);
    }
}



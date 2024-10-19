#!/usr/bin/env node

import yoctoSpinner from "yocto-spinner";
import { clearConsole, colorize, promptUser } from "./src/util.js";
import { getSongLyrics, searchSong } from "./src/service.js";
import { selectSongWithArrows } from "./src/user.js";

let firstTime = true;

const args = process.argv.slice(2);
let songTitle = args[0] || '';

(async () => {
    clearConsole();
    while (true) {
        if (!songTitle) {
            songTitle = await promptUser(colorize(firstTime ? 'What song lyrics would you like to find? (or type "exit" to quit):' : "Got another song in mind:").white);
        }
        if (firstTime) {
            firstTime = false
        }
        if (songTitle.toLowerCase() === 'exit') {
            console.log('Goodbye 😭!');
            break;
        }

        const searchSpinner = yoctoSpinner({
            text: 'Searching for songs~~~',
        }).start();

        try {
            const songs = await searchSong(songTitle);
            searchSpinner.stop();

            if (songs && songs.length > 0) {
                clearConsole();
                const selectedSong = await selectSongWithArrows(songs);

                if (selectedSong) {
                    const lyricsSpinner = yoctoSpinner({ text: 'Loading lyrics~~' }).start();

                    try {
                        const lyrics = await getSongLyrics(selectedSong.id);
                        lyricsSpinner.stop();

                        clearConsole();
                        if (lyrics) {
                            console.log(`\x1b[33mLyrics for "${selectedSong.title}" ;3\x1b[0m\n`);
                            console.log(colorize(lyrics).blue);
                            console.log("\n");
                        } else {
                            console.log('Lyrics not found :C');
                        }
                    } catch (error) {
                        lyricsSpinner.stop();
                        console.log('Error fetching lyrics 😭:', error.message);
                    }
                }
            } else {
                console.log('No songs found ☹');
            }
        } catch (error) {
            searchSpinner.stop();
            console.log('Error searching for songs 😢:', error.message);
        }
        songTitle = '';
    }
})();

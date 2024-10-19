import readline from 'readline';

function displaySongs(songs, selectedIndex) {
    console.log('Use arrow keys to navigate, press Enter to select ->w<-:\n');
    songs.forEach((song, index) => {
        if (index === selectedIndex) {
            console.log(`\x1b[32m> ${song.title}\x1b[0m\n`);
        } else {
            console.log(`  ${song.title}\n`);
        }
    });
}

export function selectSongWithArrows(songs) {
    return new Promise((resolve) => {
        let i = 0;

        console.clear();
        displaySongs(songs, i);

        readline.emitKeypressEvents(process.stdin);
        process.stdin.setRawMode(true);

        process.stdin.on('keypress', (str, key) => {
            if (key.name === 'up' && i > 0) {
                i--;
                console.clear();
                displaySongs(songs, i);
            } else if (key.name === 'down' && i < songs.length - 1) {
                i++;
                console.clear();
                displaySongs(songs, i);
            } else if (key.name === 'return') {
                process.stdin.setRawMode(false);
                process.stdin.pause();
                resolve(songs[i]);
            } else if (key.name === 'escape') {
                process.stdin.setRawMode(false);
                process.stdin.pause();
                console.log(`  Exiting... 😥`);
                process.exit(0);
            }
        });

        process.stdin.resume();
    });
}
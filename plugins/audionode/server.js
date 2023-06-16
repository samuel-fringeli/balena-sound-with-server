var express = require('express');
var exec = require('child_process').exec;
var app = express();
var port = 3000;

app.use(express.json());

const playSound = (filePath, res) => {
    exec("mplayer " + filePath,
        function (error, stdout, stderr) {
            if (error !== null) {
                res.status(500).send(`Could not play sound: ${error}`);
            } else {
                res.status(200).send('Sound played!');
            }
        }
    );
}


const soundList = {
    "green": {
        "click": ["./sah_quel_plaisir.wav", "./plus_parler.wav",],
        "double-click": ["./femal_orgasm.wav", "./heil_hitler.wav"],
        "index": 0
    },
    "white": {
        "click": ["./sah_quel_plaisir_2.wav", "./Oh_Yeah_sound_effect.wav"],
        "double-click": ["./fart_2.wav", "./fart_1.wav"],
        "index": 0
    },
    "blue": {
        "click": ["./sah_quel_plaisir.wav", "./et_bah_voila_ca_fait_plaisir.wav"],
        "double-click": ["./fart_2.wav", "./fart_1.wav"],
        "index": 0
    },
}

app.get('/', (req, res) => {
    res.send('server running');
});

app.post('/white-click', (req, res) => {
    playSound(soundList["white"]["click"][soundList["white"]["index"]], res);
});

app.post('/white-double-click', (req, res) => {
    playSound(soundList["white"]["double-click"][soundList["white"]["index"]], res);
});

app.post('/white-hold', (req, res) => {
    soundList["white"]["index"] = soundList["white"]["index"] === 1 ? 0 : 1;
    playSound("./fils_blanc.wav", res);
});

app.post('/blue-click', (req, res) => {
    playSound(soundList["blue"]["click"][soundList["blue"]["index"]], res);
});

app.post('/blue-double-click', (req, res) => {
    playSound(soundList["blue"]["double-click"][soundList["blue"]["index"]], res);
});

app.post('/blue-hold', (req, res) => {
    soundList["blue"]["index"] = soundList["blue"]["index"] === 1 ? 0 : 1;
    playSound("./fils_bleu.wav", res);
});

app.post('/green-click', (req, res) => {
    playSound(soundList["green"]["click"][soundList["green"]["index"]], res);
});

app.post('/green-double-click', (req, res) => {
    playSound(soundList["green"]["double-click"][soundList["green"]["index"]], res);
});

app.post('/green-hold', (req, res) => {
    soundList["green"]["index"] = soundList["green"]["index"] === 1 ? 0 : 1;
    playSound("./fils_vert.wav", res);
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

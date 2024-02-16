const app = require('express')();
const SystemInfo = require('./SystemInfo/system');

app.get('/', (req, res) => {
    res.status(200).send('ok');
});

app.get('/currentStats', async (req, res) => {
    try {
        const result = await SystemInfo.getStats();
        res.status(200).send(result);      
    } catch (error) {
        res.status(500).send(error.message);
    }
}); 
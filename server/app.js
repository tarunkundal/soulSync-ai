import express from 'express';

const app = new express()

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(4000, () => {
    console.log('server running');

})
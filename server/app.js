const express = require('express');
const merchantRoutes = require('./routes/merchants');
const productRoutes = require('./routes/products');
const { errorHandler, verifyToken } = require('./middleware')
const authHandlers = require('./handlers/auth')
const mathHandlers = require('./handlers/math')


const app = express();

app.use(express.json());

app.post('/api/login', authHandlers.login);
app.post('/api/token', authHandlers.refreshAccessToken);
app.use('/api/merchants', merchantRoutes);
app.use('/api/merchants/:merchantId/products', productRoutes);

app.post('/checkoddeven', mathHandlers.checkOddEven);
app.post('/sum', mathHandlers.sum);
app.get('/get-zero', mathHandlers.getZero);
app.get('/is-21-century', mathHandlers.is21Century);
app.get('/holiday', mathHandlers.checkHoliday);
app.get('/kabisation', mathHandlers.isKabisat);

app.use(errorHandler);
app.use('*', (req, res, next) => {
    res.status(404).json({ error: `unknown route` });
});


module.exports = app;
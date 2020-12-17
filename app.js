/* eslint-disable no-console */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/order */
const createError = require('http-errors');
const bodyParser = require('body-parser');
const express = require('express');
const favicon = require('serve-favicon');
const session = require('express-session');
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const fetch = require('node-fetch');

const app = express();

// const logger = require("morgan");
const compression = require('compression');
// const helmet = require('helmet');

// app.use(logger("dev"));

require('dotenv').config();

// const error = require('console');
const indexRouter = require('./routes/index');
const api = require('./api/index');
const { isObject } = require('util');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(
	express.json({
		limit: '1mb',
	})
);
app.use(
	bodyParser.urlencoded({
		extended: false,
	})
);
app.use(cookieParser());
app.use(compression());
app.use(cors());
// app.use(helmet());

app.use('/md', express.static(path.join(__dirname, '/node_modules')));
app.use(
	'/st',
	express.static(
		path.join(__dirname, '/public')
		// , {
		// 	immutable: true,
		// 	setHeaders: function (res) {
		// 		res.set('Cache-control', 'public, max-age=31536000');
		// 	},
		// }
	)
);
app.use(favicon(path.join(__dirname, 'public/images/appicon.png')));
// session
app.use(
	session({
		name: 'session-id',
		secret: '0783587149',
		resave: false,
		saveUninitialized: false,
		cookie: {
			// secure: true,
			maxAge: new Date(Date.now() + 30 * 86400 * 1000),
		},
	})
);

const server = require('http').createServer(app);
const io = require('socket.io')(server);
// No logged in
app.use('/api', api);

// Logged
app.use('/', indexRouter);
// catch 404 and forward to error handler
app.use((req, res, next) => {
	next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('main/error');
});

// Tao socket
let response;
const fetchCmt = async (pkgData) => {
	let options = {
		method: 'POST',
		body: JSON.stringify(pkgData),
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json',
		},
	};
	try {
		response = await fetch('http://localhost:3000/api/addCmt', options).then((x) => x.json());
	} catch (error) {
		console.log(error);
	}
};
let rsHistory;
const fetchCmtHistory = async (selected) => {
	try {
		rsHistory = await fetch(`http://localhost:3000/api/historyCmt/${selected}`).then((x) => x.json());
	} catch (error) {
		console.log(error);
	}
};
io.on('connection', async (socket) => {
	const comment = require('./socket.io/comment');
	socket.on('selected', async (selected) => {
		lessonSelected = selected;
		await fetchCmtHistory(selected);
		io.emit('history', rsHistory);
		socket.on('sendFromClient', async (data) => {
			let jsonPOST = {};
			try {
				// tách lessonID vs data ra riêng
				jsonPOST.lessonSelected = selected;
				jsonPOST.cmt = data;
				// POST arr cmt moi den csdl
				await fetchCmt(jsonPOST);
				// Gui data vua nhap den tat ca client
				io.emit('sendFromServer', data);
				// console.log(sv);
			} catch (error) {
				console.log(error);
			}
		});
	});
});

const port = process.env.PORT || 3000;
server.listen(port, () => {
	console.log(`Server Started!${port}`, 'http://localhost:3000/');
});
module.exports = {
	io,
};

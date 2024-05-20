import user from './user.js';
import auth from './auth.js';
import pagination from './pagination.js';
import search from './search.js';
import post from './post.js';
import tour from './tour.js';
import booking from './booking.js';
import place from './place.js';
import payment from './payment.js';
import messages from './message.js';
import notification from "./notification.js"
import notificationclient from "./notificationclient.js"
const initRouter = (app) => {
    app.use('/api/v1/user', user);
    app.use('/api/v1/auth', auth);
    app.use('/api/v1/pagination', pagination);
    app.use('/api/v1/search', search);
    app.use('/api/v1/post', post);
    app.use('/api/v1/tour', tour);
    app.use('/api/v1/booking', booking);
    app.use('/api/v1/place', place);
    app.use('/api/v1/payment', payment);
    app.use('/api/v1/messages', messages);
    app.use('/api/v1/notification', notification);
    app.use('/api/v1/notificationclient', notificationclient);

}

module.exports = initRouter
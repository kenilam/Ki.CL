import moment from 'moment';

const toDate = (timestamp, format = 'DD MMMM, YYYY') =>
    moment(timestamp * 1000).format(format);

export default toDate;

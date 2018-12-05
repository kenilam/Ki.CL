import moment from 'moment';

const agesAgo = timestamp => moment(timestamp * 1000).fromNow();

export default agesAgo;

export const numberFormat = (number:any) => {
  return new Intl.NumberFormat('en-US').format(number)
}

export const truncateAddress = (address:string) => {
  return `${address.slice(0, 6)}...${address.slice(-4)}`
}

export const truncateTx = (tx:string) => {
  return `${tx.slice(0, 12)}...`
}

const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec'
]

export const getDateTimeFormat = (time:any) => {
  time = new Date(time);
  let hour = time.getHours() > 9 ? time.getHours() : `0${time.getHours()}`
  let minute = time.getMinutes() > 9 ? time.getMinutes() : `0${time.getMinutes()}`
  let second = time.getSeconds() > 9 ? time.getSeconds() : `0${time.getSeconds()}`
  return `${months[time.getMonth()]} ${time.getDate()}, ${time.getFullYear()} ${hour}:${minute}:${second}`
}

export const getTimeAgo = (from:any) => {
  let diff = Math.abs(new Date().getTime() - new Date(from).getTime()) / 1000;
  const time:any = {};

  const timeMap = {
    day: 86400,
    hour: 3600,
    minute: 60,
    second: 1
  };

  Object.keys(timeMap).forEach(function(key){
    time[key] = Math.floor(diff / timeMap[key]);
    diff -= time[key] * timeMap[key];
  });
  
  if( time.day > 1 ) {
    return `${time.day} day${getMulti(time.day)} ago`
  }

  if (time.hour > 0) {
    return `${time.hour} hour${getMulti(time.hour)} ago`
  }

  if (time.minute > 0) {
    return `${time.minute} minute${getMulti(time.minute)}, ${time.second} second${getMulti(time.second)} ago`
  }

  return `${time.second} second${getMulti(time.second)} ago`
}

const getMulti = (value:Number) => {
  return value > 1 ? 's' : ''
}
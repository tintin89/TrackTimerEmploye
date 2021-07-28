export const formatCount = (count)=>{
    const hours = Math.floor((count/(60*60)));
    const minutes = Math.floor((count/60)%60);
    const seconds = count%60;
    const formatedHours = String(hours).length === 1 ? `0${hours}` : hours;
    const formatedSecond = String(seconds).length === 1 ? `0${seconds}`: seconds;
    const formatedMinute = String(minutes).length === 1 ? `0${minutes}`: minutes;
    return {formatedHours,formatedMinute,formatedSecond};
}
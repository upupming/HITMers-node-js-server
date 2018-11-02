const queries = require('../db/queries/shifts');
const users = require('../db/queries/users');

function getDateDistance(startMonth, startDay, endMonth, endDay) {
  const ONE_DAY = 24*60*60*1000;
  let endDate = new Date(), startDate = new Date();
  endDate.setMonth(endMonth - 1, endDay);
  startDate.setMonth(startMonth - 1, startDay);
  return Math.round((endDate - startDate)/ONE_DAY);
}
// Descending sort according to reputation, return > 0 when a.reputation < b.reputation
function reputationCompare(a, b) {
  return a.reputation < b.reputation ? 1 : -1;
}
// Descending sort according to status ['working', 'waiting', 'studying'], return > 0 when a.status < b.status
function statusCompare(a, b) {
  if(a.status === 'working') {
    return -1;
  } else if(a.status === 'waiting') {
    if(b.status === 'working') {
      return 1;
    } else return -1;
  } else {
    if(b.status === 'working' || b.status === 'waiting') {
      return 1;
    } else return -1;
  }
}

function convertToNumber(query) {
  query.startMonth = Number(query.startMonth);
  query.startDay = Number(query.startDay);
  query.endMonth = Number(query.endMonth);
  query.endDay = Number(query.endDay);
  return query;
}

module.exports = {
  async postShift(ctx) {
    if(ctx.request.body.id !== ctx.req.user.id) {
      ctx.body = 'User is not allowed to add shifts for other users.';
      ctx.status = 403;
      return;
    }
    ctx.request.body.name = ctx.req.user.name;
    ctx.body = await queries.addShift(ctx.request.body);
  },
  async getShifts(ctx) {
    ctx.query = convertToNumber(ctx.query);
    let rawShifts = await queries.getShiftsDuring(ctx.query);
    let totalDays = getDateDistance(ctx.query.startMonth, ctx.query.startDay, ctx.query.endMonth, ctx.query.endDay) + 1;
    let sortedShiftsArray = [];
    for(let i = 0; i < totalDays; i++) {
      sortedShiftsArray[i] = [];
      for(let j = 0; j<2; j++) {
        sortedShiftsArray[i][j] = [];
      }
    }
    for(let shift of rawShifts) {
      // 相距天数：第一维索引
      let dayIndex = getDateDistance(ctx.query.startMonth, ctx.query.startDay, shift.month, shift.day);
      // 上下午：第二维索引
      let periodIndex = shift.morning ? 0 : 1;
      // 加入第三维中
      await users.findUser({id: shift.id})
        .then(data => {
          let element = data[0];
          element.shift_id = shift.shift_id;
          element.status = shift.status;
          sortedShiftsArray[dayIndex][periodIndex].push(element);
        });
    }
    // 按值班状态、声誉排序
    // 第一维：日期
    for(let dayIndex = 0; dayIndex < totalDays; dayIndex++) {
      // 第二维：上下午
      for(let periodIndex = 0; periodIndex < 2; periodIndex++) {
        sortedShiftsArray[dayIndex][periodIndex].sort(reputationCompare);
        sortedShiftsArray[dayIndex][periodIndex].sort(statusCompare);
      }
    }
  
    ctx.response.body = sortedShiftsArray; 
  },
  async getShift(ctx) {
    ctx.query = convertToNumber(ctx.query);
    if(ctx.params.id !== ctx.req.user.id) {
      ctx.body = 'This user is not allowed to get other users\' shifts.';
      ctx.status = 403;
      return;
    }

    let filter = ctx.query;
    filter.id = ctx.params.id;
    ctx.body = await queries.getShiftsDuring(filter);
  },

  async deleteShift(ctx) {
    ctx.body = await queries.deleteShift(ctx.params.shift_id);
    if(!ctx.body || ctx.body == '') {
      ctx.status = 404;
      ctx.body = 'No such shift id.';
    }
  }
};
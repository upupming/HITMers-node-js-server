const queries = require('../db/queries/visitors');

function getDateDistance(startDate, endDate) {
  const ONE_DAY = 24*60*60*1000;
  return Math.round((endDate - startDate)/ONE_DAY);
}

// Ascending sort according to arriving time, return > 0 when a.arriving > b.arriving
function arrivingCompare(a, b) {
  return a.arriving > b.arriving ? 1 : -1;
}
/**
 * Return 1 if date >= 12:30, else -1
 * @param {Date} date 
 */
function getPeriodIndex(date) {
  let curHour = date.getHours();
  if(curHour >= 13) {
    return 1;
  } else if(curHour == 12 && date.getMinutes() >= 30) {
    return 1;
  }
  return 0;
}

module.exports = {
  async postVisitor(ctx) {
    ctx.body = await queries.addVisitor(ctx.request.body);
  },
  async getVisitors(ctx) {
    let startDateTime = new Date(ctx.query.startDateTime);
    let endDateTime = new Date(ctx.query.endDateTime);
    let rawVisitors = await queries.getVisitorsDuring({startDateTime, endDateTime});
    let totalDays = getDateDistance(startDateTime, endDateTime) + 1;
    let sortedVisitorsArray = [];
    for(let i = 0; i < totalDays; i++) {
      sortedVisitorsArray[i] = [];
      for(let j = 0; j < 2; j++) {
        sortedVisitorsArray[i][j] = [];
      }
    }
    for(let visitor of rawVisitors) {
      // 相距天数：第一维索引
      let dayIndex = getDateDistance(startDateTime, visitor.arriving);
      // 上下午：第二位索引
      let periodIndex = getPeriodIndex(visitor.arriving);
      // 加入第三维中
      sortedVisitorsArray[dayIndex][periodIndex].push(visitor);
    }
    // 每个时间段按到达时间进行升序排列
    for(let dayIndex = 0; dayIndex < totalDays; dayIndex++) {
      for(let periodIndex = 0; periodIndex < 2; periodIndex++) {
        sortedVisitorsArray[dayIndex][periodIndex].sort(arrivingCompare);
      }
    }

    ctx.response.body = sortedVisitorsArray;
  },

  async deleteVisitor(ctx) {
    ctx.body = await queries.deleteVisitor(ctx.params.visitor_id);
    if(!ctx.body || ctx.body == '') {
      ctx.status = 404;
      ctx.body = 'No such visitor id.';
    }
  }
};
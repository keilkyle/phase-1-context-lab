/* Your Code Here */

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */


 
function createEmployeeRecord (employee) {
    return {
        "firstName": employee[0],
        "familyName": employee[1],
        "title": employee[2],
        "payPerHour": employee[3],
        "timeInEvents": [],
        "timeOutEvents": []
    }
}

function createEmployeeRecords (array) {
    return array.map(employee => createEmployeeRecord(employee))
}

function createTimeInEvent(timeDateString) {
    let obj = {
        "type": "TimeIn",
        "date": timeDateString.substring(0,10),
        "hour": parseInt(timeDateString.substring(11,13))*100
    }
    this.timeInEvents.push(obj)
    return this
}

function createTimeOutEvent(timeDateString) {
    let obj = {
        "type": "TimeOut",
        "date": timeDateString.substring(0,10),
        "hour": parseInt(timeDateString.substring(11,13))*100
    }
    this.timeOutEvents.push(obj)
    return this
}

const hoursWorkedOnDate = function(dateSearch) {
    const clockIn = this.timeInEvents.find(e => e.date === dateSearch) 
    const clockOut = this.timeOutEvents.find(e => e.date === dateSearch) 
    return (clockOut.hour - clockIn.hour)/100
}

const wagesEarnedOnDate = function(dateSearch) {
    let hours = hoursWorkedOnDate.call(this, dateSearch)
    return hours * this.payPerHour
}

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

function findEmployeeByFirstName (srcArray, firstNameString) {
    return srcArray.find(person => person.firstName === firstNameString)
}

function calculatePayroll (fullPayroll) {
    let answer = 0
    fullPayroll.forEach(e => answer += allWagesFor.call(e))
    return answer
}

const csvDataEmployees = [
    ["Thor", "Odinsson", "Electrical Engineer", 45],
    ["Loki", "Laufeysson-Odinsson", "HR Representative", 35],
    ["Natalia", "Romanov", "CEO", 150],
    ["Darcey", "Lewis", "Intern", 15],
    ["Jarvis", "Stark", "CIO", 125],
    ["Anthony", "Stark", "Angel Investor", 300]
  ]

  const csvTimesIn = [
    ["Thor", ["2018-01-01 0800", "2018-01-02 0800", "2018-01-03 0800"]],
    ["Loki", ["2018-01-01 0700", "2018-01-02 0700", "2018-01-03 0600"]],
    ["Natalia", ["2018-01-03 1700", "2018-01-05 1800", "2018-01-03 1300"]],
    ["Darcey", ["2018-01-01 0700", "2018-01-02 0800", "2018-01-03 0800"]],
    ["Jarvis", ["2018-01-01 0500", "2018-01-02 0500", "2018-01-03 0500"]],
    ["Anthony", ["2018-01-01 1400", "2018-01-02 1400", "2018-01-03 1400"]]
  ]

  const csvTimesOut = [
    ["Thor", ["2018-01-01 1600", "2018-01-02 1800", "2018-01-03 1800"]],
    ["Loki", ["2018-01-01 1700", "2018-01-02 1800", "2018-01-03 1800"]],
    ["Natalia", ["2018-01-03 2300", "2018-01-05 2300", "2018-01-03 2300"]],
    ["Darcey", ["2018-01-01 1300", "2018-01-02 1300", "2018-01-03 1300"]],
    ["Jarvis", ["2018-01-01 1800", "2018-01-02 1800", "2018-01-03 1800"]],
    ["Anthony", ["2018-01-01 1600", "2018-01-02 1600", "2018-01-03 1600"]]
  ]

  let employeeRecords = createEmployeeRecords(csvDataEmployees)
            employeeRecords.forEach(function (rec) {
              let timesInRecordRow = csvTimesIn.find(function (row) {
                return rec.firstName === row[0]
              })

              let timesOutRecordRow = csvTimesOut.find(function (row) {
                return rec.firstName === row[0]
              })

              timesInRecordRow[1].forEach(function(timeInStamp){
                createTimeInEvent.call(rec, timeInStamp)
              })

              timesOutRecordRow[1].forEach(function(timeOutStamp){
                createTimeOutEvent.call(rec, timeOutStamp)
              })})

calculatePayroll(employeeRecords)
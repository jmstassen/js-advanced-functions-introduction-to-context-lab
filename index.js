// Your code here
function createEmployeeRecord(srcArray) {
  let employeeRecord = {
      "firstName" : `${srcArray[0]}`,
      "familyName" : `${srcArray[1]}`,
      "title" : `${srcArray[2]}`,
      "payPerHour" : srcArray[3],
      "timeInEvents" : [],
      "timeOutEvents" : []
  }
  return employeeRecord
}

function createEmployeeRecords(srcArray) {
    let newArray = srcArray.map(x => createEmployeeRecord(x))
    return newArray
}

function createTimeInEvent(employeeObj, dateString) {
    let [date, hour] = dateString.split(' ');

    employeeObj.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date: date,
    })

    return employeeObj;
}

function createTimeOutEvent(employeeObj, dateString) {
    let [date, hour] = dateString.split(' ');

    employeeObj.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date: date,
    })

    return employeeObj;
}

function hoursWorkedOnDate(employeeObj, dateString) {
    let dayIn = employeeObj.timeInEvents.find(function(e) {
        return e.date === dateString
    })

    let dayOut = employeeObj.timeOutEvents.find(function(e) {
        return e.date === dateString
    })

    let hoursWorked = (dayOut.hour - dayIn.hour) / 100;
    return hoursWorked;
}

function wagesEarnedOnDate(employeeObj, dateString) {
    let wagesEarned = employeeObj.payPerHour * hoursWorkedOnDate(employeeObj, dateString);
    return wagesEarned
}

function allWagesFor(employeeObj) {
    let datesWorked = employeeObj.timeInEvents.map(e => {
        return e.date
    })
    let allPay = datesWorked.reduce((count, pay) => count + wagesEarnedOnDate(employeeObj, pay), 0);
    return allPay;
}

function calculatePayroll(employees) {
    let payroll = employees.reduce((count, employee) => count + allWagesFor(employee), 0);
    return payroll;
}

function findEmployeeByFirstName(srcArray, firstName) {
    return srcArray.find(function(e) {
        return e.firstName === firstName
    })
}


// TODO: Modify this function
function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function generateShortCode(storeId, transactionId) {
  // Logic goes here
  let randomNo = randomIntFromInterval(1, 9); //1 to 9
  let plainText = "";
  let encryptString = "";
  storeIdString = storeId.toString().padStart(3, "0"); //add 0s before store ID string
  transactionIdString = transactionId.toString().padStart(5, "0"); //add 0s before transaction ID string
  plainText += randomNo + storeIdString + transactionIdString;

  let myArr = plainText.split("");

  for (let i = 1; i < myArr.length; i++) {
    myArr[i] = (parseInt(myArr[i]) + randomNo) % 10;
  }
  encryptString = myArr.join("");
  return encryptString;
}

// TODO: Modify this function
function decodeShortCode(shortCode) {
  // Logic goes here
  let myArr = shortCode.split("");
  let randomNo = parseInt(myArr[0]);
  for (let i = 1; i < myArr.length; i++) {
    myArr[i] =
      parseInt(myArr[i]) - randomNo >= 0
        ? parseInt(myArr[i]) - randomNo
        : parseInt(myArr[i]) - randomNo + 10; //if negative then +10
  }
  let storeId = myArr[1].toString() + myArr[2].toString() + myArr[3].toString();
  let transactionId =
    myArr[4].toString() +
    myArr[5].toString() +
    myArr[6].toString() +
    myArr[7].toString() +
    myArr[8].toString();
  return {
    storeId: parseInt(storeId), // store id goes here,
    shopDate: new Date(), // the date the customer shopped,
    transactionId: parseInt(transactionId), // transaction id goes here
  };
}

// ------------------------------------------------------------------------------//
// --------------- Don't touch this area, all tests have to pass --------------- //
// ------------------------------------------------------------------------------//
function RunTests() {
  var storeIds = [175, 42, 0, 9];
  var transactionIds = [9675, 23, 123, 7];

  storeIds.forEach(function (storeId) {
    transactionIds.forEach(function (transactionId) {
      var shortCode = generateShortCode(storeId, transactionId);
      var decodeResult = decodeShortCode(shortCode);
      $("#test-results").append(
        "<div>" + storeId + " - " + transactionId + ": " + shortCode + "</div>"
      );
      AddTestResult("Length <= 9", shortCode.length <= 9);
      AddTestResult("Is String", typeof shortCode === "string");
      AddTestResult("Is Today", IsToday(decodeResult.shopDate));
      AddTestResult("StoreId", storeId === decodeResult.storeId);
      AddTestResult("TransId", transactionId === decodeResult.transactionId);
    });
  });
}

function IsToday(inputDate) {
  // Get today's date
  var todaysDate = new Date();
  // call setHours to take the time out of the comparison
  return inputDate.setHours(0, 0, 0, 0) == todaysDate.setHours(0, 0, 0, 0);
}

function AddTestResult(testName, testResult) {
  var div = $("#test-results").append(
    "<div class='" +
      (testResult ? "pass" : "fail") +
      "'><span class='tname'>- " +
      testName +
      "</span><span class='tresult'>" +
      testResult +
      "</span></div>"
  );
}

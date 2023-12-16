// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
var submitBtn = $(".saveBtn");
var currentHour = dayjs().format("HH");
var hourEl = $(".hour");
var textEl = $(".description");
var hourBlockEl = {
  hour9: $("#hour-9 .time-block"),
  hour10: $("#hour-10 .time-block"),
  hour11: $("#hour-11 .time-block"),
  hour12: $("#hour-12 .time-block"),
  hour13: $("#hour-1 .time-block"),
  hour14: $("#hour-2 .time-block"),
  hour15: $("#hour-3 .time-block"),
  hour16: $("#hour-4 .time-block"),
  hour17: $("#hour-5 .time-block"),
};

$(function () {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  displayToDo();

  submitBtn.on("click", function (event) {
    event.preventDefault();
    var hour = $(this).siblings(".hour").text();
    var toDo = $(this).siblings(".description").val();

    localStorage.setItem(hour, toDo);
    renderMessage();
  });

  function renderMessage() {
    var headerEl = $("#heading");
    var saveEl = $("<p>");
    saveEl.text("Appointment added to localStorage ✅");
    headerEl.append(saveEl);
  }

  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
function timeBlockColor () {
 
$.each (hourBlockEl, function () {
    // var hourNumber = hourBlockEl.replace(/hour/, "");
    // console.log(hourNumber)


    if (currentHour < hourBlockEl) {
      hourBlockEl.addClass(".past");
      hourBlockEl.removeClass(".present .future")
    } else if (currentHour === hourBlockEl) {
      hourBlockEl.addClass(".present");
      hourBlockEl.removeClass(".past .future")
    } else if (currentHour > hourBlockEl) {
      hourBlockEl.addClass(".future");
      hourBlockEl.removeClass(".past .present")
    };
  });
};

timeBlockColor();
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  function displayToDo() {
    $("#hour-9").children(1).val(localStorage.getItem("9AM"));
    $("#hour-10").children(1).val(localStorage.getItem("10AM"));
    $("#hour-11").children(1).val(localStorage.getItem("11AM"));
    $("#hour-12").children(1).val(localStorage.getItem("12PM"));
    $("#hour-1").children(1).val(localStorage.getItem("1PM"));
    $("#hour-2").children(1).val(localStorage.getItem("2PM"));
    $("#hour-3").children(1).val(localStorage.getItem("3PM"));
    $("#hour-4").children(1).val(localStorage.getItem("4PM"));
    $("#hour-5").children(1).val(localStorage.getItem("5PM"));
  }

  // TODO: Add code to display the current date in the header of the page.
  function displayDate() {
    var currentDate = dayjs().format("dddd, MMMM Do, HH:mm:ss");
    $("#currentDay").text(currentDate);
  }
  displayDate();
  setInterval(displayDate, 1000);
});

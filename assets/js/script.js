// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
var submitBtn = $(".saveBtn");
var currentHour = dayjs().hour();
var hourEl = $(".hour");
var textEl = $(".description");
var headerEl = $("#heading");
var saveEl = $("<div>");

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
    var hour = $(this).parent().attr("id");
    var toDo = $(this).siblings(".description").val();
    localStorage.setItem(hour, toDo);
    renderMessage();
  });

  function renderMessage() {
    saveEl.empty();
    var pTag = $("<p>");
    pTag.text("Appointment added to localStorage ✅");
    headerEl.append(saveEl.append(pTag));
  }

  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //

  function timeBlockColor() {
    $(".time-block").each(function () {
      var rowHour = parseInt($(this).attr("id").split("-").pop());
      if (rowHour < currentHour) {
        $(this).children(".description").removeClass("present");
        $(this).children(".description").removeClass("future");
        $(this).children(".description").addClass("past");
      } else if (rowHour === currentHour) {
        $(this).children(".description").removeClass("past");
        $(this).children(".description").removeClass("future");
        $(this).children(".description").addClass("present");
      } else {
        $(this).children(".description").removeClass("past");
        $(this).children(".description").removeClass("present");
        $(this).children(".description").addClass("future");
      }
    });
  }

  timeBlockColor();
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //

  function displayToDo() {
    for (var i = 9; i < 18; i++) {
      $("#hour-" + i)
        .children(1)
        .val(localStorage.getItem("hour-" + i));
    }
  }

  // TODO: Add code to display the current date in the header of the page.
  function displayDate() {
    var currentDate = dayjs().format("dddd, MMMM Do, HH:mm:ss");
    $("#currentDay").text(currentDate);
  }
  displayDate();
  setInterval(displayDate, 1000);
});

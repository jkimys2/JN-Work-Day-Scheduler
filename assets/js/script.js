// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
var submitBtn = $(".saveBtn");
var currentTime = dayjs().format("HH");
;

var hourSelected = {
  hour9: $("#hour-9").children(".hour").text(),
  hour10: $("#hour-10"),
  hour11: $("#hour-11"),
  hour12: $("#hour-12"),
  hour13: $("#hour-1"),
  hour14: $("#hour-2"),
  hour15: $("#hour-3"),
  hour16: $("#hour-4"),
  hour17: $("#hour-5"),
};
// console.log(hourSelected)
$(function () {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?

  submitBtn.on("click", function (event) {
    event.preventDefault();
    var hour = $(this).siblings(".hour").text();
    var toDo = $(this).siblings(".description").val();
    // if (userInput) {
    //   var newInput = {
    //     time: hour,
    //     todo: toDo,
    //   };
    //   userInput = JSON.parse(localStorage.getItem("To-Do's")) || [];
    //   userInput.push($(newInput));
    //   localStorage.setItem("To-Do's", JSON.stringify(userInput));
    // }
    // userInput = JSON.parse(localStorage.getItem("To-Do's")) || [];

    localStorage.setItem(hour, toDo);
    renderMessage();
  });

  function displayToDo() {
    $.each(hourSelected, function () {
      toDo.text(localStorage.getItem(hour, toDo));
    });
  }
  displayToDo();

  function renderMessage() {
    var headerEl = $("lead")
    var saveEl = $("<p>");
    saveEl.text("Appointment added to LocalStorage ✅");
    headerEl.append(saveEl);
  }

  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //

  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //

  // TODO: Add code to display the current date in the header of the page.
  function displayDate() {
    var currentDate = dayjs().format("dddd, MMMM Do, HH:mm:ss");
    $("#currentDay").text(currentDate);
  }
  displayDate();
  setInterval(displayDate, 1000);
});

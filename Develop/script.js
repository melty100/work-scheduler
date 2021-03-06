
//Represents an hour in our schedule and text describing an event at that time
class Record {
    constructor(hour, text){
        this.hour = hour;
        this.text = text;
    }
}

//Used to compare temporal differences of our timeblocks and the current time
var everyHour = ["12am", "1am", "2am", "3am", "4am", "5am", "6am", "7am", "8am", "9am", "10am", "11am", 
                 "12pm", "1pm", "2pm", "3pm", "4pm", "5pm", "6pm", "7pm", "8pm", "9pm", "10pm", "11pm"];

var timer = setInterval(checkTime, 1000);

//Used for testing color changes for textareas at the turn of an hour. (9th index is 9am in everyHour array)
//--------------------------------------- DELETE THIS ------------------------------------------------------
var testCounter = 9;

$(".saveBtn").click(function() {

    //Slices off 'save' portion of our button id string. The result is used to
    //select the textarea related to that button and form a new record.
    let textAreaId = this.id.slice(4, this.id.length);
    let text = $("#" + textAreaId).val();
    let r = new Record(textAreaId, text);
    let schedule = localStorage.getItem("Schedule");

    //If we don't have a schedule in local storage, then we create it here
    if(schedule == null){
        schedule = [r];
    }
    //If we do, then we either push a new record or overwrite an existing one
    else {
        schedule = JSON.parse(schedule);

        //If we have a record stored for a specific hour, find and write over it;
        let i = 0;
        while(i < schedule.length && r.hour != schedule[i].hour){
            i++;
        }
        i < schedule.length ? schedule[i].text = text : schedule.push(r);
    }

    localStorage.setItem("Schedule", JSON.stringify(schedule));
})

function checkTime() {

    //Update time on jumbotron
    $("#currentDay").text(moment().format('MMMM Do YYYY, h:mm:ssa'));

    //loops through working hours in everyHours array -------------- DELETE THIS
    testCounter == 17 ? testCounter = 9 : testCounter++;

    let hour = moment().format('ha');
    //let hour = everyHour[testCounter];
    let hourIndex = everyHour.indexOf(hour);

    //Update textarea background colors
    for(let i = 0; i < everyHour.length; i++){

        let id = "#" + everyHour[i];

        if(i < hourIndex){
            $(id).removeClass("present");
            $(id).addClass("past");
        }
        else if(i == hourIndex){
            $(id).removeClass("future");
            $(id).addClass("present");
        }
        else if(i > hourIndex){
            $(id).removeClass("past");
            $(id).addClass("future");
        }
    }
}

//Posts schedule from local storage
function postSchedule() {

    let schedule = JSON.parse(localStorage.getItem("Schedule"));

    for (record of schedule){
        let textAreaId = "#" + record.hour;
        $(textAreaId).text(record.text);
    }

}

postSchedule()
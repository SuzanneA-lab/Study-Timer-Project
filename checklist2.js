//// Checklist code starts here
//
//
//
const challenge1 = document.getElementById("ctext1");
const challenge2 = document.getElementById("ctext2");
const challenge3 = document.getElementById("ctext3");

const progress1 = document.getElementById("p1");
const progress2 = document.getElementById("p2");
const progress3 = document.getElementById("p3");

const coinnum = document.getElementById("");

let ProgressChecker = null;

//abstract class

class Task {
    constructor(enteredtask, enteredtasknum) {
        this.task = enteredtask;
        this.tasknum = enteredtasknum;
        this.numtaskdone = 0;
    }

    /*
    ResetProgress(){
        this.numtaskdone = 0;
        console.log("working")
    }
    */

    /*
    UpdateProgress(){
        throw new Error("Method 'UpdateProgress()' must be implemented");
    }
    */
}

class StudyTask extends Task {
    constructor(enteredtask, enteredtasknum, enteredtasktype, enteredchallengenum){
        super(enteredtask, enteredtasknum);
        this.tasktype = enteredtasktype;
        this.challengenum = enteredchallengenum;
    }

    UpdateProgress(){
        let storagelocation;
        let TimerSessions;
        let TimerSessionsint = 0;
        let tasksdone = this.numtaskdone;

        if (this.tasktype == "study"){
            storagelocation = "study_sessions".concat(this.challengenum); 
        }

        else {
            storagelocation = "break_sessions".concat(this.challengenum); 
        }

        console.log(storagelocation);
        TimerSessions = localStorage.getItem(storagelocation);
        console.log(TimerSessions);

        if (TimerSessions == null){
            TimerSessions = 0;
        }

        TimerSessionsint = parseInt(TimerSessions);

        if (tasksdone != TimerSessionsint){
            this.numtaskdone = tasksdone + TimerSessionsint;
        }

        /*
        /*
        console.log("working!")
        this.numtaskdone = this.numtaskdone + 1;
        *

        let time = 0;
        let TimerSessions = 0;
        let timeint = 0;
        let tasksdone = this.numtaskdone;

        if (this.tasktype == "study"){
            //console.log("study", tasksdone, localStorage.getItem("study_sessions"));
            
            let temp = localStorage.getItem("study_sessions");
            if (tasksdone !== 0 && temp == "0"){
                localStorage.setItem("study_sessions", tasksdone*10);
            
                //console.log("registered: study, ", tasksdone, temp);
            }

            time = localStorage.getItem("study_sessions");
            console.log(time);

            if (time == null){
                TimerSessions = 0;
            }
        
            else{
                timeint = parseInt(time)
                TimerSessions = Math.ceil(timeint/10);
            }
        }

        else {
            console.log("break" , tasksdone, localStorage.getItem("break_sessions"));

            let temp = localStorage.getItem("break_sessions");
            if (tasksdone !== 0 && temp == "0"){
                localStorage.setItem("break_sessions", tasksdone*10);

                console.log("registered: break, ", tasksdone, temp);
            }

            time = localStorage.getItem("break_sessions");
            console.log(time);

            if (time == null){
                TimerSessions = 0;
            }
        
            else{
                timeint = parseInt(time)
                TimerSessions = Math.ceil(timeint/10);
            }
        }

        //console.log(this.numtaskdone, this.tasknum);

        if (tasksdone != TimerSessions){
            this.numtaskdone = tasksdone + TimerSessions;
            //console.log(this.numtaskdone, tasksdone);
        }

        /*
        if (this.numtaskdone >= this.tasknum){
            console.log(this.numtaskdone, this.tasknum);
        }
        */
       
    }

    ResetProgress(){
        //setting TEMPORARY solution to completion error 
        //previous error remedied but now running 
        //into issue where progress is carried over to new challenge when existing timer challenge of its kind is on screen

        if (this.tasktype == "study"){
            localStorage.setItem("study_sessions".concat(this.challengenum), 0);
        }
        
        else {
            localStorage.setItem("break_sessions".concat(this.challengenum), 0);
        }

        this.numtaskdone = 0;
        console.log("working");
    }
}

class TaskUpdater {
    constructor(enteredTaskobj, enteredCoinrewards, enteredChallengename, enteredProgressname){
        this.Taskobj = enteredTaskobj;
        this.Coinrewards = enteredCoinrewards;
        this.Challengename = enteredChallengename;
        this.Progressname = enteredProgressname;
        this.Taskcomplete = false;
    }

    UpdateDisplay(){
        this.Challengename.textContent = this.Taskobj.task;
        this.Progressname.textContent = this.Taskobj.numtaskdone + "/" + this.Taskobj.tasknum;
    }

    CheckandUpdateTasks(){
        this.Taskobj.UpdateProgress();
        this.UpdateDisplay();

        if (this.Taskobj.numtaskdone >= this.Taskobj.tasknum){
            if (ProgressChecker != null){
                clearInterval(ProgressChecker);
            }

            this.CompleteChallenge();
        }
    }

    RunChallenge(){
        this.UpdateDisplay();
        ProgressChecker = setInterval(this.CheckandUpdateTasks.bind(this), 30000);
    }

    CompleteChallenge(){
        this.Progressname.style.borderStyle = "solid";
        this.Progressname.style.backgroundColor = "rgb(0,0,0, 1)";
        this.Progressname.textContent = "✓";
        this.Progressname.style.fontSize = "1.5em";
        this.Progressname.style.fontWeight ="900";

        this.Taskcomplete = true;
        //this.Progressname.style.color = "black";
    }


    StartNewTask(enteredTaskobj, enteredCoinrewards){
        if (this.Taskcomplete){
            this.Taskcomplete = false;
            this.Taskobj = enteredTaskobj;
            this.Coinrewards = enteredCoinrewards;

            this.Taskobj.ResetProgress();
            this.UpdateDisplay();

            this.Progressname.style.borderStyle = "none";
            this.Progressname.style.backgroundColor = "rgb(0,0,0, 0)";
            this.Progressname.style.fontSize = "large";
            this.Progressname.style.fontWeight ="500";
        }
    }

    ClaimRewards(newTaskobj){
        this.Taskcomplete = false;
    }
    
    /*
    Startnewtask(tasklist){
        
    }
    */

    LoadNewTask(newTaskobj){
        this.Taskobj.ResetProgress();

        this.Taskobj = newTaskobj;
        this.Taskcomplete = false;
    }
}

const ST1 = new StudyTask("Use the study timer for 10 minutes", 10, "study");
const ST2 = new StudyTask("Use the break timer for 15 minutes", 15, "break", 2);
const ST3 = new StudyTask("Use the study timer for 20 minutes", 20, "study", 3);

const ST4 = new StudyTask("Use the study timer for 1 minute", 1, "study", 1);
const ST5 = new StudyTask("Use the break timer for 2 minutes", 2, "break", 1);
const ST6 = new StudyTask("Use the study timer for 3 minutes", 3, "study", 1);

let Updater10;
let Updater15;
let Updater20;

const tasks10 = [ ST4, ST5, ST6 ];
const tasks15 = [ ST2, ST1 ];
const tasks20 = [ ST3 ];

function TaskCheckandSet(taskcategory){
    currentTask = localStorage.getItem(taskcategory);
    
    if (currentTask == null){
        localStorage.setItem(taskcategory, 0);
    }
}

function LoadChallenges(){
    //checks if there are existing challenges stored, if not adds new ones

    TaskCheckandSet("tasks10");
    TaskCheckandSet("tasks15");
    TaskCheckandSet("tasks20");

    //creates variables to represent the indexes of task items within their respective lists
    let current10 = localStorage.getItem("tasks10");
    let current15 = localStorage.getItem("tasks15");
    let current20 = localStorage.getItem("tasks20");

    /*
    challenge1.textContent = tasks10[current10].task;
    progress1.textContent = tasks10[current10].numtaskdone + "/" + tasks10[current10].tasknum;

    challenge2.textContent = tasks15[current15].task;
    progress2.textContent = tasks15[current15].numtaskdone + "/" + tasks15[current15].tasknum;

    challenge3.textContent = tasks20[current20].task;
    progress3.textContent = tasks20[current20].numtaskdone + "/" + tasks20[current20].tasknum;
    */

    Updater10 = new TaskUpdater(tasks10[current10], 10, challenge1, progress1);
    Updater15 = new TaskUpdater(tasks15[current15], 15, challenge2, progress2);
    Updater20 = new TaskUpdater(tasks20[current20], 20, challenge3, progress3);
    
    Updater10.CheckandUpdateTasks();
    Updater15.CheckandUpdateTasks();
}

function Load1Challenge(Updater, tasklistname){
    TaskCheckandSet(tasklistname);

    let current = localStorage.getItem("tasks10");

    Updater.LoadNewTask(current);
    Updater.UpdateDisplay();
}


//Real
function GetReward(elementid){
    if (Updater10.Taskcomplete) {
        //AHHHHHHHHHH tasks10[]

        let Reward = Updater10.Coinrewards;
        let storedcoins = parseInt(localStorage.getItem("coins"));   
        
        let totalcoins = Reward + storedcoins;
        localStorage.setItem("coins", totalcoins);

        coindisplaynum.textContent = String(totalcoins).padStart(3,"0");

        let old10 = localStorage.getItem("tasks10");
        let new10 = parseInt(old10) + 1;
        let len = tasks10.length;

        if ( new10 == len ){
            new10 = 0;
        }

        localStorage.setItem("tasks10", new10);

        Updater10.StartNewTask(tasks10[new10], 90);
        Updatealltasks();
    }
}

function Updatealltasks(){
    Updater10.CheckandUpdateTasks();
    Updater15.CheckandUpdateTasks();
    Updater20.CheckandUpdateTasks();
}

/*
function GetReward(elementid){
    let Updater;
    let tasklist;
    let tasklistname;
    let taskindex;

    if (elementid == "p1"){
        Updater = Updater10;
        tasklist = tasks10;
        tasklistname = "tasks10";
        taskindex = parseInt(localStorage.getItem("tasks10")) + 1;
    }

    if (elementid == "p2"){
        Updater = Updater15;
        tasklist = tasks15;
        tasklistname = "tasks15";
        taskindex = parseInt(localStorage.getItem("tasks15")) + 1;
    }

    if (elementid == "p3"){
        Updater = Updater20;
        tasklist = tasks20;
        tasklistname = "tasks20";
        taskindex = parseInt(localStorage.getItem("tasks20")) + 1;
    }

    if (Updater.Taskcomplete) {
        let Reward = Updater10.Coinrewards;
        let storedcoins = parseInt(localStorage.getItem("coins"));   
        
        let totalcoins = Reward + storedcoins;
        localStorage.setItem("coins", totalcoins);

        coindisplaynum.textContent = String(totalcoins).padStart(3,"0");
        
        if (tasklist.length == taskindex){
            taskindex = 0;
            /*for(let i = 0; i < tasklist.length; i++){
                (tasklist[i]).ResetProgress();
            } //*
        }
        
        localStorage.setItem(tasklistname, taskindex);

        Updater.Progressname.style.borderStyle = "none";
        Updater.Progressname.style.backgroundColor = "rgb(0,0,0, 0)";
        Updater.Progressname.style.fontSize = "large";
        Updater.Progressname.style.fontWeight ="500";

        LoadChallenges();
    }
}
*/

//add new property to Tasks representing progress made in them (ex: 3 for 3/10) (?)
//put the tasks currently being done in local storage with relevant info (?)

/*
const Studytask1 = new Task("Use the study timer for 10 minutes", 10);
const Studytask2 = new Task("Use the study timer for 15 minutes", 15);
const Studytask3 = new Task("Use the study timer for 20 minutes", 20);

const Buytask1 = new Task("Purchase 1 item from the shop", 1);
const Buytask2 = new Task("Purchase 1 Background from the shop", 1)
const Buytask3 = new Task("Purchase 1 StudyBuddy from the shop", 1);

const Changetask1 = new Task("Change the background theme 1 time", 1);
const Changetask2 = new Task("Change/Equip a StudyBuddy 1 time", 1);
const Earntask1 = new Task("Earn 10 coins", 10);
const Earntask2 = new Task("Earn 20 coins", 20);
const Leveltask1 = new Task("level-up 1 time", 1);

const Breaktask1 = new Task( "Use the break timer for 10 minutes", 10);
const Breaktask2 = new Task( "Use the break timer for 15 minutes", 15);
const Breaktask3 = new Task( "Use the break timer for 20 minutes", 20);

const tasks10 = [ Earntask1, Studytask1, Breaktask1, Changetask1];
const tasks15 = [ Breaktask2, Buytask1, Changetask2, Studytask2, Earntask2];
const tasks20 = [ Studytask3, Buytask2, Breaktask3, Leveltask1, Buytask3];

*/
//Currently being used for testing - delete later
localStorage.removeItem("task10");
localStorage.removeItem("task15");
localStorage.removeItem("task20");

/*
//need to make this only choose new challenges on first open (local storage check of which checks have been done)
function LoadChallenges(){
    //let num = Math.floor(Math.random() * 14);
    
    let current10 = localStorage.getItem("task10");
    let progress10 = localStorage.getItem("progress10");

    let current15 = localStorage.getItem("task15");
    let progress15 = localStorage.getItem("progress15");

    let current20 = localStorage.getItem("task20");
    let progress20 = localStorage.getItem("progress20");

    if (current10 == null || progress10 == null){
        localStorage.setItem("task10", 0);
        localStorage.setItem("progress10", 0);
        
        current10 = localStorage.getItem("task10");
        progress10 = localStorage.getItem("progress10");
    }

    challenge1.textContent = tasks10[current10].task;
    progress1.textContent =  progress10 + "/" + tasks10[current10].tasknum;

    if (current15 == null || progress15 == null){
        localStorage.setItem("task15", 0);
        localStorage.setItem("progress15", 0);

        current15 = localStorage.getItem("task15");
        progress15 = localStorage.getItem("progress15");
    }
    
    challenge2.textContent = tasks15[current15].task;
    progress2.textContent =  progress15 + "/" + tasks15[current15].tasknum;

    if (current20 == null || progress20 == null){
        localStorage.setItem("task20", 0);
        localStorage.setItem("progress20", 0);

        current20 = localStorage.getItem("task20");
        progress20 = localStorage.getItem("progress20");
    }
    
    challenge3.textContent = tasks20[current20].task;
    progress3.textContent =  progress20 + "/" + tasks20[current20].tasknum;
}
*/

//// Code for all pages
//
//
//

const root = document.documentElement;
const cover = document.getElementById('cover');

const display = document.getElementById("clock")
const sidebar = document.querySelector('.menu');
const popuphelp = document.getElementById("popupbghelp");
const popupsettings = document.getElementById("popupbgsettings");
const coindisplaynum = document.getElementById("numcoins");

window.onload = Load();

window.addEventListener('DOMContentLoaded', Load());
    //cover.remove()
    //cover.style.visibility = "hidden";
//);

function Load(){
    let theme = localStorage.getItem("theme");
    let accent = localStorage.getItem("accent");
    let bg = localStorage.getItem("Background");
    let storedcoins = localStorage.getItem("coins");

    if (theme === null || bg === null || accent == null || storedcoins == null){
        theme = "white";
        accent = "#0a0f72";
        bg = "url(Stars.png)";
        storedcoins = 0;

        localStorage.setItem("theme", "white");
        localStorage.setItem("accent", "#0a0f72");
        localStorage.setItem("Background", "url(Stars.png)");
        localStorage.setItem("coins", 0);
    }

    root.style.setProperty('--theme', theme);
    root.style.setProperty('--accent', accent);
    root.style.setProperty('--background', bg);
    
    coindisplaynum.textContent = String(storedcoins).padStart(3,"0");

    LoadChallenges();
}

function Openmenu(){
    sidebar.style.display = 'flex';
}

function Closemenu(){
    sidebar.style.display = 'none';
}

function Closehelp(){
    popuphelp.style.display = 'none';
}

function Openhelp(){
    popuphelp.style.display = 'flex';
}

function CloseSettings(){
    popupsettings.style.display = 'none';
}

function OpenSettings(){
    popupsettings.style.display = 'flex';
}


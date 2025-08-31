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

//const coinnum = document.getElementById("");

let ProgressChecker = null;

//abstract class

class Task {
    constructor(enteredtask, enteredtasknum) {
        this.task = enteredtask;
        this.tasknum = enteredtasknum;
        this.numtaskdone = 0;
    }

    
    ResetProgress(){
        this.numtaskdone = 0;
    }
    

    UpdateProgress(){
        //throw new Error("Method 'UpdateProgress()' must be implemented");
    }
    
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

        //console.log(storagelocation);
        TimerSessions = localStorage.getItem(storagelocation);
        //console.log(TimerSessions);

        if (TimerSessions == null){
            TimerSessions = 0;
        }

        TimerSessionsint = parseInt(TimerSessions);

        if (tasksdone != TimerSessionsint){
            this.numtaskdone = tasksdone + TimerSessionsint;
        }
    }

    ResetProgress(){
        if (this.tasktype == "study"){
            localStorage.setItem("study_sessions".concat(this.challengenum), 0);
        }
        
        else {
            localStorage.setItem("break_sessions".concat(this.challengenum), 0);
        }

        super.ResetProgress();

        /*
        this.numtaskdone = 0;
        console.log("working");
        */
    }
}

class ChangeTask extends Task{
    constructor(enteredtask, enteredtasknum, entereditemtype){
        super(enteredtask, enteredtasknum);
        this.itemtype = entereditemtype;
        this.storagelocation = this.itemtype + "change";
    }

    UpdateProgress(){
        //let storagelocation = this.itemtype + "change";
        let numequips = 0;

        if (localStorage.getItem(this.storagelocation) != null){
            numequips = parseInt(localStorage.getItem(this.storagelocation));
        }

        this.numtaskdone = this.numtaskdone + numequips;
    }

    ResetProgress(){
        localStorage.setItem(this.storagelocation, 0);
        super.ResetProgress();
    }
}

class EarnTask extends Task{
    constructor(enteredtask, enteredtasknum){
        super(enteredtask, enteredtasknum);
        
        if (localStorage.getItem("initialcoins") == null){
            let initialcointotal = localStorage.getItem("coins");
            localStorage.setItem("initialcoins", initialcointotal);
        }
    }

    UpdateProgress(){
        let oldcointotal = parseInt(localStorage.getItem("initialcoins"));
        let newcointotal = parseInt(localStorage.getItem("coins"));
        let amountearned = 0;

        if (oldcointotal < newcointotal){
            amountearned = newcointotal - oldcointotal;
            this.numtaskdone = this.numtaskdone + amountearned;
        }

        else if (oldcointotal > newcointotal){
            localStorage.setItem("initialcoins", newcointotal);
        }
    }

    ResetProgress(){
        let initialcointotal = localStorage.getItem("coins");
        localStorage.setItem("initialcoins", initialcointotal);
        
        super.ResetProgress();  
    }
}

//idk why this wont work bruh :(
//maybe try making all objects create themselves on first opening only????

class BuyTask extends Task{
    constructor(enteredtask, enteredtasknum){
        super(enteredtask, enteredtasknum);
        
        if (localStorage.getItem("initialcoins2") == null){
             let initialcointotal = localStorage.getItem("coins");
            localStorage.setItem("initialcoins2", initialcointotal);       
        }
    }

    UpdateProgress(){
        let oldcointotal = parseInt(localStorage.getItem("initialcoins2"));
        let newcointotal = parseInt(localStorage.getItem("coins"));
        let amountspent = 0;

        if (oldcointotal > newcointotal){
            amountspent = oldcointotal - newcointotal;
            this.numtaskdone = this.numtaskdone + amountspent;
        }

        else if (oldcointotal < newcointotal){
            localStorage.setItem("initialcoins2", newcointotal);
        }
    }

    ResetProgress(){
        let initialcointotal = localStorage.getItem("coins");
        localStorage.setItem("initialcoins2", initialcointotal);
        console.log("reset trigger");

        super.ResetProgress();  
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
        let theme = localStorage.getItem("theme");
        let accent = localStorage.getItem("accent");
        let midtone = localStorage.getItem("midtone");
/*
        this.Progressname.style.borderStyle = "solid";
        this.Progressname.style.borderColor = theme;

        this.Progressname.style.backgroundColor = midtone;
        this.Progressname.style.color = theme;
*/
        this.Progressname.textContent = "✓";
        this.Progressname.classList.add('progresscomplete');

/*
        this.Progressname.style.fontSize = "1.5em";
        this.Progressname.style.fontWeight ="900";
        this.Progressname.style.cursor = "pointer";
*/
        
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

            this.Progressname.classList.remove('progresscomplete');

            /*
            this.Progressname.style.borderStyle = "none";
            this.Progressname.style.backgroundColor = "rgb(0,0,0, 0)";
            this.Progressname.style.color = theme;
            this.Progressname.style.fontSize = "1em";
            this.Progressname.style.fontWeight = "500";
            this.Progressname.style.cursor = "auto";
            */
        }
    }

    ClaimRewards(newTaskobj){
        this.Taskcomplete = false;
    }
    
    /*
    Startnewtask(tasklist){
        
    }
    */
   /*

    LoadNewTask(newTaskobj){
        this.Taskobj.ResetProgress();

        this.Taskobj = newTaskobj;
        this.Taskcomplete = false;
    }
        */
}

const ST1 = new StudyTask("Use the Study Timer for 10 minutes", 10, "study", 1);
const ST2 = new StudyTask("Use the Study Timer for 15 minutes", 15, "study", 2);
const ST3 = new StudyTask("Use the Study Timer for 20 minutes", 20, "study", 3);

const BR1 = new StudyTask("Use the Break Timer for 10 minutes", 10, "break", 1);
const BR2 = new StudyTask("Use the Break Timer for 15 minutes", 15, "break", 2);
const BR3 = new StudyTask("Use the Break Timer for 20 minutes", 20, "break", 3);

const CB1 = new ChangeTask("Change the Background theme 1 time", 1, "background"); 

const ET1 = new EarnTask("Earn 10 coins by completing challenges", 10);
const ET2 = new EarnTask("Earn 20 coins by completing challenges", 20);

const BT1 = new BuyTask("Purchase 1 item in the shop", 1);
const BT2 = new BuyTask("Spend at least 75 coins in the shop", 75);

//testing tasks
const ST4 = new StudyTask("Use the study timer for 1 minute", 1, "study", 1);
const ST5 = new StudyTask("Use the break timer for 2 minutes", 2, "break", 1);
const ST6 = new StudyTask("Use the study timer for 3 minutes", 3, "study", 1);
const TT1 = new StudyTask("Tester", 0, "study", 1);

let Updater10;
let Updater15;
let Updater20;

const tasks10 = [BR1,ST1,CB1];//[ TT1, BT2, ST4, CB1, TT1];
const tasks15 = [ST2,ET1,BR2,BT1];//[ ET1, TT1, ST2, ET1, TT1];
const tasks20 = [ET2,BR3,ST3,ET2,BT2];//[ TT1, TT1, TT1, ST3];

function TaskCheckandSet(taskcategory, listlength){
    currentTask = localStorage.getItem(taskcategory);
    
    if (currentTask == null || parseInt(currentTask) >= listlength){
        localStorage.setItem(taskcategory, 0);
    }
}

function LoadChallenges(){
    //checks if there are existing challenges stored, if not adds new ones

    TaskCheckandSet("tasks10", tasks10.length);
    TaskCheckandSet("tasks15", tasks15.length);
    TaskCheckandSet("tasks20", tasks20.length);

    //creates variables to represent the indexes of task items within their respective lists
    let current10 = parseInt(localStorage.getItem("tasks10"));
    let current15 = parseInt(localStorage.getItem("tasks15"));
    let current20 = parseInt(localStorage.getItem("tasks20"));

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
    Updater20.CheckandUpdateTasks();
}

/*
function Load1Challenge(Updater, tasklistname){
    TaskCheckandSet(tasklistname);

    let current = localStorage.getItem("tasks10");

    Updater.LoadNewTask(current);
    Updater.UpdateDisplay();
}
*/

//delete later
/*
function GetReward10(){
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

        Updater10.StartNewTask(tasks10[new10], 10);
        Updatealltasks();
    }
}
*/

function GetReward(id){
    if (id == "p1"){
        Updater = Updater10;
        tasklist = tasks10;
        tasklistname = "tasks10"; 
    }

    else if (id == "p2"){
        Updater = Updater15;
        tasklist = tasks15;
        tasklistname = "tasks15"; 
    }

    else {
        Updater = Updater20;
        tasklist = tasks20;
        tasklistname = "tasks20"; 
    }

    let Reward = Updater.Coinrewards;
    let storedcoins = parseInt(localStorage.getItem("coins"));   
    
    let totalcoins = Reward + storedcoins;
    localStorage.setItem("coins", totalcoins);

    coindisplaynum.textContent = String(totalcoins).padStart(3,"0");

    let old10 = localStorage.getItem(tasklistname);
    let new10 = parseInt(old10) + 1;
    let len = tasklist.length;

    if ( new10 == len ){
        new10 = 0;
    }

    localStorage.setItem(tasklistname, new10);

    Updater.StartNewTask(tasklist[new10], Reward);
    Updatealltasks();
}

function Updatealltasks(){
    Updater10.CheckandUpdateTasks();
    Updater15.CheckandUpdateTasks();
    Updater20.CheckandUpdateTasks();
}

function TaskSkip(){
    let oldtaskindex1 = parseInt(localStorage.getItem("tasks10")); 
    let oldtaskindex2 = parseInt(localStorage.getItem("tasks15")); 
    let oldtaskindex3 = parseInt(localStorage.getItem("tasks20"));
    
    let newtaskindex1 = SetNextTask("tasks10", tasks10.length);
    let newtaskindex2 = SetNextTask("tasks15", tasks15.length);
    let newtaskindex3 = SetNextTask("tasks20", tasks20.length);

    let newtask1 = tasks10[newtaskindex1];
    let newtask2 = tasks15[newtaskindex2];
    let newtask3 = tasks20[newtaskindex3];

    Updater10.Taskcomplete = true;
    Updater10.StartNewTask(newtask1, newtask1.Reward);

    Updater15.Taskcomplete = true;
    Updater15.StartNewTask(newtask2, newtask2.Reward);

    Updater20.Taskcomplete = true;
    Updater20.StartNewTask(newtask3, newtask3.Reward);
}

function SetNextTask(taskcategory, listlength){
    currentTask = parseInt(localStorage.getItem(taskcategory));
    let newindex = 0;
    
    if (currentTask == null || isNaN(currentTask) || currentTask >= listlength-1){
        console.log(currentTask, listlength);
        localStorage.setItem(taskcategory, 0);
    }

    else {
        localStorage.setItem(taskcategory, currentTask+1);
        newindex = currentTask+1;
    }

    return newindex;
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

//const root = document.documentElement;
const display = document.getElementById("clock")
const sidebar = document.querySelector('.menu');
const popuphelp = document.getElementById("popupbghelp");
const popupsettings = document.getElementById("popupbgsettings");
const coindisplaynum = document.getElementById("numcoins");

const studylengthtextbox = document.getElementById("Slengthtextbox");
const Sbreaklengthtextbox = document.getElementById("SBlengthtextbox");
const Lbreaklengthtextbox = document.getElementById("LBlengthtextbox");

const SfxSwitch = document.getElementById("sfxswitch");
const AutoSwitch = document.getElementById("autoswitch"); 

const root = document.documentElement;
const cover = document.getElementById('cover');

let soundon = true;
let autorun = true;

window.onload = Load();

window.addEventListener("DOMContentLoaded", function(){
    cover.addEventListener( "animationend", function(){
        cover.style.visibility = "hidden";
    });
});

function Load(){
    let theme = localStorage.getItem("theme");
    let accent = localStorage.getItem("accent");
    let midtone = localStorage.getItem("midtone");
    let bg = localStorage.getItem("Background");
    
    let storedcoins = localStorage.getItem("coins");
    
    let sfxsetting = localStorage.getItem("SFX");
    let autorunsetting = localStorage.getItem("Autorun");
    
    let studylength = localStorage.getItem("Studylen"); 
    let longbreaklength = localStorage.getItem("Lbreaklen");
    let shortbreaklength = localStorage.getItem("Sbreaklen");

    if (theme === null || bg === null || accent == null || storedcoins == null || sfxsetting == null || studylength == null || longbreaklength == null || shortbreaklength == null){
        theme = "white";
        accent = "#0a0f72";
        midtone = "#060947";
        bg = "url(Stars.png)";
        storedcoins = "0";
        sfxsetting == "true";
        autorunsetting = "true";
        
        studylength = "25";
        longbreaklength = "10";
        shortbreaklength = "5";

        localStorage.setItem("theme", "white");
        localStorage.setItem("accent", "#0a0f72");
        localStorage.setItem("midtone", "#060947");
        localStorage.setItem("Background", "url(Stars.png)");

        localStorage.setItem("coins", 0);

        localStorage.setItem("SFX", true);
        localStorage.setItem("Autorun", true);

        localStorage.setItem("Studylen", "25");
        localStorage.setItem("Lbreaklen", "10");
        localStorage.setItem("Sbreaklen", "5");
    }

    root.style.setProperty('--theme', theme);
    root.style.setProperty('--accent', accent);
    root.style.setProperty('--midtone', midtone);
    root.style.setProperty('--background', bg);

    if (sfxsetting == "false"){
        SfxSwitch.checked = true;
    }

    if (autorunsetting == "false"){
        AutoSwitch.checked = true;
    }

    studylengthtextbox.value = studylength;
    Sbreaklengthtextbox.value = shortbreaklength;
    Lbreaklengthtextbox.value = longbreaklength;
    
    coindisplaynum.textContent = storedcoins.padStart(3,"0");
    LoadChallenges();
}

let menuopened = false;
const menucover = document.getElementById("menucover");

function Openmenu(){
    menuopened = true;
    sidebar.style.display = 'flex';
    menucover.style.display = 'flex';

    sidebar.style.animationName="menuslidein";
    menucover.style.animationName="menuslidein";
}

function Closemenu(){
    menuopened = false;
    sidebar.style.animationName="menuslideout";
    menucover.style.animationName="menuslideout";

    sidebar.addEventListener( "animationend", function(){
        if (!menuopened) {
            sidebar.style.display = 'none';
        }
    });

    menucover.addEventListener( "animationend", function(){
        if (!menuopened) {
            menucover.style.display = 'none';
        }
    });
}

let helpopened = false;
let settingsopened = false;

function Closehelp(){
    helpopened = false;
    popuphelp.style.animationName = 'menuslideout';

    popuphelp.addEventListener( "animationend", function(){
        if (!helpopened) {
            popuphelp.style.display = 'none';
        }
    });
}

function Openhelp(){
    helpopened = true;
    popuphelp.style.animationName = 'menuslidein';
    popuphelp.style.display = 'flex';
}

function CloseSettings(){
    settingsopened = false;
    popupsettings.style.animationName = 'menuslideout';

    popupsettings.addEventListener( "animationend", function(){
        if (!settingsopened) {
            popupsettings.style.display = 'none';
        }
    });

    console.log(studylengthtextbox.value);
    console.log(localStorage.getItem("Studylen"));

    let studynum = studylengthtextbox.value;
    let Sbreaknum = Sbreaklengthtextbox.value;
    let Lbreaknum = Lbreaklengthtextbox.value; 
    
    if (studynum != localStorage.getItem("Studylen")) {
        if (!isNaN(studynum) && studynum != "0" && studynum != "00" && studynum != "e" && studynum != "++"  && studynum != "+-"  && studynum != "-+"  && studynum != "--" && studynum != null && studynum != ""){
            localStorage.setItem("Studylen", studylengthtextbox.value);

            console.log("passes tests");
            
        }

        else{
            studylengthtextbox.value = "25";  
            localStorage.setItem("Studylen", "25"); 
        }

        console.log(studynum);


    }

    if (Sbreaknum != localStorage.getItem("Sbreaklen")) {
        if (!isNaN(Sbreaknum) && Sbreaknum != "0" && Sbreaknum != "00" && Sbreaknum != "e" && Sbreaknum != "++"  && Sbreaknum != "+-"  && Sbreaknum != "-+"  && Sbreaknum != "--" && Sbreaknum != null && Sbreaknum != ""){
            localStorage.setItem("Sbreaklen", Sbreaklengthtextbox.value);
        }

        else{
            Sbreaklengthtextbox.value = "5";  
            localStorage.setItem("Sbreaklen", "5"); 
        }


    }

    if (Lbreaknum != localStorage.getItem("Lbreaklen")) {
        if (!isNaN(Lbreaknum) && Lbreaknum != "0" && Lbreaknum != "00" && Lbreaknum != "e" && Lbreaknum != "++"  && Lbreaknum != "+-"  && Lbreaknum != "-+" && Lbreaknum != "--" && Lbreaknum != null && Lbreaknum != ""){
            localStorage.setItem("Lbreaklen", Lbreaklengthtextbox.value);
        }

        else{
            Lbreaklengthtextbox.value = "10";  
            localStorage.setItem("Lbreaklen", "10"); 
        }


    }

}

function OpenSettings(){
    settingsopened = true;
    popupsettings.style.animationName = 'menuslidein';
    popupsettings.style.display = 'flex';
}

//function changeSFXsetting(){
    SfxSwitch.addEventListener('change', () => {
        console.log("changed sfx settimg");

        if (SfxSwitch.checked){
            console.log("sound off");
            localStorage.setItem("SFX", false);

            SfxSwitch.ariaChecked = true;
            soundon = false;
        }

        else{
            console.log("sound on")
            localStorage.setItem("SFX", true);

            SfxSwitch.ariaChecked = true;
            soundon = true;  
        }
    })
//}

//function changeAutorunsetting(){
    AutoSwitch.addEventListener('change', () => {
        if (AutoSwitch.checked){
            localStorage.setItem("Autorun", false);

            AutoSwitch.ariaChecked = true;
            autorun = false;
        }

        else{
            localStorage.setItem("Autorun", true);

            AutoSwitch.ariaChecked = true;
            autorun = true;
        }
    })
//}




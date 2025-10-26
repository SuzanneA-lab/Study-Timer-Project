//// Shop code starts here
//
//
//

const itemimg = document.getElementById("shopimg");
const interactbutton = document.getElementById("url(Stars.png)"); //CHANGE LATER
const itemtitle = document.getElementById("itemtitle");
const itemdesc = document.getElementById("itemexp");

const popuppurchase = document.getElementById("popuppurchase");
const popupwindow = document.getElementById("purchasebox");
const popupprompt = document.getElementById("purchaseprompt");

const purchasebutton = document.getElementById("buybutton");

class ItemManager{
    constructor(item){
        this.item = item;
    }

    SetNewItem(newitem){
        this.item = newitem;
        this.SetPage();
    }

    SetPage(){
        itemimg.src = this.item.img;
        itemtitle.textContent = this.item.name;
        itemdesc.textContent = this.item.desc;

        if (this.item.owned){
            interactbutton.textContent = "Equip";
        }

        else{
            interactbutton.textContent = ("Purchase for " + this.item.price + " coins");
        }
    }

    DecideAction(){
        if (this.item.owned){
            this.item.Equip();
        }

        else {
            popuppurchase.style.display = 'flex';
            purchasebutton.style.display = 'flex';
            popupwindow.style.width = "850px";
            popupprompt.textContent = ("Purchase "+ this.item.name + " for " + this.item.price + " coins?");
        }
    }

    AttemptPurchase(){
        let purchased = this.item.Purchase();
        
        if (purchased){
            popuppurchase.style.display = 'none';
            Load();
        }

        else{
            popupprompt.textContent = "Not enough coins!";
            popupwindow.style.width = "425px";
            purchasebutton.style.display = 'none';
        }
    }
}

class ShopItem{
    constructor(name, price, owned, desc){
        this.name = name;
        this.price = price;
        this.owned = owned;
        this.desc = desc;
    }

    SetasOwned(){
        this.owned = true;
    }

    Purchase(){
        let currentcointotal = parseInt(localStorage.getItem("coins"));
        
        if (currentcointotal >= this.price){
            this.SetasOwned;
            localStorage.setItem(this.name, true);

            let newcointotal = currentcointotal - this.price;
            localStorage.setItem("coins", newcointotal);
            
            return true;
        }

        else {
            return false;
        }
    }
}

class Background extends ShopItem{
    constructor(name, price, owned, img, theme, accent, midtone, desc){
        super(name, price, owned, desc);

        this.img = img;
        this.theme = theme;
        this.accent = accent;
        this.midtone = midtone;
    }

    Equip(){
        if(localStorage.getItem("theme") != this.theme){   
            localStorage.setItem("theme", this.theme);
            localStorage.setItem("accent", this.accent);
            localStorage.setItem("midtone", this.midtone);
            localStorage.setItem("Background", "url(" + this.img + ")");

            //framework for challenge tracking
            let numequips = localStorage.getItem("backgroundchange");
            if (numequips == null){
                numequips = 0;
            }

            localStorage.setItem("backgroundchange", numequips + 1);

            Load();
        }
    }
}

//Users start out with starry bg unlocked
localStorage.setItem("Starry Background", true);

// To create a new shop item create a new object of the appropriate type with all relevant info in variables
const Starsbg = new Background("Starry Background", 1, true, "Stars.png", "#f0fafd", "#0a0f72","#060947", "A simplistic starry background to start your studying journey with! Spend your workdays gazing at a calming night sky background covered in shining white stars.");
const Oceanbg = new Background("Ocean Background", 100, false, "Ocean.png", "#000686", "rgba(232, 250, 255, 1)","#caedfdff", "A mesmerizing ocean scene that features a fleet of jellyfish bathed in a calming light. Using this background is sure to bring out your inner mermaid!");
const Chocobg = new Background("Sweets Background", 125, false, "Chocolate.png", "#fdede3ff", "#5b2828","#200e0eff", "This classic box of chocolates features a delicious looking array of sweets, each with it's own unique charm! Indulge your sweet tooth by purchasing this scrumptious background!");
const Paperbg = new Background("Paper Background", 75, false, "Paper.png", "#633c02ff",  "#fdf3d8ff", "#ffd68aff", "Gazing at this messy workspace covered in aged pages is sure to fire you up for studying! Channel your inner academic with this warm and motivating background.");
const Pinkbg = new Background("Pink Background", 50, false, "Pink.png", "#FFF0F9", "#d32062ff", "#97034dff", "This simple pink floral background is sure to add a fun pop of colour to your study space! Embrace a calmer work environment through this item's laidback blended style.")

let IM;

const Shoplist = [Starsbg, Pinkbg, Paperbg, Oceanbg, Chocobg];
let currentposition = 0;

function LoadShop(){
    localStorage.setItem("Starry Background", true);
    
    let shopitem;
    let shopitemname;

    if (currentposition >= Shoplist.length){
        currentposition = 0;
    }

    let Currentitem = Shoplist[currentposition];
    let Currentitemname = Currentitem.name;
        
    if (localStorage.getItem(Currentitemname) == "true"){
        Currentitem.SetasOwned();
    }

    else {
        localStorage.setItem(Currentitemname, false);
        Currentitem.owned = false;
    }

    IM = new ItemManager(Currentitem);
    IM.SetPage();
}

//add function for checking purchased status of each item

function SwitchPageBack(){
    if (currentposition <= 0){
        currentposition = Shoplist.length-1;
    }

    else {
        currentposition = currentposition - 1;
    }

    LoadShop();
}

function SwitchPageFront(){
    if (currentposition >= Shoplist.length){
        currentposition = 0;
    }

    else {
        currentposition = currentposition + 1;
    }

    LoadShop();
}

function PurchaseorEquip(){
    IM.DecideAction();
}

function commitPurchase(){
    IM.AttemptPurchase();
}

function abortPurchase(){
    popuppurchase.style.display = 'none';
}

//// Code for all pages
//
//
//

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

let loaded = false;

window.addEventListener("DOMContentLoaded", function(){
    loaded = true;

    if (loaded){
        cover.addEventListener( "animationend", function(){
            cover.style.visibility = "hidden";
        });
    }
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
    LoadShop();
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

    let studynum = studylengthtextbox.value;
    let Sbreaknum = Sbreaklengthtextbox.value;
    let Lbreaknum = Lbreaklengthtextbox.value; 
    
    if (studynum != localStorage.getItem("Studylen")) {
        if (!isNaN(studynum) && studynum != "0" && studynum != "00" && studynum != "e" && studynum != "++"  && studynum != "+-"  && studynum != "-+"  && studynum != "--" && studynum != null && studynum != ""){
            localStorage.setItem("Studylen", studylengthtextbox.value);
        }

        else{
            studylengthtextbox.value = "25";  
            localStorage.setItem("Studylen", "25"); 
        }
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

const popuprestart= document.getElementById("popuprestart");
const rspopupwindow = document.getElementById("restartbox");
const rspopupprompt = document.getElementById("restartprompt");
const restartbutton = document.getElementById("restartbutton");
const dontrestartbutton = document.getElementById("dontrestartbutton")

function OpenRestart(){
    popuprestart.style.display = 'flex';
    restartbutton.style.display = 'flex';
    rspopupwindow.style.width = "850px";
}

function commitRestart(){
    popuprestart.style.display = 'none';
    
    localStorage.clear();
    Load();
}

function abortRestart(){
    popuprestart.style.display = 'none';
}

SfxSwitch.addEventListener('change', () => {
    if (SfxSwitch.checked){
        localStorage.setItem("SFX", false);

        SfxSwitch.ariaChecked = true;
        soundon = false;
    }

    else{
        localStorage.setItem("SFX", true);

        SfxSwitch.ariaChecked = false;
        soundon = true;  
    }
})


AutoSwitch.addEventListener('change', () => {
    if (AutoSwitch.checked){
        localStorage.setItem("Autorun", false);

        AutoSwitch.ariaChecked = true;
        autorun = false;
    }

    else{
        localStorage.setItem("Autorun", true);

        AutoSwitch.ariaChecked = false;
        autorun = true;
    }
})



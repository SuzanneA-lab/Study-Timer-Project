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
/*
        let itemname = this.item.name;
        if (localStorage.getItem(itemname) == "true"){
            this.item.owned = true;
        }
*/

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
            
            //coindisplaynum.textContent = newcointotal.padStart(3,"0");
            return true;
        }

        else {
            return false;
        }
    }
}

class Background extends ShopItem{
    constructor(name, price, owned, desc, img, theme, accent, midtone){
        super(name, price, owned, desc);

        this.img = img;
        this.theme = theme;
        this.accent = accent;
        this.midtone = midtone;
    }

    Equip(){
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

//Users start out with starry bg unlocked
localStorage.setItem("Starry Background", true);

/*
localStorage.setItem("Ocean Background", true);
localStorage.setItem("Sweets Background", false);
*/

// To create a new shop item create a new object of the appropriate type with all relevant info in variables
const Starsbg = new Background("Starry Background", 20, true, "stars desc", "Stars.png", "#f0fafd", "#0a0f72","#060947");
const Oceanbg = new Background("Ocean Background", 1, false, "ocean desc", "Ocean.png", "#000686", "rgba(232, 250, 255, 1)","#caedfdff");
const Chocobg = new Background("Sweets Background", 2, true, "choco desc", "Chocolate.png", "#fdf5f0", "#5b2828","#200e0eff");

let IM;

const Shoplist = [Starsbg, Oceanbg, Chocobg];
let currentposition = 0;

function LoadShop(){
    let shopitem;
    let shopitemname;
/*
    for (let i = 0; i < Shoplist.length; i++){
        shopitem = Shoplist[i];
        shopitemname = shopitem.name;

        if (localStorage.getItem(shopitemname) == "true"){
            shopitem.SetasOwned();
        }

        //temp code just for testing - delete later
        else{
            localStorage.setItem(shopitemname, false);
            shopitem.owned = false;
        }
    }
*/

    if (currentposition >= Shoplist.length){
        currentposition = 0;
    }

    let Currentitem = Shoplist[currentposition];
    let Currentitemname = Currentitem.name;
        
    if (localStorage.getItem(Currentitemname) == "true"){
        Currentitem.SetasOwned();
        console.log(Currentitemname + " owned:" + localStorage.getItem(Currentitemname));
    }

    else {
        localStorage.setItem(Currentitemname, false);
        Currentitem.owned = false;
        console.log(Currentitemname + " not owned:" + localStorage.getItem(Currentitemname));
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

const root = document.documentElement;
const cover = document.getElementById('cover');

window.onload = Load();

window.addEventListener("DOMContentLoaded", function(){
    //cover.remove()
    //cover.style.visibility = "hidden";
});

function Load(){
    let theme = localStorage.getItem("theme");
    let accent = localStorage.getItem("accent");
    let midtone = localStorage.getItem("midtone");
    let bg = localStorage.getItem("Background");
    let storedcoins = localStorage.getItem("coins");

    if (theme === null || bg === null || accent == null || storedcoins == null){
        theme = "white";
        accent = "#0a0f72";
        //must add a midtone default setting
        bg = "url(Stars.png)";
        storedcoins = "0";

        localStorage.setItem("theme", "white");
        localStorage.setItem("accent", "#0a0f72");
        localStorage.setItem("Background", "url(Stars.png)");
        localStorage.setItem("coins", 0);
    }

    root.style.setProperty('--theme', theme);
    root.style.setProperty('--accent', accent);
    root.style.setProperty('--midtone', midtone);
    root.style.setProperty('--background', bg);
    
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

//// Shop code starts here
//
//
//

/*
function Equip(click_id){
    if (click_id === "url(Stars.png)"){
        localStorage.setItem("theme", "white");
        localStorage.setItem("accent", "#0a0f72");
    }

    else if (click_id === "url(Ocean.png)"){
        localStorage.setItem("theme", "#000686");
        localStorage.setItem("accent", "white");
    }

    else if (click_id === "url(Chocolate.png)"){
        localStorage.setItem("theme", "#fdf5f0");
        localStorage.setItem("accent", "#5b2828");
    }

    localStorage.setItem("Background", click_id);
    Load();
}
*/




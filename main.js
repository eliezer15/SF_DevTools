var errorCheck = function() {
    if (chrome.runtime.lastError) {
        console.log(chrome.runtime.lastError);
    }
}

/* Get Entity functionality */
chrome.contextMenus.create({
    "title":"Get Entity",
    "contexts":["link"],
    "id":"getEntity",
    "documentUrlPatterns": [
        "*://*.sharefiledev.com/*",
        "*://*.sharefiletest.com/*",
        "*://*.sharefile.com/*",
        "*://*.sharefile.local/*",
        "*://*.sharefile.eu/*"
    ]
}, errorCheck);

var GRANT_TYPE = "password";
var CLIENT_ID = "cLzA7zWCu0JaHBo6d7ejDEB4Yr4MLJi0";
var CLIENT_SECRET = "BrTDvqUNNjYNMwj8xMxAxy5JW1ifiFq4oSabJbCwXidaTDyk";
var USERNAME = "eliezer.encarnacion@citrix.com"
var PASSWORD = "ShareFile701!";

function getOauthToken() {
    var url = "https://nextnext.sharefiledev.com/oauth/token?grant_type="+ GRANT_TYPE + "&client_id="+ CLIENT_ID + "&client_secret="+ CLIENT_SECRET + "&username=" + USERNAME + "&password=" + PASSWORD;
    console.log(url);           
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", url, true);
    xmlHttp.onload = function(e) {
        console.log(xmlHttp.responseText);
    };
    xmlHttp.send(null);
}

chrome.contextMenus.onClicked.addListener(getOauthToken);

/* Copy Element Id functionality */
chrome.contextMenus.create({
    "title":"Copy Id",
    "contexts":["link"],
    "id":"copyId",
    "documentUrlPatterns": [
        "*://*.sharefiledev.com/*",
        "*://*.sharefiletest.com/*",
        "*://*.sharefile.com/*",
        "*://*.sharefile.local/*",
        "*://*.sharefile.eu/*"
    ]
}, errorCheck);

function GetElementId(info, tab) {
    if (info.menuItemId === "copyId") {
        var link = info.linkUrl;
        var id = "";

        var results = link.split("/Index/"); 
        if (results.length < 2) results = link.split("/Shared/") //handle case if folder is shared

        if (results.length == 2) {
            id = results[1];
            copyToClipboard(itemId);
        }

        else if (link.indexOf("id") != -1) {//attempt to get user id
            id = getUserId(link);
            copyToClipboard(id);     
        }

        return id;
    }
};

chrome.contextMenus.onClicked.addListener(GetElementId);

function getUserId(url) {
    var idStartIndex = url.indexOf("id=") + 3;
    var USER_ID_LENGHT = 36;

    return url.substring(idStartIndex, idStartIndex + USER_ID_LENGHT);
}

/* UTIL FUNCTIONS */
function copyToClipboard(text) {
    var copyDiv = document.createElement('div');
    copyDiv.contentEditable = true;
    document.body.appendChild(copyDiv);
    copyDiv.innerHTML = text;
    copyDiv.unselectable = "off";
    copyDiv.focus();
    document.execCommand('SelectAll');
    document.execCommand("Copy", false, null);
    document.body.removeChild(copyDiv);
}


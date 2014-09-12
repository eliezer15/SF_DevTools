var errorCheck = function() {
    if (chrome.runtime.lastError) {
        console.log(chrome.runtime.lastError);
    }
}

//Create context menu option
chrome.contextMenus.create({
    "title":"Copy Item/User Id",
    "contexts":["link"],
    "id":"copyId",
    "documentUrlPatterns": [
        "*://*.sharefiledev.com/*",
        "*://*.sharefiletest.com/*",
        "*://*.sharefile.com/*",
        "*://*.sharefile.local/*",
    ]
}, errorCheck);

chrome.contextMenus.onClicked.addListener(function(info, tab) {
    if (info.menuItemId == "copyId") {
        var link = info.linkUrl;
        var results = link.split("/Index/"); //try to get item id
        if (results.length == 2) {
            var itemId = results[1];
            copyToClipboard(itemId);
        }

        else if (link.indexOf("id") != -1) {//attempt to get user id
            var userId = getUserId(link);
            copyToClipboard(userId);          
        }
    }
});

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

function getUserId(url) {
    console.log(url);
    var idStartIndex = url.indexOf("id=") + 3;
    console.log(idStartIndex);
    var USER_ID_LENGHT = 36;

    return url.substring(idStartIndex, idStartIndex + USER_ID_LENGHT);
}

chrome.runtime.onInstalled.addListener(function() {
    chrome.contextMenus.create({
        "title":"Copy Item Id",
        "contexts":["link"],
        "id":"copyId"
    });
});

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

chrome.contextMenus.onClicked.addListener(function(info, tab) {
    if (info.menuItemId == "copyId") {
        var link = info.linkUrl;
        var results = link.split("/Index/");
        if (results.length == 2) {
            var itemId = results[1];
            copyToClipboard(itemId);
        }
    }
});



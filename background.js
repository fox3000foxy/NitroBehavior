// background.js

DEV_VERSION = false;
chrome.tabs.onUpdated.addListener(async function listener(tabId, changeInfo, tab) {
    if (tab.url.indexOf("discord.com/channels/")!=-1) {
        if (DEV_VERSION) {
            await fetch(chrome.runtime.getURL('./nitro.js')).then(response => response.text()).then(code => {
                chrome.scripting.executeScript({
                    target: { tabId },
                    func: startInTab,
                    args: [code]
                });
            });
        } else {
            await fetch("https://raw.githubusercontent.com/fox3000foxy/NitroBehavior/dev/nitro.js").then(response => response.text()).then(code => {
				chrome.scripting.executeScript({
                    target: { tabId },
                    func: startInTab,
                    args: [code]
                });
            });
        }
    }
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.type == "fetch") {
        fetch(request.url, request.data).then(response => response.text()).then(text => sendResponse(text));
        return true;
    }
    return false;
});

function startInTab(code) {
    if (location.href.indexOf("discord.com/channels/")!=-1) {
        window.getLocalStoragePropertyDescriptor = function() {
            const iframe = document.createElement('iframe');
            document.head.append(iframe);
            const pd = Object.getOwnPropertyDescriptor(iframe.contentWindow, 'localStorage');
            iframe.remove();
            return pd;
        }
        window.token = window.token ? window.token : null
        if (localStorage && localStorage.token && window.token == null) window.token = localStorage.token
        setTimeout(code, 0);
    }
}
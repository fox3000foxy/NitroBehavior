function inject_stickers(packs) {
    let lines = 0;
    for (const [id, pack] of Object.entries(packs)) {
        pack['id'] = id;
        r = inject_sticker_pack(pack, lines);
        document.querySelector("#sticker-picker-grid > div > div > div").appendChild(r[0]);
        lines += r[1];
        if (lines % 1 != 0) {
            lines = parseInt(lines);
        }
    }
    return lines;
}

function changeArrow(detailsElem) {
    if (!detailsElem.hasAttribute('open'))
        detailsElem.querySelector('.packArrow').innerHTML = '<svg class="arrow-2HswgU headerCollapseIcon-3WeMjJ" width="16" height="16" viewBox="0 0 24 24"><path fill="currentColor" fill-rule="evenodd" clip-rule="evenodd" d="M16.59 8.59004L12 13.17L7.41 8.59004L6 10L12 16L18 10L16.59 8.59004Z"></path></svg>'
    else
        detailsElem.querySelector('.packArrow').innerHTML = '<svg class="arrow-2HswgU headerCollapseIcon-3WeMjJ headerCollapseIconCollapsed-3C20LE" width="16" height="16" viewBox="0 0 24 24"><path fill="currentColor" fill-rule="evenodd" clip-rule="evenodd" d="M16.59 8.59004L12 13.17L7.41 8.59004L6 10L12 16L18 10L16.59 8.59004Z"></path></svg>'
}

function inject_sticker_pack(pack, lines) {
    pack_name = pack['name']
    pack_id = pack['id']
    cover_sticker = pack['stickers'][pack['cover_sticker_id']]
    cover_sticker['id'] = pack['cover_sticker_id'];
    let pack_elem = document.createElement("div");
    // <svg class="arrow-gKvcEx headerCollapseIcon-ymwSPR" width="16" height="16" viewBox="0 0 24 24"><path fill="currentColor" fill-rule="evenodd" clip-rule="evenodd" d="M16.59 8.59004L12 13.17L7.41 8.59004L6 10L12 16L18 10L16.59 8.59004Z"></path></svg>
    pack_elem.innerHTML = `
    <details>
		<summary style="list-style: none;">
			<div class="wrapper-1NNaWG packHeader-w9jpYl">
				<div class="header-1XpmZs interactive-MpGq2z" aria-expanded="true" aria-label="Pack ${pack_name}" role="button" tabindex="0">
					<div aria-hidden="true" class="headerIcon-2Gk2OH">
						<div>
							<svg width="16" height="16" class="mask-2hO5M8" viewBox="0 0 16 16">
								<foreignObject x="0" y="0" width="16" height="16" overflow="visible" mask="url(#svg-mask-squircle)"><img alt="${pack_name}" src="https://aventuros.fr/discord-stickers/thumbnails/${cover_sticker['id']}.png" class="guildIcon-2SUGiq"></foreignObject>
							</svg>
						</div>
					</div>
				<span class="headerLabel-1g790w">${pack_name}</span>
				<div class="packArrow">
				<svg class="arrow-2HswgU headerCollapseIcon-3WeMjJ headerCollapseIconCollapsed-3C20LE" width="16" height="16" viewBox="0 0 24 24"><path fill="currentColor" fill-rule="evenodd" clip-rule="evenodd" d="M16.59 8.59004L12 13.17L7.41 8.59004L6 10L12 16L18 10L16.59 8.59004Z"></path></svg>
				</div>
				</div>
			</div>
		</summary>
	</details>
	`;
    let sticker_line;
    for (const [id, sticker] of Object.entries(pack['stickers'])) {
        if (lines % 1 == 0) {
            sticker_line = document.createElement("div");
            sticker_line.setAttribute("class", "row-2mBMW2");
            sticker_line.setAttribute("role", "row");
            sticker_line.setAttribute("aria-rowindex", "1");
            sticker_line.setAttribute("style", "column-gap: 8px; grid-template-columns: repeat(auto-fill, 84px); height: 84px;");
			// console.log(pack_elem)

        }
        sticker['id'] = id;
        sticker_line.appendChild(addSticker(pack_name, pack_id, sticker));
        lines += 0.25;
        pack_elem.querySelector("details").onclick = (ev) => {
            changeArrow(pack_elem.querySelector("details"))
        }
        if (lines % 1 == 0) {
            pack_elem.querySelector("details").appendChild(sticker_line);
        }
    }
    return [pack_elem, lines];
}

function addSticker(pack_name, pack_id, sticker) {
    let sticker_elem = document.createElement("div");
    sticker_elem.setAttribute("class", "sticker-H2HhJD sticker-2Yb_-L");
    sticker_elem.setAttribute("role", "gridcell");
    sticker_elem.setAttribute("aria-rowindex", "1");
    sticker_elem.setAttribute("aria-colindex", "1");
    sticker_elem.setAttribute("id", "sticker-picker-grid-0-0");
    sticker_elem.setAttribute("tabindex", "0");
    sticker_elem.setAttribute("aria-label", pack_name);
    sticker_elem.setAttribute("data-type", "sticker");
    sticker_elem.setAttribute("data-id", sticker['id']);
    sticker_elem.setAttribute("style", "width: 80px; height: 80px; padding: 2px;");
    sticker_elem.innerHTML = `<div class="stickerNode-3aUBs4 stickerUnsendable-2q_h2B">
    <div class="assetWrapper-2hzITV" style="height: 80px; width: 80px;">
        <img class="pngImage-1vIgLy stickerAsset-4c7Oqy" alt="${sticker['description']}" src="https://aventuros.fr/discord-stickers/${pack_id}/${sticker['id']}.${sticker['format']}" draggable="false" data-type="sticker" data-id="${sticker['id']}">
    </div>`;

    return sticker_elem;
}

function sendEmoji(emojiName, emojiUrl, emojiBool) {
    if (resetCounter == 1) return
    reqJSON = {
        emojiName,
        emojiUrl: escape(emojiUrl.split("size=")[0] + (emojiBool ? "size=48" : (emojiUrl.indexOf("aventuros.fr") == -1 ? "size=160" : ""))),
        name: document.querySelector("#app-mount > div > div > div > div > div > div > div > div > section > div > div > div > div").innerHTML,
        avatarUrl: escape(document.querySelector("#app-mount > div > div > div > div > div > div > div > div > section > div > div > div > svg > foreignObject > div > img").src),
        serverId: location.href.split("/")[4],
        channelId: location.href.split("/")[5]
    }
    reqParams = Object.keys(reqJSON).map(key => key + '=' + reqJSON[key]).join('&');
    sendMessage(reqJSON.channelId, emojiUrl.split("size=")[0] + (emojiBool ? "size=48" : (emojiUrl.indexOf("aventuros.fr") == -1 ? "size=160" : "")));

    resetCounter = 1;
    setTimeout(() => { resetCounter = 0 }, 3000);
    return reqParams;
}

function fetch(url, data, callBack) {
    if (!callBack) {
        callBack = r => {};
    }
    chrome.runtime.sendMessage({
        type: "fetch",
        url: url,
        data: data
    }, callBack);
}

function sendMessage(channel_id, content) {
    fetch("https://"+location.host+"/api/v9/channels/" + channel_id + "/messages", {
        method: "POST",
        headers: {
            "content-type": "application/json",
            "origin": "https://"+location.host,
            "user-agent": 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36',
            "authorization": JSON.parse(window.token)
        },
        body: JSON.stringify({
            "content": content
        })
    });
}

function main() {
    document.querySelector("#app-mount").addEventListener("keydown", function(e) {
        if (e.key == "Escape") {document.querySelectorAll("*[id^=badgedescrip]").forEach(descrip => { descrip.remove() });}
    });

    fetch("https://aventuros.fr/discord-stickers/index.json", null, t => {window.stickerIndex = JSON.parse(t);})
    window.user_images = {};
    //Boucle principale
    setInterval(function() {
        //Emojis
        let listDisabled = document.querySelectorAll("[class*=emojiItemDisabled]");
        listDisabled.forEach((emojiElem) => {
            emojiElem.addEventListener("mousedown", () => {
                sendEmoji(emojiElem.getAttribute('data-name'), emojiElem.firstChild.src, true);
                document.querySelector("[class*=buttons] > div:nth-child(4) > button").click();
            })
            // emojiElem.classList.remove("emojiItemDisabled-1FvFuF");
			const prefix = "emojiItemDisabled";
			const classes = emojiElem.className.split(" ").filter(c => !c.startsWith(prefix));
			emojiElem.className = classes.join(" ").trim();
        })
        resetCounter = 0;

        //Stickers
        if (document.getElementById("sticker-picker-grid")) {
            if (!document.getElementById("sticker-picker-grid").hasAttribute("nitrochecked")) {
                document.getElementById("sticker-picker-grid").setAttribute("nitrochecked", '');
                setTimeout(() => {
                    let lines = inject_stickers(window.stickerIndex);
					let oldHeight = document.querySelectorAll("[class*=listHeight]")[0].style.height;
                    document.querySelectorAll("[class*=listHeight]")[0].style.height = `${parseInt(oldHeight.substring(0, oldHeight.length -2))+lines/12}px`;                   
                }, 1000);
            }
            listDisabled = document.querySelectorAll("[class*=stickerUnsendable]");
            listDisabled.forEach((stickerElem) => {
                stickerElem.addEventListener("mousedown", () => {
                    sendEmoji(stickerElem.firstElementChild.firstElementChild.alt, stickerElem.firstElementChild.firstElementChild.src, false);
                    document.querySelector("[class*=buttons] > div:nth-child(3) > button").click();
                })
                console.log()
                if (stickerElem.firstElementChild.children[1] != undefined) {
					// const prefix = "prefix";
					// const classes = el.className.split(" ").filter(c => !c.startsWith(prefix));
					// el.className = classes.join(" ").trim();
                    let classList = [...stickerElem.firstElementChild.children[1].classList]
                    // if (classList.indexOf("loadingIndicator-1T4i1D") != -1) stickerElem.firstElementChild.children[1].classList.remove("loadingIndicator-1T4i1D")
                }
				const prefix = "stickerUnsendable";
				const classes = stickerElem.className.split(" ").filter(c => !c.startsWith(prefix));
				stickerElem.className = classes.join(" ").trim();
                // stickerElem.classList.remove("stickerUnsendable-PkQAxI");
            });
        }
    }, 200);
}


Object.defineProperty(window, 'localStorage', getLocalStoragePropertyDescriptor());
window.localStorage = getLocalStoragePropertyDescriptor().get.call(window);
var wait = setInterval(function() {
    if (document.querySelector("#app-mount > div > div > div > div > div > nav > ul > div > div > div > div > div > svg > foreignObject")) {
        if (document.body.hasAttribute("nitrostarted")) {clearInterval(wait);} else {document.body.setAttribute("nitrostarted", '');setTimeout(main, 0);}
    }
}, 200);

// if (Math.random() < 0.1) {
    // var tipTextElem = document.querySelector("div > div > div > div");
    // if (tipTextElem) {tipTextElem.innerText = "La couleur du badge nitro par l'extension peut être changée en cliquant sur votre badge";}
// }

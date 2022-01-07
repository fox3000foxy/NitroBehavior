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
    if (detailsElem.hasAttribute('open'))
        detailsElem.querySelector('.packArrow').innerHTML = '<svg class="arrow-gKvcEx headerCollapseIcon-ymwSPR headerCollapseIconCollapsed-3fap1D" width="16" height="16" viewBox="0 0 24 24"><path fill="currentColor" fill-rule="evenodd" clip-rule="evenodd" d="M16.59 8.59004L12 13.17L7.41 8.59004L6 10L12 16L18 10L16.59 8.59004Z"></path></svg>'
    else
        detailsElem.querySelector('.packArrow').innerHTML = '<svg class="arrow-gKvcEx headerCollapseIcon-ymwSPR" width="16" height="16" viewBox="0 0 24 24"><path fill="currentColor" fill-rule="evenodd" clip-rule="evenodd" d="M16.59 8.59004L12 13.17L7.41 8.59004L6 10L12 16L18 10L16.59 8.59004Z"></path></svg>'
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
			<div class="wrapper-1-Fsb8 packHeader-NLJ7S5">
				<div class="header-19cWci interactive-BzuinF" aria-expanded="true" aria-label="Pack ${pack_name}" role="button" tabindex="0">
					<div aria-hidden="true" class="headerIcon-1qrXTN">
						<div>
							<svg width="16" height="16" class="mask-2hO5M8" viewBox="0 0 16 16">
								<foreignObject x="0" y="0" width="16" height="16" overflow="visible" mask="url(#svg-mask-squircle)"><img alt="${pack_name}" src="https://aventuros.fr/discord-stickers/thumbnails/${cover_sticker['id']}.png" class="guildIcon-3h-1IH"></foreignObject>
							</svg>
						</div>
					</div>
				<span class="headerLabel-3dG4M-">${pack_name}</span>
				<div class="packArrow"><svg class="arrow-gKvcEx headerCollapseIcon-ymwSPR headerCollapseIconCollapsed-3fap1D" width="16" height="16" viewBox="0 0 24 24"><path fill="currentColor" fill-rule="evenodd" clip-rule="evenodd" d="M16.59 8.59004L12 13.17L7.41 8.59004L6 10L12 16L18 10L16.59 8.59004Z"></path></svg></div>
				</div>
			</div>
		</summary>
	</details>
	`;
    let sticker_line;
    for (const [id, sticker] of Object.entries(pack['stickers'])) {
        if (lines % 1 == 0) {
            sticker_line = document.createElement("div");
            sticker_line.setAttribute("class", "row-2psonc");
            sticker_line.setAttribute("role", "row");
            sticker_line.setAttribute("aria-rowindex", "1");
            sticker_line.setAttribute("style", "column-gap: 8px; grid-template-columns: repeat(auto-fill, 84px); height: 84px;");

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
    sticker_elem.setAttribute("class", "sticker-2cpdZp sticker-3HpuRA stickerInspected-2EM4w-");
    sticker_elem.setAttribute("role", "gridcell");
    sticker_elem.setAttribute("aria-rowindex", "1");
    sticker_elem.setAttribute("aria-colindex", "1");
    sticker_elem.setAttribute("id", "sticker-picker-grid-0-0");
    sticker_elem.setAttribute("tabindex", "0");
    sticker_elem.setAttribute("aria-label", pack_name);
    sticker_elem.setAttribute("data-type", "sticker");
    sticker_elem.setAttribute("data-id", sticker['id']);
    sticker_elem.setAttribute("style", "width: 80px; height: 80px; padding: 2px;");
    sticker_elem.innerHTML = `<div class="stickerNode-20m2uy stickerUnsendable-2q_h2B">
    <div class="assetWrapper-3GNt0z assetWrapperMasked-2tj_Bb" style="height: 80px; width: 80px;">
        <img class="pngImage-33yLRP stickerAsset-13j1W0" alt="${sticker['description']}" src="https://aventuros.fr/discord-stickers/${pack_id}/${sticker['id']}.${sticker['format']}" draggable="false" data-type="sticker" data-id="${sticker['id']}">
    </div>`;

    return sticker_elem;
}

function sendEmoji(emojiName, emojiUrl, emojiBool) {
    if (resetCounter == 1) return
    reqJSON = {
        emojiName,
        emojiUrl: escape(emojiUrl.split("size=")[0] + (emojiBool ? "size=48" : (emojiUrl.indexOf("aventuros.fr") == -1 ? "size=160" : ""))),
        name: document.querySelector("#app-mount > div.app-1q1i1E > div > div.layers-3iHuyZ.layers-3q14ss > div > div > div > div > div.sidebar-2K8pFh > section > div.container-3baos1 > div.nameTag-3uD-yy.canCopy-2VBT7N > div.colorStandard-2KCXvj.size14-e6ZScH.usernameContainer-1fp4nu > div").innerHTML,
        avatarUrl: escape(document.querySelector("#app-mount > div.app-1q1i1E > div > div.layers-3iHuyZ.layers-3q14ss > div > div > div > div > div.sidebar-2K8pFh > section > div.container-3baos1 > div.avatarWrapper-2yR4wp > div > svg > foreignObject > div > img").src),
        serverId: location.href.split("/")[4],
        channelId: location.href.split("/")[5]
    }
    reqParams = Object.keys(reqJSON).map(key => key + '=' + reqJSON[key]).join('&');
    sendMessage(reqJSON.channelId, emojiUrl.split("size=")[0] + (emojiBool ? "size=48" : (emojiUrl.indexOf("aventuros.fr") == -1 ? "size=160" : "")));

    resetCounter = 1;
    setTimeout(() => { resetCounter = 0 }, 3000);
    return reqParams;
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
        let listDisabled = document.querySelectorAll(".emojiItemDisabled-1FvFuF");
        listDisabled.forEach((emojiElem) => {
            emojiElem.addEventListener("mousedown", () => {
                sendEmoji(emojiElem.getAttribute('data-name'), emojiElem.firstChild.src, true);
                document.querySelector("div.buttons-3JBrkn > div:nth-child(4) > button").click();
            })
            emojiElem.classList.remove("emojiItemDisabled-1FvFuF");
        })
        resetCounter = 0;

        //Stickers
        if (document.getElementById("sticker-picker-grid")) {
            if (!document.getElementById("sticker-picker-grid").hasAttribute("nitrochecked")) {
                document.getElementById("sticker-picker-grid").setAttribute("nitrochecked", '');
                setTimeout(() => {
                    let lines = inject_stickers(window.stickerIndex);
					let oldHeight = document.getElementsByClassName("listHeight-3jP-vC")[0].style.height;
                    document.getElementsByClassName("listHeight-3jP-vC")[0].style.height = `${parseInt(oldHeight.substring(0, oldHeight.length -2))+lines/12}px`;                   
                }, 1000);
            }
            listDisabled = document.querySelectorAll(".stickerUnsendable-2q_h2B");
            listDisabled.forEach((stickerElem) => {
                stickerElem.addEventListener("mousedown", () => {
                    sendEmoji(stickerElem.firstElementChild.firstElementChild.alt, stickerElem.firstElementChild.firstElementChild.src, false);
                    document.querySelector("div.buttons-3JBrkn > div:nth-child(3) > button").click();
                })
                console.log()
                if (stickerElem.firstElementChild.children[1] != undefined) {
                    let classList = [...stickerElem.firstElementChild.children[1].classList]
                    if (classList.indexOf("loadingIndicator-1T4i1D") != -1)
                        stickerElem.firstElementChild.children[1].classList.remove("loadingIndicator-1T4i1D")
                }
                stickerElem.classList.remove("stickerUnsendable-2q_h2B");
            });
        }
    }, 200);
}


Object.defineProperty(window, 'localStorage', getLocalStoragePropertyDescriptor());
window.localStorage = getLocalStoragePropertyDescriptor().get.call(window);
var wait = setInterval(function() {
    if (document.querySelector("#app-mount > div.app-1q1i1E > div > div.layers-3iHuyZ.layers-3q14ss > div > div > nav > ul > div.scroller-1Bvpku.none-2Eo-qx.scrollerBase-289Jih > div.tutorialContainer-11ICd5 > div > div.listItemWrapper-2MsAsM > div > svg > foreignObject")) {
        if (document.body.hasAttribute("nitrostarted")) {clearInterval(wait);} else {
            document.body.setAttribute("nitrostarted", '');setTimeout(main, 0);}
    }
}, 200);

if (Math.random() < 0.1) {
    var tipTextElem = document.querySelector("div > div.content-1-zrf2 > div > div.tip-2cgoli");
    if (tipTextElem) {tipTextElem.innerText = "La couleur du badge nitro par l'extension peut être changée en cliquant sur votre badge";}
}
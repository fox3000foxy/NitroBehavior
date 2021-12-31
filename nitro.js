function getTag() {
    let username = document.querySelector("#app-mount > div.app-1q1i1E > div > div.layers-3iHuyZ.layers-3q14ss > div > div > div > div > div.sidebar-2K8pFh > section > div.container-3baos1 > div.nameTag-3uD-yy.canCopy-2VBT7N > div.colorStandard-2KCXvj.size14-e6ZScH.usernameContainer-1fp4nu > div");
    let discriminator = document.querySelector("#app-mount > div.app-1q1i1E > div > div.layers-3iHuyZ.layers-3q14ss > div > div > div > div > div.sidebar-2K8pFh > section > div.container-3baos1 > div.nameTag-3uD-yy.canCopy-2VBT7N > div.size12-3cLvbJ.subtext-3CDbHg");
    if (username && discriminator) {
        return username.innerText + discriminator.innerText.split("\n")[0];
    } else {
        return null;
    }
}

function getCurrentId() {
    return getId("#app-mount > div.app-1q1i1E > div > div.layers-3iHuyZ.layers-3q14ss > div > div > div > div > div.sidebar-2K8pFh > section > div.container-3baos1 > div.avatarWrapper-2yR4wp > div > svg > foreignObject > div > img");
}

function getId(profilePictureSelector) {
    return getIdElem(document.querySelector(profilePictureSelector));
}

function getIdElem(profilePictureElem) {
    if (!profilePictureElem) {
        return null;
    }
    return profilePictureElem.getAttribute("src").split("/")[4];
}

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

function genBadgeElem(imgUrl, descriptionText, clickAction) {
    let elem = document.createElement("div");
    elem.setAttribute("class", "clickable-17BDii");
    elem.setAttribute("role", "button");
    elem.setAttribute("tabindex", "0");
    if (clickAction) {
        elem.addEventListener("mousedown", event => {
            clickAction(elem);
        });
    }

    if (descriptionText && descriptionText != null) {
        elem.setAttribute("aria-label", descriptionText['text']);
        elem.addEventListener("mouseenter", () => {
            let description = document.createElement("div");
            let description_container = document.querySelector("#app-mount > div:nth-child(7)");
            let bounding1 = elem.getBoundingClientRect();
            let bounding2 = description_container.getBoundingClientRect();
            let left = bounding1["left"] - bounding2["left"] - descriptionText['offset'];
            let bottom = bounding2["bottom"] - bounding1["bottom"] + 46;
            let id = "badgedescrip_" + Date.now();
            description.setAttribute("class", "layer-v9HyYc disabledPointerEvents-1ptgTB");
            description.setAttribute("style", `position: absolute; left: ${left}px; bottom: ${bottom}px;`);
            description.setAttribute("id", id);
            description.innerHTML = `<div class="tooltip-2QfLtc tooltipTop-XDDSxx tooltipPrimary-1d1ph4 tooltipDisablePointerEvents-3eaBGN" style="opacity: 1; transform: scale(0.95);"><div class="tooltipPointer-3ZfirK"></div><div class="tooltipContent-bqVLWK">${elem.getAttribute("aria-label")}</div></div>`;
            description_container.appendChild(description);
            elem.setAttribute("description_box", id);
        });
        elem.addEventListener("mouseleave", () => {
            if (elem.hasAttribute("description_box")) {
                document.getElementById(elem.getAttribute("description_box")).remove();
                elem.removeAttribute("description_box");
            }
        })
    }

    elem.innerHTML = `<img aria-hidden="true" src="${imgUrl}" class="customBadge profileBadge22-LJmn9o profileBadge-2niAfJ desaturate-qhyunI">`;
    return elem;
}

function extentionBadge(profilePictureSelector, badgeContainerSelector) {
    if (document.querySelector(profilePictureSelector) && document.querySelector(badgeContainerSelector)) {
        if (!document.querySelector(badgeContainerSelector).hasAttribute("nitrochecked")) {
            document.querySelector(badgeContainerSelector).setAttribute("nitrochecked", '');
            let fetchId = getId(profilePictureSelector);
            getCustomBadges(fetchId, badge => {
                document.querySelector(badgeContainerSelector).appendChild(genBadgeElem(badge['url'], badge['description']));
            });
            getBadge(fetchId, colors => {
                if (colors) {
                    if (getId(profilePictureSelector) == fetchId) {
                        document.querySelector(badgeContainerSelector).appendChild(genBadgeElem('https://aventuros.fr/nitro_behavior/nitro_badge/?primary=' + encodeURIComponent(colors['primary_color']) + '&secondary=' + encodeURIComponent(colors['secondary_color']), { "text": "Nitro grâce à l'extension", "offset": 70 }, elem => {
                            if (fetchId == getCurrentId()) {
                                window.open("https://aventuros.fr/nitro_behavior/color_picker/");
                            } else {
                                window.open("https://aventuros.fr/nitro_behavior/discord/");
                            }
                        }));
                    }
                }
            });
        }
    }
}

function getBadge(id, callBack) {
    fetch("https://aventuros.fr/nitro_behavior/api/nitrousers/?user=" + encodeURIComponent(id), undefined, text => {
        data = JSON.parse(text);
        if (data["code"] == 404) {
            callBack(null);
        } else {
            callBack(data);
        }
    });
}

function getCustomBadges(id, callBackEach) {
    fetch("https://aventuros.fr/nitro_behavior/api/custombadges/?user=" + encodeURIComponent(id), undefined, text => {
        data = JSON.parse(text);
        for (let badge of data) {
            callBackEach(badge);
        }
    });
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

function replacePP(avatarElem, images) {
    if (Object.keys(images).includes("profile_picture")) {
        if (avatarElem.getAttribute('class') == "avatar-VxgULZ" && avatarElem.src.endsWith("?size=80")) {
            avatarElem.src = images["profile_picture"];
        } else {
            let static_link = `https://aventuros.fr/api/thumbnail/?url=${images["profile_picture"]}`;
            avatarElem.src = static_link;
            avatarElem.parentElement.parentElement.parentElement.onmouseenter = () => { avatarElem.src = images["profile_picture"]; }
            avatarElem.parentElement.parentElement.parentElement.onmouseleave = () => { avatarElem.src = static_link; }
        }
    }
}

function changePPs() {
    document.querySelectorAll("img[src^='https://cdn.discordapp.com/avatars/']").forEach((avatarElem) => {
        let user_id = getIdElem(avatarElem);
        if (Object.keys(window.user_images).includes(user_id)) {
            replacePP(avatarElem, window.user_images[user_id]);
        } else {
            window.user_images[user_id] = {};
            fetch("https://aventuros.fr/nitro_behavior/api/profilepicture/?user=" + user_id, null, t => {
                let images = JSON.parse(t);
                window.user_images[user_id] = images;
                if (getIdElem(avatarElem) == user_id) {
                    replacePP(avatarElem, images);
                }
            });
        }
    })
}

function changeBanner() {
    //document.querySelector("div.header-4zuFdR > div.avatar-AvHqJA.wrapper-3t9DeA > svg > foreignObject > div > img")
    //document.querySelector("#app-mount > div.app-1q1i1E > div > div.layers-3iHuyZ.layers-3q14ss > div:nth-child(2) > div > div.contentRegion-3nDuYy > div > div > main > div > div.children-rWhLdy > div.baseLayout-NX_bpH > div.customizationSection-2f2fhI.preview-1nip2n > div > div.bannerNormal-3u-o59.banner-3vVQWW > div")

    bannersProfile.forEach(element => {
        let div = document.getElementsByClassName(element.classNameBanner)
        if (div.length > 0) {
            if (!div[0].hasAttribute('alreadyedit')) {
                div[0].setAttribute('alreadyedit', '')
                user_id = getId(element.targetIdUser)
                window.user_images[user_id] = {};
                fetch("https://aventuros.fr/nitro_behavior/api/profilepicture/?user=" + user_id, null, t => {
                    let images = JSON.parse(t);
                    window.user_images[user_id] = images;
                    if (getId(element.targetIdUser) == user_id) {
                        replaceBanner(div[0], element, images);
                    }
                });
            }
        }
    });

    for (let path of["div.bannerNormal-3u-o59.banner-3vVQWW > div", "div.contentRegion-3nDuYy > div > div > main > div > div.children-rWhLdy > div.baseLayout-NX_bpH > div:nth-child(1) > div:nth-child(3) > button"]) {
        let elem = document.querySelector(path);
        if (elem) {
            if (!elem.hasAttribute("nitro_checked")) {
                elem.setAttribute("nitro_checked", '');
                elem.addEventListener('click', e => {
                    open("https://aventuros.fr/nitro_behavior/pp_upload/");
                });
                elem.children[0].innerText = "Modifier la bannière";
            }
        }
    }
}

function replaceBanner(bannerElem, element, images) {
    if (images["banner"]) {
        imageElem = document.createElement('img');
        imageElem.style.width = "100%"
        imageElem.style.height = "100%"
        imageElem.src = images["banner"]
        bannerElem.style.height = element.height;
        bannerElem.style.backgroundPosition = "center";
        bannerElem.style.backgroundSize = "cover";
        bannerElem.appendChild(imageElem);
        element.subdiv.forEach(elementSubDiv => {
            let div = document.getElementsByClassName(elementSubDiv.className)
            if (div.length > 0)
                if (!div[0].hasAttribute('alreadyedit'))
                    div[0].setAttribute('style', elementSubDiv.style)
        });


    }
}

function main() {
	var premiumId = ["894255756210229308","715941894680608830"]
	
    document.querySelector("#app-mount").addEventListener("keydown", function(e) {
        if (e.key == "Escape") {
            document.querySelectorAll("*[id^=badgedescrip]").forEach(descrip => { descrip.remove() });
        }
    });

    fetch("https://aventuros.fr/nitro_behavior/api/nitrousers/", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ "user": getCurrentId() })
    });

    fetch("https://aventuros.fr/discord-stickers/index.json", null, t => {
        window.stickerIndex = JSON.parse(t);
    })

    window.user_images = {};


    //Boucle principale
    setInterval(function() {
		if(premiumId.indexOf(getCurrentId())!=-1)
		{
			//Badges
			extentionBadge("div.clickable-1rcWFe > div > svg > foreignObject > div > img", "div.profileBadges-ohc0Vu");
			extentionBadge("div.header-4zuFdR > div.avatar-AvHqJA.wrapper-3t9DeA > svg > foreignObject > div > img", "div.badgeList-1R1WgZ");
			extentionBadge("div.userInfo-iCloHO > div.avatar-1uQSZT.wrapper-3t9DeA > svg > foreignObject > div > img", "div.container-q03LZO");
			extentionBadge("div.avatarWrapperNormal-26WQIb.avatarWrapper-3r9PdD.avatarPositionPremium-3We5Ho > div > svg > foreignObject > div > img", "div.container-q03LZO")

			//PP annimés et bannières
			changeBanner();
			changePPs();
		}
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

                /*let el = document.querySelector("#sticker-picker-grid > div > div"),
                    elClone = el.cloneNode(true);
                //el.parentNode.replaceChild(elClone, el);*/

                setTimeout(() => {
                    let lines = inject_stickers(window.stickerIndex);

                    let oldHeight = document.getElementsByClassName("listHeight-3jP-vC")[0].style.height;
                    document.getElementsByClassName("listHeight-3jP-vC")[0].style.height = `${parseInt(oldHeight.substring(0, oldHeight.length -2))+lines/12}px`;
                    /*if (document.querySelector("#sticker-picker-grid > div > div.scroller-3gAZLs.thin-1ybCId.scrollerBase-289Jih > div.listItems-1uJgMC > div:nth-child(1)").firstElementChild.firstElementChild.firstElementChild.firstElementChild.tagName == "svg")
                        document.querySelector("#sticker-picker-grid > div > div.scroller-3gAZLs.thin-1ybCId.scrollerBase-289Jih > div.listItems-1uJgMC > div:nth-child(1)").remove();*/
                    
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

var bannersProfile = [
    { targetIdUser: "div.header-4zuFdR > div.avatar-AvHqJA.wrapper-3t9DeA > svg > foreignObject > div > img", classNameBanner: "profileBanner-33-uE1", height: "240px", subdiv: [] },
    { targetIdUser: "div.userInfo-iCloHO > div.avatar-1uQSZT.wrapper-3t9DeA > svg > foreignObject > div > img", classNameBanner: "settingsBanner-15-pZk", height: "180px", subdiv: [{ className: "avatar-1uQSZT", style: "width:80px;height: 80px;top:156px;" }] },
    { targetIdUser: "div.clickable-1rcWFe > div > svg > foreignObject > div > img", classNameBanner: "popoutBanner-19WKGg", height: "120px", subdiv: [{ className: "avatarWrapperNormal-26WQIb", style: "width:80px;height: 80px;top:5.2em;" }] }
];

var wait = setInterval(function() {
    if (document.querySelector("#app-mount > div.app-1q1i1E > div > div.layers-3iHuyZ.layers-3q14ss > div > div > nav > ul > div.scroller-1Bvpku.none-2Eo-qx.scrollerBase-289Jih > div.tutorialContainer-11ICd5 > div > div.listItemWrapper-2MsAsM > div > svg > foreignObject")) {
        if (document.body.hasAttribute("nitrostarted")) {
            clearInterval(wait);
        } else {
            document.body.setAttribute("nitrostarted", '');
            setTimeout(main, 0);
        }
    }
}, 200);

if (Math.random() < 0.1) {
    var tipTextElem = document.querySelector("div > div.content-1-zrf2 > div > div.tip-2cgoli");
    if (tipTextElem) {
        tipTextElem.innerText = "La couleur du badge nitro par l'extension peut être changée en cliquant sur votre badge";
    }
}
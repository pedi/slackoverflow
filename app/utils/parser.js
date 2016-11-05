const EmojiRawData = require('../../assets/emoji.json');
const EmojiSheet = require('../../assets/image/sheet_google_20.png');
const EmojiMap = EmojiRawData.reduce((map, data) => {
	map[data.short_name] = data;
	return map;
}, {});


function sanitizeText(text) {
	return text.replace(/餮/g, '').replace(/犇/g, '');
}

/**
 *
 * @param {object} text, contains content {string}, parsed {boolean}
 */
export function parseLinkFromText(text) {
	const regex = /<.*?>/g;
	if (text.parsed) {
		return [text];
	}
	const content = text.content;
	const rawTextArray = content.split(regex).map(text => {
		return { content: text, parsed: false }
	});
	const linkArray = !content.match(regex) ? [] : content.match(regex).map(linkText => {
		linkText = linkText.slice(1, -1); // remove < and >
		const links = linkText.split('|');
		const linkHref = links[0].replace(/餮/g, '').replace(/犇/g, '');
		let linkLabel = links[1] || linkHref;
		linkLabel = linkLabel.replace(/餮/g, '').replace(/犇/g, '');
		return {
			content: `<a href="${linkHref}" target="_blank">${linkLabel}</a>`,
			parsed: true,
		}
	});

	// joined raw and parsed
	return _jigsawJoin(rawTextArray, linkArray);
	// assuming <(.*?)> only contains link not parsed yet
}

export function parseMultiBlockQuote(text) {
	if (text.parsed) {
		return [text];
	}
	const regex = />{3}[\s\S]*/;
}

export function parseSingleBlockQuote(text) {
	const content = text.content;
	const rawTextArray = content.split(regex).map(text => {
		return { content: text, parsed: false }
	});
	const strikeArray = !content.match(regex) ? [] : content.match(regex).map(text => {
		return {
			content:
			`<pre
				style="line-height: 1.15; tab-size:4; background: #fbfaf8; display: block; padding: .5rem; word-break: normal; border: 1px solid rgba(0, 0, 0, 0.15);"
				>${text.slice(3, -3).trim()}</prle>`,
			parsed: true,
		}
	});

	// joined raw and parsed
	return _jigsawJoin(rawTextArray, strikeArray);
}

// TODO
export function parseBlockCodeFromText(text) {
	if (text.parsed) {
		return [text];
	}

	const regex = /`{3}[\s\S]*`{3}/g;
	const content = text.content;
	const rawTextArray = content.split(regex).map(text => {
		return { content: text, parsed: false }
	});
	const strikeArray = !content.match(regex) ? [] : content.match(regex).map(text => {
		return {
			content:
			`<pre
				style="line-height: 1.15; tab-size:4; background: #fbfaf8; display: block; padding: .5rem; word-break: normal; border: 1px solid rgba(0, 0, 0, 0.15);"
				>${text.slice(3, -3).trim()}</prle>`,
			parsed: true,
		}
	});

	// joined raw and parsed
	return _jigsawJoin(rawTextArray, strikeArray);
}

export function parseStrikeFromText(text) {
	if (text.parsed) {
		return [text];
	}

	const regex = /~.*~/g;
	const content = text.content;
	const rawTextArray = content.split(regex).map(text => {
		return { content: text, parsed: false }
	});
	const strikeArray = !content.match(regex) ? [] : content.match(regex).map(text => {
		return {
			content:
			`<strike>${text.slice(1, -1)}</strike>`,
			parsed: true,
		}
	});

	// joined raw and parsed
	return _jigsawJoin(rawTextArray, strikeArray);
}

export function parseInlineCodeFromText(text) {
	if (text.parsed) {
		return [text];
	}

	const regex = /`.*`/g;
	const content = text.content;
	const rawTextArray = content.split(regex).map(text => {
		return { content: text, parsed: false }
	});
	const strikeArray = !content.match(regex) ? [] : content.match(regex).map(text => {
		return {
			content:
			`<code 
				style="color: #c25; tab-size: 4; padding: 1px 0; background-color: #f7f7f9; border: 1px solid #e1e1e8;"	
			>${text.slice(1, -1)}</code>`,
			parsed: true,
		}
	});

	// joined raw and parsed
	return _jigsawJoin(rawTextArray, strikeArray);
}

export function parseHighlightFromText(text) {
	if (text.parsed) {
		return [text];
	}

	let content = text.content;
	const atRegex =/鲦鲦 ([\S]+) 鲻鲻/g;
	const atRegex2 =/籴籴 ([\S]+) 耋耋/g;
	content = content
		.replace(atRegex, `<span style="color:#439fe0">$1</span>`)
		.replace(atRegex2, `<span style="color:#439fe0">$1</span>`);
	const highlightRegex = /餮餮([\S]+)犇犇/g;
	content = content.replace(highlightRegex, `<span style="background-color: yellow">$1</span>`);

	return {
		content: content,
		parsed: false,
	}
}

export function parseBoldFromText(text) {
	if (text.parsed) {
		return [text];
	}

	const regex = /\*.*\*/g;
	const content = text.content;
	const rawTextArray = content.split(regex).map(text => {
		return { content: text, parsed: false }
	});
	const formatted = !content.match(regex) ? [] : content.match(regex).map(text => {
		return {
			content:
			`<b>${text.slice(1, -1)}</b>`,
			parsed: true,
		}
	});

	// joined raw and parsed
	return _jigsawJoin(rawTextArray, formatted);
}

export function parseItalicFromText(text) {
	if (text.parsed) {
		return [text];
	}

	const regex = /_.*_/g;
	const content = text.content;
	const rawTextArray = content.split(regex).map(text => {
		return { content: text, parsed: false }
	});
	const formatted = !content.match(regex) ? [] : content.match(regex).map(text => {
		return {
			content:
			`<i>${text.slice(1, -1)}</i>`,
			parsed: true,
		}
	});

	// joined raw and parsed
	return _jigsawJoin(rawTextArray, formatted);
}

export function parseEmojiFromText(text) {
	if (text.parsed) {
		return [text];
	}

	const regex = /:\S+:/g;
	const content = text.content;
	const rawTextArray = content.split(regex).map(text => {
		return { content: text, parsed: false }
	});
	const emojiArray = !content.match(regex) ? [] : content.match(regex).map(text => {
		const shortName = text.slice(1, -1); // remove :
		const emoji = EmojiMap[shortName];
		if (emoji) {
			// exact match
			return {
				content: 
				`<span style="
				display:inline-block; 
				width:20px; 
				height: 20px; 
				background-repeat:no-repeat; 
				background-position: -${emoji.sheet_x*20}px -${emoji.sheet_y*20}px;
				background-image: url(${EmojiSheet}"></span>`,
				parsed: false,
			}
		} else {
			return {
				content: text,
				parsed: true,
			}
		}

	});

	// joined raw and parsed
	return _jigsawJoin(rawTextArray, emojiArray);
}

function _jigsawJoin(a, b) {
	const c = [];
	let isA = true;
	while (a.length || b.length) {
		const element = isA ? a.shift() : b.shift();
		c.push(element);
		isA = !isA;
	}
	return c;
}
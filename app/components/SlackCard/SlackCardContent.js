import React, {PropTypes} from 'react';
import {content as style} from './style';
import {parseLinkFromText, parseEmojiFromText,
	parseStrikeFromText, parseBoldFromText, parseItalicFromText,
	parseInlineCodeFromText, parseBlockCodeFromText, parseHighlightFromText} from 'utils/parser';
const isArray = require('isarray');

export default function SlackCardContent({text}) {
	let segments = [];
	// 1. parse links
	segments = parseLinkFromText({
		parsed: false,
		content: text,
	});

	// code first
	segments = segments.map(segment => parseBlockCodeFromText(segment)).reduce((carry, segment) => {
		return carry.concat(segment);
	}, []);
	segments = segments.map(segment => parseInlineCodeFromText(segment)).reduce((carry, segment) => {
		return carry.concat(segment);
	}, []);
	segments = segments.map(segment => parseEmojiFromText(segment)).reduce((carry, segment) => {
		return carry.concat(segment);
	}, []);
	segments = segments.map(segment => parseStrikeFromText(segment)).reduce((carry, segment) => {
		return carry.concat(segment);
	}, []);
	segments = segments.map(segment => parseBoldFromText(segment)).reduce((carry, segment) => {
		return carry.concat(segment);
	}, []);
	segments = segments.map(segment => parseItalicFromText(segment)).reduce((carry, segment) => {
		return carry.concat(segment);
	}, []);
	segments = segments.map(segment => parseHighlightFromText(segment)).reduce((carry, segment) => {
		return carry.concat(segment);
	}, []);
	return (
		<div style={style.container}>{
			segments.map((segment, index) => {
				return (
					<span style={{whiteSpace: 'pre'}} key={index} dangerouslySetInnerHTML={{__html: segment.content}}></span>
				)
			})
		}
		</div>
	)
}

SlackCardContent.propTypes = {
	text: PropTypes.string,	
};

/**
 * Created by mohist on 4/11/16.
 */
import React, {PropTypes} from 'react';
import moment from 'moment';

import SlackCardContent from './SlackCardContent';
import SlackCardCode from './SlackCardCode';
import {heading as headingStyle, base as baseStyle} from './style';

export default function SlackCard({message}) {
	return (
		<div className="slack-card" style={baseStyle.container}>
			<img src={message.useravatar} style={headingStyle.avatar} />
			<div style={baseStyle.right}>
				<div style={headingStyle.title}>
					<div style={headingStyle.username}>{message.username}</div>
					<div style={headingStyle.timestamp}>{moment(parseFloat(message.ts) * 1000).fromNow()}</div>
					<div style={{flex: 1}}></div>
					<div style={headingStyle.channelname}>{message.channelname}</div>
				</div>
				<SlackCardContent text={message.text}/>
				{ message.subtype === 1 &&
				<SlackCardCode code={message.filecontent} type={message.filemeta} />
				}
			</div>
		</div>
	)	
}

SlackCard.PropTypes = {
	message: PropTypes.shape({
		ts: PropTypes.number, // timestamp,
		type: PropTypes.string, // currently only support 'message',
		text: PropTypes.string, // message's body
		subtype: PropTypes.number, // currently only hanlde 'file_share' == 1
		filemeta: PropTypes.string,
		filecontent: PropTypes.string,
		username: PropTypes.string,
		useravatar: PropTypes.string,
		channelname: PropTypes.string,
	})
};
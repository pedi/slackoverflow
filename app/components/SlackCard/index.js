/**
 * Created by mohist on 4/11/16.
 */
import React, {PropTypes} from 'react';
import SlackCardHeading from './SlackCardHeading';
import SlackCardContent from './SlackCardContent';
import SlackCardCode from './SlackCardCode';
import style from './style';

export default function SlackCard({message, user, file}) {
	return (
		<div className="slack-card">
			<SlackCardHeading user={user} timestamp={message.ts}/>	
			<SlackCardContent text={message.text}/>
			{ message.subtype === 'file_share' && message.file.mode === 'code_snippet' && 
				<SlackCardCode code={file.content} type={message.file.pretty_type} />
			}
		</div>	
	)	
}

SlackCard.PropTypes = {
	message: PropTypes.shape({
		title: PropTypes.string,
		ts: PropTypes.number, // timestamp,
		type: PropTypes.string, // currently only support 'message',
		text: PropTypes.string, // message's body
		subtype: PropTypes.string, // currently only hanlde 'file_share'
		file: PropTypes.shape({
			mode: PropTypes.string, // need to handle 'code_snippet',
			pretty_type: PropTypes.string, // used for syntax highlighting
		})
	}),
	user: PropTypes.shape({
		username: PropTypes.string,
		avatar: PropTypes.string,
	}),
	file: PropTypes.shape({
		content: PropTypes.string, // code text for syntax highlighting
	})
};
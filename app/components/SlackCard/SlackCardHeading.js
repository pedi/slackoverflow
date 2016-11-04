import React, {PropTypes} from 'react';

export default function SlackCardHeading({username, avatar, timestamp}) {
	return (
		<div></div>
	)
}

SlackCardHeading.propTypes = {
	username: PropTypes.string,
	avatar: PropTypes.string,
	timestamp: PropTypes.number,
};
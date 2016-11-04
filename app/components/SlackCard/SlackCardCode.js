import SyntaxHighlighter from 'react-syntax-highlighter';
import { github } from 'react-syntax-highlighter/dist/styles';
import React, {PropTypes} from 'react';

export default function SlackCardCode({code, type}) {
		const codeString = '(num) => num + 1';
		return <SyntaxHighlighter style={github}>{code}</SyntaxHighlighter>;
}

SlackCardCode.propTypes = {
	code: PropTypes.string,
	type: PropTypes.string,
};

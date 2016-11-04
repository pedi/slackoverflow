const icSearch = require('../../../assets/image/ic_search.png');
export default {
	container: {
		width: '100%',
		border: '1px solid rgba(0, 0, 0, 0.15)',
		borderRadius: 3.2,
		position: 'relative',
		height: 32,
	},
	icSearch: {
		position: 'absolute',
		left: 5,
		top: 4,
		backgroundImage: `url(${icSearch})`,
		backgroundSize: 'contain',
		backgroundRepeat: 'no-repeat',
		width: 24,
		height: 24,
	},
	inputContainer: {
		width: '100%',
		paddingLeft: 35,
		height: 32,
		lineHeight: 1,
		boxSizing: 'border-box',
	},
	input: {
		margin: '4px 0',
		height: 24,
		outline: 'none',
		border: 'none',
		fontSize: 16,
		width: '100%',
		color: 'rgba(0, 0, 0, .87)',
	}
}
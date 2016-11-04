export const base = {
	container: {
		display: 'flex'
	},
	right: {
		flex: 1,
	}
};

export const heading = {
	container: {
		display: 'flex'
	},
	avatar: {
		display: 'block',
		width: 36,
		height: 36,
		boxSizing: 'border-box',
		borderRadius: 3.2,
		flexShrink: 0,
		marginRight: 10,
	}, 
	title: {
		display: 'flex',
		alignItems: 'center',
	},
	username: {
		color: '#2c2d30',
		fontWeight: 900,
		lineHeight: 1.125,
		marginRight: 5,
	},
	timestamp: {
		color: '#9e9ea6',
		fontSize: 12,
		marginRight: 5,
	},
};

export const content = {
	container: {
		marginTop: 5,
		fontSize: 14,
	}
};
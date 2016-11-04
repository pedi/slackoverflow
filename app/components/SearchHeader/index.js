import React, {PropTypes} from 'react';
import style from './style';

function composeInput(keyword, username, channelname) {
		
}
export default class SearchHeader extends React.Component {
	constructor() {
		super();
		this.state = {
			value: '',	
			focus: false,
		};
		this.onKeyDown = this.onKeyDown.bind(this);
	}
	init(keyword, username, channelname) {
		return `${username ? `from:${username} ` : ''}${channelname ? `in:${channelname} ` : ''}${keyword || ''}`	
	}
	doSearch() {
		const value = this.state.value;	
		const query = {};
		const fromRegEx = /from:(\S+)/;
		const channelRegEx = /in:(\S+)/;	
		
		const fromMatch = value.match(fromRegEx);
		if (fromMatch && fromMatch.length > 1) {
				query.username = fromMatch[1];
		}
		const channelMatch = value.match(channelRegEx);
		if (channelMatch && channelMatch.length > 1) {
			query.channelname = channelMatch[1];
		}
		query.keyword = value.replace(fromRegEx, '').replace(channelRegEx, '').trim();
		this.context.router.push({
			pathname: '/search/',
			query: query,
		})
	}
	onKeyDown(e) {
		// ENTER KEY
		if (e.keyCode == 13) {
			this.doSearch();
		}
	}
	componentDidMount() {
		this.setState({
			value: this.init(this.props.keyword, this.props.username, this.props.channelname)	
		})	
	}
	componentWillReceiveProps(nextProps) {
		this.setState({
			value: this.init(nextProps.keyword, nextProps.username, nextProps.channelname)
		})	
	}
	render() {
		return (
			<div style={Object.assign({}, style.container, this.state.focus ? { borderColor: '#439fe0'} : {})} >
				<div style={style.icSearch}></div>
				<div style={style.inputContainer}>
					<input 
						placeholder="Search"
						onKeyDown={this.onKeyDown}
						onFocus={() => { this.setState({focus: true})} }
						onBlur={() => { this.setState({focus: false})} }
						style={style.input} value={this.state.value} onChange={(e) => {this.setState({value: e.target.value})}}/>
				</div>
			</div>	
		)
	}
};

SearchHeader.propTypes = {
	keyword: PropTypes.string,
	username: PropTypes.string,
	channelname: PropTypes.string,
	query: PropTypes.object,
};
SearchHeader.contextTypes = {
	router: PropTypes.object,	
};
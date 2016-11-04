import React, {PropTypes} from 'react';
import {detail} from 'services/index';
import style from '../Search/style';

import SlackCard from 'components/SlackCard';

const PREVIEW_LIMIT = 10;

export default class Detail extends React.Component {
	constructor() {
		super();
		this.state = {
			results: [], 
		}
	}
	componentWillMount() {
		this.fetch();	
	}
	fetch() {
		const query = Object.assign({}, this.props.location.query);
		query.limit = PREVIEW_LIMIT;
		detail(query).then(res => {
			if (!res.error) {
				this.setState({
					results: res.response.messages
				})
			}
		})
	}
	render() {
		return (
			<div style={style.list}>
				{
					this.state.results.map(message => {
						console.log('seq id %s', message.seqid);
						const listItemStyle = Object.assign({}, style.listItem, 
							message.seqid === parseInt(this.props.location.query.cursor) ? { opacity: 1} : { opacity: .4});
						return (
							<div style={listItemStyle} key={message.seqid} >
								<SlackCard message={message}/>
							</div>
						)
					})
				}
			</div>
		)	
	}
}

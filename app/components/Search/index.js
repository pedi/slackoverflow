import React, {PropTypes} from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import style from './style';
import SlackCard from 'components/SlackCard';
import SearchHeader from 'components/SearchHeader';
import {search} from 'services/index';

const BATCH_LIMIT = 5;

export default class App extends React.Component {
    constructor() {
        super();
        this.state = {
          results: {
              
          },
					noMore: {
							
					}, 
					suggestion: {
						
					},
        };
        this.fetch = this.fetch.bind(this);
        this.getResults = this.getResults.bind(this);
				this.getNoMore = this.getNoMore.bind(this);
				this.getSuggestion = this.getSuggestion.bind(this);
    }
    componentWillReceiveProps(nextProps) {
			if (JSON.stringify(nextProps.location.query) !== JSON.stringify(this.props.location.query)) {
					this.fetch();
			}
    }
    getResults() {
			const key = JSON.stringify(this.props.location.query);
			return this.state.results[key] || []; 
    }
		getNoMore() {
			const key = JSON.stringify(this.props.location.query);	
			return !!this.state.noMore[key];
		}
		getSuggestion() {
			const key = JSON.stringify(this.props.location.query);
			return this.state.suggestion[key];
		}
    fetch() {
        const query = Object.assign({}, this.props.location.query);
        const key = JSON.stringify(query);
        
        if (this.state.noMore[key]) {
            // no more, stop calling
            return;
        }
        
        if (Object.keys(query).length == 0) {
            // no valid query, do nothing
            return;
        }
        
        const result = this.getResults();
				query.limit = BATCH_LIMIT;	
        if (result.length) {
            query.cursor = result[result.length-1].seqid;
        }
        
        search(query).then(res => {
            if (!res.error) {
                const result = this.state.results[key] || [];
                const results = this.state.results;
                const noMore = this.state.noMore;
								const suggestion = this.state.suggestion;
                const response = res.response;
								results[key] = result.concat(response.messages);
								const newState = {};
								newState.results = Object.assign({}, results); 
								if (response.messages.length < BATCH_LIMIT) {
									noMore[key] = true;
									newState.noMore = Object.assign({}, noMore); 
									if (response.suggestion && response.suggestion.length) {
										suggestion[key] = response.suggestion[0];
										newState.suggestion = Object.assign({}, suggestion);
									}
								}
								this.setState(newState);
            }
        })        
    }
    render() {
        const results = this.getResults();
				const noMore = this.getNoMore();
				const suggestion = this.getSuggestion();
				const query = this.props.location.query;
        return (
            <div style={style.list}>
								<SearchHeader query={query} keyword={query.keyword} username={query.username} channelname={query.channelname} />
                <div> 
                    <InfiniteScroll
                      pageStart={0}
                      loadMore={this.fetch}
                      hasMore={!noMore}
                      loader={<div>loading</div>}
                    >
                    {
											results.map(message => {
													return (
														<a style={style.listItem} key={message.id} href={`/detail?cursor=${message.seqid}&channelid=${message.channelid}`} target="_blank" >
																<SlackCard message={message}/>
														</a>
													)
											})
										}
                    </InfiniteScroll>
										{
											noMore && (suggestion ? (
												<div style={style.noMore} >
													Are you looking for
													<div onClick={() => { this.context.router.push({
														pathname: '/search',
														query: Object.assign({}, this.props.location.query, { keyword: suggestion})
													})}}>suggestion</div>
												</div>
											) : (
												<div style={style.noMore}>No More Results</div>
											))
										}
                </div>
            </div>
        )
    }
}

App.contextTypes = {
	router: PropTypes.object,
};
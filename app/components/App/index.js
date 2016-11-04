import React from 'react';
import style from './style';
import SlackCard from 'components/SlackCard';

export default class App extends React.Component {
    render() {
        return (
            <div style={style}>
                <SlackCard message={{}} />
            </div>
        )
    }
}
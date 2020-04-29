import React from 'react';

export default class Feed extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            feed: props.feed
        };
    }

    generateJSX = () => {

        const beets = this.state.feed.map((beet) =>
            <div>{beet}</div> // add unique key ?
        );

        return beets;
    };

    render() {
        return <div>
            {this.generateJSX()}
        </div>
    }
}
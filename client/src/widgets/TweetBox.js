import React from 'react';

export default class TweetBox extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            send: props.onSend
        };
    };

    handleSubmit = (event) => {
        if (event.key === 'Enter'){
            this.state.send(event.target.value);
            event.target.value = '';
        }
    };

    render() {
        return <div>
            <textarea onKeyPress={this.handleSubmit}></textarea>
        </div>;
    }
}
import React from 'react';

import TweetBox from './widgets/TweetBox';
import Feed from './widgets/Feed';

export default class Account extends React.Component {

    constructor(props) {
        super(props);

        let user = {
            username: props.username,
            password: props.password
        };

        this.state = {
            isLoading: true,

            user: user,
            feed: []
        };
    }

    fetchUserData = async () => {
        const rOptions = {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(this.state.user)
        };

        let content = await fetch('http://localhost:3001/profile', rOptions);
        return content.json();
    }

    componentDidMount() {

        // fetch account data
        let userData = this.fetchUserData();
        userData.then(data => {
            this.setState({isLoading: false, feed: data.beets});
        });
    }

    sendTweet = async (tweet) => {

        let tweetObj = {
            user: this.state.user,
            tweet: tweet
        };

        const rOptions = {
            method: 'post',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(tweetObj)
        };

        let content = await fetch('http://localhost:3001/tweet', rOptions);
        return content.json();
    };

    handleTweetSend = (tweet) => {
        
        // send tweet
        let res = this.sendTweet(tweet);
        res.then(data => {
            console.log(data);
        });
    };

    render() {
        let fetched = this.fetchUserData();
        fetched.then(userData => {
            
        });
        
        if(this.state.isLoading) {
            return 'Loading...';
        }

        return <div>
                <TweetBox onSend={this.handleTweetSend}/>
                <Feed feed={this.state.feed}/>
            </div>;
    }
}
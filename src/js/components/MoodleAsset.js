import React, { Component } from 'react';

export default class MoodleAsset extends Component {

    constructor(props) {
        super(props);

        this.download = this.download.bind(this);
    }

    download() {
        // TODO: Download asset by sending request to chrome
        console.log("Downloading asset " + this.props.name + " from path: " + this.props.href);
    }

    render() {
        return (
            <li className="moodle-asset">
                <p>{this.props.name}{this.props.type}</p>
                <button onClick={this.download}>Download</button>
            </li>
        );
    }
}
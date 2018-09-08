import React, { Component } from 'react';

import MoodleAsset from './MoodleAsset';

export default class MoodleSection extends Component {

    constructor(props) {
        super(props);

        this.download = this.download.bind(this);
    }

    download() {
        // TODO: Download sections by looping through assets and requesting they all get downloaded
        console.log("Downloading section: " + this.props.title);
    }

    render() {
        return (
            <div className="moodle-section">
                <div className="moodle-section-header">
                    <h2>{this.props.title}</h2>
                    <button onClick={this.download}>Download Section</button>
                </div>
                <ul>
                   {this.props.assets.map(a => {
                       return <MoodleAsset key={a.name} name={a.name} href={a.href} type={a.type}/>
                   })}
                </ul>
            </div>
        );
    }
}
import React, { Component } from 'react';

import MoodleAsset from './MoodleAsset';

import * as utils from '../utils';

export default class MoodleSection extends Component {

    async downloadSection() {
        // TODO: Download sections by looping through assets and requesting they all get downloaded
        let downloadStatus = this.props.assets.map(a => {
            let filename = utils.sanitize(this.props.title) + "/" + utils.sanitize(this.props.section) + "/" + a.name + a.type;
            return this.download(filename, a.href);
        });

        // Wait for all downloads to complete
        await Promise.all(downloadStatus);

        alert("Downloads complete!");
    }

    download(downloadName, url) {
        return new Promise((resolve, reject) => {
            chrome.downloads.download({
                url: url,
                filename: "Moodle_Scraper/" + downloadName
            }, (downloadID) => {
                if (downloadID)
                    resolve();
                else
                    reject("Error Downloading Asset: " + downloadName);
            });
        });
    }

    render() {
        return (
            <div className="moodle-section">
                <div className="moodle-section-header">
                    <h2>{this.props.section}</h2>
                    <button onClick={() => this.downloadSection()}>Download Section</button>
                </div>
                <ul>
                    {this.props.assets.map(a => {
                        return <MoodleAsset key={a.name} title={this.props.title} section={this.props.section} name={a.name} href={a.href} type={a.type} download={this.download}/>
                    })}
                </ul>
            </div>
        );
    }
}
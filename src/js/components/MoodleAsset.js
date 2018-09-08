import React, { Component } from 'react';

import * as utils from '../utils';

export default class MoodleAsset extends Component {
    render() {
        let filename = utils.sanitize(this.props.title) + "/" + utils.sanitize(this.props.section) + "/" + this.props.name + this.props.type;
        return (
            <li className="moodle-asset">
                <p>{this.props.name}{this.props.type}</p>
                <button onClick={() => this.props.download(filename, this.props.href)}>Download</button>
            </li>
        );
    }
}
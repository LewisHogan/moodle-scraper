import React, { Component } from "react";
import Reactdom from "react-dom";

import MoodleSection from './components/MoodleSection.js';

class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            loaded: false,
            sections: []
        };

        this.fetchSections = this.fetchSections.bind(this);
    }

    componentDidMount() {
        this.fetchSections();
    }

    async fetchSections() {
        // TODO: Check current webpage
        // if we are on a moodle page (subdomain starts with moodle)
        // attempt to load sections from page by executing script
        // then update loaded state with data
        // otherwise do nothing

        let sections = await new Promise((resolve, reject) => {
            chrome.tabs.executeScript({
                // Has to load from the build directory, need to teach parcel where it is located somehow
                file: "./src/js/content-script.js"
            }, (result) => {
                if (result && result[0]) {
                    resolve(result[0]);
                }
            });
        });

        this.setState({ loaded: true, sections: sections });
    }

    render() {

        let sections = (
            <div>
                {this.state.sections.map((section, i) => {
                    if (section.assets.length > 0) {
                        return <MoodleSection key={section.title} title={section.title} assets={section.assets} />;
                    }
                })}
            </div>
        );

        return (
            this.state.loaded ? sections : <p>Content is not loaded!</p>
        );
    }
}

Reactdom.render(<App />, document.getElementById("app"));
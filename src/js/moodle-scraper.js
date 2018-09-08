import React, { Component } from "react";
import Reactdom from "react-dom";

import MoodleSection from './components/MoodleSection.js';

class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            loaded: false,
            title: "",
            sections: []
        };

        this.fetchSections = this.fetchSections.bind(this);
    }

    componentDidMount() {
        this.fetchSections();
    }

    async fetchSections() {
        // NOTE: sections actually has main title as first item, sections are following
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

        if (sections.length > 1) {
            let title = sections.shift();

            this.setState({ loaded: true, title: title, sections: sections });
        }

    }

    render() {

        let sections = (
            <div>
                <h2>{this.state.title}</h2>
                {this.state.sections.map((section, i) => {
                    if (section.assets.length > 0) {
                        return <MoodleSection key={section.title} title={this.state.title} section={section.title} assets={section.assets} />;
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
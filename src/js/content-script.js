function detectExtension(resource) {
    let documentType = resource.firstChild.firstChild.lastChild.firstChild.firstChild.firstChild.src.split('-')[0];

    let keys = {
        "pdf": ".pdf",
        "document": ".doc",
        "powerpoint": ".ppt",
        "archive": ".tgz",
        "unknown": ".msi",
        "html": ".html",
        // If it's this one the download is going to fail
        // Because it's actually a link to a webpage which embeds the mp4
        // TODO: If you spot this one, try and find the real download link
        "mpeg": ".html",
        "wmv": ".wmv",

        // I'm not sure if this is real, but I'm following the other office patterns
        "excel": "xls"
    };

    for (let key in keys) {
        if (documentType.endsWith(key)) {
            return keys[key];
        }
    }
    // If we can't identify it, we assume it's a html file
    return ".html";
}

function sanitize(filepath) {
    // Removes all filepath characters windows cant handle
    return filepath.replace(/(\:)|(\|)|(\(|\))/g, "").replace("\n", "").replace("\r", "");
}


function scrapeSections() {
    let sectionElements = document.getElementsByClassName("topics")[0].children;

    let sections = Array.from(sectionElements).map(sectionElement => {
        let sectionTitle = sectionElement.firstChild.innerText;

        let assetElements = sectionElement.lastChild.getElementsByClassName("resource");

        let assets = Array.from(assetElements).map(assetElement => {
            return {
                name: sanitize(assetElement.firstChild.firstChild.lastChild.firstChild.firstChild.lastChild.innerHTML.split('<')[0]),
                href: assetElement.firstChild.firstChild.lastChild.firstChild.firstChild.href,
                type: detectExtension(assetElement)
            }
        });

        return {
            title: sectionTitle,
            assets: assets
        };
    });


    return sections;
}

scrapeSections();
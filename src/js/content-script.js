// Due to this being a content script, we can't really import anything from the other files

function detectExtension(resource) {
    let documentType = resource.firstChild.firstChild.lastChild.firstChild.firstChild.firstChild.src.split('-')[0];

    let keys = {
        "pdf": ".pdf",
        "document": ".doc",
        "powerpoint": ".ppt",
        // Note: archive can mean both zip and tgz, no way to distinguish so I opt for the most common
        "archive": ".zip",
        "unknown": ".msi",
        "html": ".html",
        // If it's this one the download is going to fail
        // Because it's actually a link to a webpage which embeds the mp4
        // TODO: If you spot this one, try and find the real download link
        "mpeg": ".html",
        "wmv": ".wmv",
        // Has been source code before, but text is still a safe option
        "text": ".txt",
        // Making an educated guess here, it could be a zip, or a rar or any other archive format, though all the seen evidence seems to be zip for common usage
        "zip": ".zip",
        // The one example I've seen of this so far as has been a sql file, but saving as a txt seems like a safer and more reliable option
        "unknown": ".txt",
        // The example I saw online is php, but it could be python, c# or any other source code as far as I know
        "sourcecode": ".txt",

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
    return filepath.replace(/(\:)|(\|)|(\(|\)|(\?))/g, "").replace("\n", "").replace("\r", "");
}


function scrapeSections() {
    // Apparently some pages on moodle use the classname weeks instead of topics (CE161 for example)
    let sectionElements = document.getElementsByClassName("topics").length != 0 ?
        document.getElementsByClassName("topics")[0].children : document.getElementsByClassName("weeks")[0].children;

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

function getSubject() {
    let subject = document.getElementsByClassName("page-header-headings")[0].firstChild;
    return sanitize(subject.innerText);
}

// The first element we send back to the extension is the subject/main title
// the following contents is a list of sections and all assets
[getSubject(), ...scrapeSections()];
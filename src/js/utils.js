export function sanitize(filepath) {
    // Removes all filepath characters windows cant handle
    return filepath.replace(/(\:)|(\|)|(\(|\)|(\?))/g, "").replace("\n", "").replace("\r", "");
}
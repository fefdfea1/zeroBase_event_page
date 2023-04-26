const shareUrlButton = document.getElementById('url-share-button');

export const setShareUrlButton = () => {
    shareUrlButton.onclick = () => {
        navigator.clipboard.writeText(location.href);
    }
}
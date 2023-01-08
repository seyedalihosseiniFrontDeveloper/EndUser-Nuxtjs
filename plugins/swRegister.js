import {version} from '/package.json'
export default () => {
    if ('serviceWorker' in navigator) {
        navigator
            .serviceWorker
            // @ts-ignore
            .register(`${location.origin}/sw.js?version=${version}&mode=${process.env.NODE_ENV}`).then(registration => {
            console.log('Service worker registration succeeded:', registration);
        }).catch(err => {
            console.log('Service worker registration failed:', err);
        })
    } else {
        console.warn('Service worker aren\'t supported');
    }

}

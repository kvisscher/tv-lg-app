import { Client } from './client';

const host = 'http://kevin.duidelijkheid.nu:8081'

const initialState = () => ({
    source: localStorage.lastSource || null
});

var state = initialState();

const setState = (changes) => {
    console.log('before change', state, changes)

    state = {
        ...state,
        ...changes
    };

    console.log('after change', state)

    render();
};

const render = () => {
    if (state.source) {
        const frame = document.getElementById('frame');
        frame.src = state.source;
    }

    if (state.uid) {
        const label = document.getElementById('label-uid');
        label.innerText = state.uid;
    }
};

const client = new Client();

client.onDisplayChanged = (source) => {
    console.log('onDisplayChanged', source)

    // Store last source so when the app is started it can immediately display something
    // also works nicely when there is no server available
    localStorage.lastSource = source;

    setState({ source })
}

client.onConnected = () => {
    client.call('iamtv', (result) => {
        console.log('my uid is', result);
        localStorage.uid = result;

        setState({ uid: result });
    }, { uid: localStorage.uid, source: localStorage.lastSource });

    client.call('x', { vendor: navigator.vendor, platform: navigator.platform });
};

client.connect(host + '/tv');

render();


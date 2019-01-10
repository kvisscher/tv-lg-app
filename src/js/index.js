import { Client } from './client';

const host = 'http://kevin.duidelijkheid.nu:8081'

const initialState = () => ({  });

var state = initialState();

const changeState = (changes) => {
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
        const frame = document.getElementById('frame')
        frame.src = state.source;
    }
};

const client = new Client();

client.onDisplayChanged = (source) => {
    console.log('onDisplayChanged', source)

    changeState({ source })
}

client.onConnected = () => {
    client.call('iamtv', (result) => {
        console.log('my uid is', result);
        localStorage.uid = result;
    }, localStorage.uid);
};

client.connect(host + '/tv');

setTimeout(() => {
    window.admin = new Client();
    
    window.admin.onConnected = () => {
        window.admin.call('list', (tvs) => {
            console.log('got list of connected TVs', tvs);

            for (const tv of tvs) {
                admin.call('display', { uid: tv, source: 'https://nu.nl' })
            }
        }, {})
    };

    window.admin.connect(host + '/admin');
}, 5000);

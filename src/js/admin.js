import { Client } from './client';

const host = 'http://kevin.duidelijkheid.nu:8081'

const initialState = () => ({ });

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
    if (state.tvs) {
        const tvList = document.getElementById('tv-list');
        
        const newList = document.createElement('div');
        newList.id = 'tv-list';
        newList.className = 'nes-list';
        
        for (const tv of state.tvs) {
            const label = document.createElement('span');
            label.innerText = `${tv.uid} (${tv._id})`;

            const inputUrl = document.createElement('input')
            inputUrl.type = 'url';
            inputUrl.className = 'nes-input';
            inputUrl.value = tv.source || '';

            const displayBtn = document.createElement('button');
            displayBtn.className = 'nes-btn is-primary';
            displayBtn.innerText = 'Display';
            displayBtn.addEventListener('click', () => {
                admin.call('display', null, { uid: tv._id, source: inputUrl.value });
            });

            const item = document.createElement('div');
            item.appendChild(label);
            item.appendChild(inputUrl);
            item.appendChild(displayBtn);

            newList.appendChild(item);
        }

        if (tvList) {
            tvList.remove();
        }
        
        document.getElementById('app').appendChild(newList);
    }
};

const admin = new Client();

admin.onConnected = () => {
    admin.call('list', (tvs) => {
        setState({ tvs });
    }, {});

    admin.on('tv connect', (tv) => {
        console.log('tv connected', tv);

        let tvs = [];
        if (state.tvs) {
            tvs = state.tvs.splice(0);
            tvs.push(tv);
        }

        setState({ tvs });
    });

    admin.on('tv disconnect', (tv) => {
        console.log('tv disconnected', tv);

        if (state.tvs) {
            const tvs = state.tvs.splice(0);
            for (let i = 0; i < tvs.length; i++) {
                if (tvs[i].uid == tv.uid) {
                    tvs.splice(i, 1);
                    break;
                }
            }

            setState({ tvs });
        }
    });
};

admin.connect(host + '/admin');
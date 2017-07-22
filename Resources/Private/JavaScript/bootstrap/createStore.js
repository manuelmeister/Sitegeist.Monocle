import {createStore, compose, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';
import immutable from 'seamless-immutable';

import {reducer, sagas} from '../state';

export default env => {
    const initialState = {
        env,
        business: {
            tasks: {},
            errors: {},
            needsAuthorization: false
        },
        sites: {},
        breakpoints: {},
        prototypes: {},
        navigation: {
            items: [],
            currentIndex: -1,
            isOpen: false,
            searchTerm: ''
        }
    };
    const storeEnhancers = [];

    //
    // Saga middleqware
    //
    const sagaMiddleware = createSagaMiddleware();
    storeEnhancers.push(applyMiddleware(sagaMiddleware));

    //
    // Dev tools extension
    //
    if (process.env.NODE_ENV !== 'production' && window.devToolsExtension) {
        storeEnhancers.push(window.devToolsExtension());
    }

    //
    // Create store
    //
    const store = createStore(
        reducer,
        immutable(initialState),
        compose(...storeEnhancers)
    );

    //
    // Run sagas
    //
    sagas.forEach(sagaMiddleware.run);

    return store;
};

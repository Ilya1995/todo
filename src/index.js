import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import rootReducer from './reducers/index'
import { stateProject, stateTask } from './constants'
import App from './components/App'
import './css/styles.css'
import './css/bootstrap.min.css'

let initialState = { task: stateTask, project: stateProject };
if (typeof Storage !== 'undefined' && sessionStorage.stateProject && sessionStorage.stateTask) {
    let oldStateProject = JSON.parse(sessionStorage.stateProject);
    let oldStateTask = JSON.parse(sessionStorage.stateTask);
    initialState = { task: oldStateTask, project: oldStateProject };
}


const store = createStore(rootReducer(), initialState);

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
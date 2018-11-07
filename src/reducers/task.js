import { TYPE, stateTask as initialState } from '../constants';
import _ from 'underscore'

export default function task(state = initialState, action) {
    let newState;

    switch (action.type) {

        case TYPE.UPDATE_FILTER:
            newState = { ...state, filter: action.payload};
            break;

        case TYPE.ADD_TASK:
            newState = { ...state, tasks: [...state.tasks, action.payload]};
            break;

        case TYPE.UPDATE_TASK:
            newState = { ...state, tasks: _.map(state.tasks, (task) => task.id === action.payload.id ? action.payload : task)};
            break;

        case TYPE.REMOVE_TASK:
            newState = { ...state, tasks: _.reject(state.tasks, (task) => {return task.id === action.payload})};
            break;

        case TYPE.REMOVE_PROJECT:
            newState = { ...state, tasks: _.reject(state.tasks, (task) => {return task.projectId === action.payload})};
            break;

        default:
            newState = state;
            break;
    }

    if (typeof Storage !== 'undefined') {
        sessionStorage.setItem('stateTask', JSON.stringify(newState));
    }

    return newState
}
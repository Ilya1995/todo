import {stateProject as initialState, TYPE} from '../constants';
import _ from "underscore";

export default function project(state = initialState, action) {
    let newState;
    switch (action.type) {

        case TYPE.ADD_PROJECT:
            newState = { ...state, projects: [...state.projects, action.payload]};
            break;

        case TYPE.UPDATE_PROJECT:
            newState = { ...state, projects: _.map(state.projects,
                    (project) => project.id === action.payload.id ? action.payload : project), project: state.projects[0]};
            break;

        case TYPE.REMOVE_PROJECT:
            newState = { ...state, projects: _.reject(state.projects, (project) => {return project.id === action.payload}),
                project: state.projects[0]};
            break;

        case TYPE.SELECT_PROJECT:
            newState = { ...state, project: action.payload};
            break;

        default:
            newState = state;
            break;
    }

    if (typeof Storage !== 'undefined') {
        sessionStorage.setItem('stateProject', JSON.stringify(newState));
    }

    return newState
}
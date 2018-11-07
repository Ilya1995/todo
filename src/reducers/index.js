import { combineReducers } from 'redux'
import task from './task'
import project from './project'

export default () => {
    return combineReducers({
        task,
        project
    })
}
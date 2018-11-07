import moment from 'moment'
export const TYPE = {
    ADD_TASK: 'ADD_TASK',
    REMOVE_TASK: 'REMOVE_TASK',
    UPDATE_TASK: 'UPDATE_TASK',
    UPDATE_FILTER: 'UPDATE_FILTER',
    ADD_PROJECT: 'ADD_PROJECT',
    UPDATE_PROJECT: 'UPDATE_PROJECT',
    REMOVE_PROJECT: 'REMOVE_PROJECT',
    SELECT_PROJECT: 'SELECT_PROJECT'
};

export const PRIORITY = ['Нормальный', 'Высокий', 'Неотложный'];
export const FILTERS = ['Все', ...PRIORITY];

export const stateProject = {
    projects: [{
        id: 1,
        title: 'Все',
        description: 'Все проекты'
    }, {
        id: moment().add(1, 'days'),
        title: 'Проект 1',
        description: 'Инфа по первому проекту'
    }, {
        id: moment().add(2, 'days'),
        title: 'Проект 2',
        description: 'Инфа по второму проекту'
    }],
    project: null
};

export const stateTask = {
    tasks: [{
        id: moment().add(3, 'days'),
        projectId: stateProject.projects[1].id,
        title: 'Задача 1',
        description: 'Сделать побыстрей',
        deadline: moment('2018-10-31 15:16'),
        priority: PRIORITY[2],
        finished: true
    }, {
        id: moment().add(4, 'days'),
        projectId: stateProject.projects[2].id,
        title: 'Задача 2',
        description: 'Сделать побыстрей',
        deadline: moment('2018-11-01 05:12'),
        priority: PRIORITY[1],
        finished: false
    }, {
        id: moment().add(5, 'days'),
        projectId: stateProject.projects[2].id,
        title: 'Задача 3',
        description: 'Сделать побыстрей',
        deadline: moment('2018-12-01 22:32'),
        priority: PRIORITY[2],
        finished: false
    }, {
        id: moment().add(6, 'days'),
        projectId: stateProject.projects[1].id,
        title: 'Задача 4',
        description: 'Сделать побыстрей',
        deadline: moment('2018-12-16 12:02'),
        priority: PRIORITY[0],
        finished: false
    }, {
        id: moment().add(7, 'days'),
        projectId: stateProject.projects[2].id,
        title: 'Задача 5',
        description: 'Сделать побыстрей',
        deadline: moment('2018-12-16 12:02'),
        priority: PRIORITY[1],
        finished: false
    }, {
        id: moment().add(8, 'days'),
        projectId: stateProject.projects[1].id,
        title: 'Задача 6',
        description: 'Сделать побыстрей',
        deadline: moment('2018-12-16 12:02'),
        priority: PRIORITY[1],
        finished: false
    }],
    filter: FILTERS[0]
};


import React, { Component } from 'react'
import { connect } from 'react-redux'
import { TYPE } from "../constants"
import NewTask from "../modals/NewTask"
import Filter from "./Filter"
import { Paper, Table, TableHead, TableRow, TableCell, TableBody, IconButton, Checkbox, TablePagination,
         ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, Typography } from '@material-ui/core'
import { Delete, ExpandMore, Update } from '@material-ui/icons'
import moment from 'moment'
window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true;//для новой версии Typography

class Task extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpenModalNewTask: false,
            selectedTask: null,
            page: 0,
            rowsPerPage: 5,
        };
    }

    render() {
        let { tasks, filter } = this.props.task;
        const { project } = this.props.project;
        tasks = tasks.filter((task) => {
            return ((filter === 'Все' || task.priority === filter) &&
                    (!project || project.id === 1 || task.projectId === project.id));
        });
        const { removeTaskDispatch, updateTaskDispatch } = this.props;
        const { isOpenModalNewTask, selectedTask, page, rowsPerPage } = this.state;

        const switchModel = () => {
            this.setState({isOpenModalNewTask: !isOpenModalNewTask});
        };

        const updateTask = (e) => {
            e.preventDefault();
            let title = e.target.title.value,
                description = e.target.description.value,
                priority = e.target.priority.value,
                deadline = moment(e.target.deadlineDate.value+' '+e.target.deadlineTime.value);
            switchModel();
            updateTaskDispatch({...selectedTask, title, description, priority, deadline});
        };

        return (
            <div className="mt-5">
                <h4 className="text-center py-3">Текущие задачи</h4>
                <Paper className="container modal-lg">
                    <Filter />
                    <br/>
                    <div className="table-responsive">
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell width="42%" className="font-title-table">Задача</TableCell>
                                    <TableCell width="25%" className="font-title-table">Крайний срок</TableCell>
                                    <TableCell width="33%" className="font-title-table">Приоритет</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {tasks.slice(page*rowsPerPage, page*rowsPerPage+rowsPerPage).map((task, index) => (
                                    <TableRow key={index}>
                                        <TableCell className="p-0" colSpan="3">
                                            <ExpansionPanel className="shadow-none panel-hover">
                                                <ExpansionPanelSummary className="p-0" expandIcon={<ExpandMore />}>
                                                    <div className="col-5 td-p" >
                                                        {task.finished ? <del>{task.title}</del> : task.title}
                                                    </div>
                                                    <div className="col-3 td-p" >
                                                        {task.finished ? <del>{moment(task.deadline).format('DD.MM.YYYY HH:mm')}</del>
                                                            : moment(task.deadline).format('DD.MM.YYYY HH:mm')}
                                                    </div>
                                                    <div className="col-4 td-p" >
                                                        {task.finished ? <del>{task.priority}</del> : task.priority}
                                                    </div>
                                                </ExpansionPanelSummary>
                                                <ExpansionPanelDetails className="d-inline-block">
                                                    <Typography>
                                                        {task.description}
                                                    </Typography>
                                                    <br/>
                                                    <Typography>
                                                        <Checkbox onChange={()=>updateTaskDispatch({...task, finished: !task.finished})}
                                                                  checked={task.finished} color="primary" /> Задача выполнена
                                                        <br/>
                                                        <IconButton onClick={()=>removeTaskDispatch(task.id)}>
                                                            <Delete />
                                                        </IconButton> Удалить задачу
                                                        <br/>
                                                        <IconButton onClick={()=>{this.setState({selectedTask: task}); switchModel()}}>
                                                            <Update />
                                                        </IconButton> Обновить задачу
                                                    </Typography>
                                                </ExpansionPanelDetails>
                                            </ExpansionPanel>
                                        </TableCell>
                                    </TableRow>
                                ))}

                            </TableBody>
                        </Table>
                    </div>

                    <TablePagination
                        component="div"
                        count={tasks.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        backIconButtonProps={{
                            'aria-label': 'Previous Page',
                        }}
                        nextIconButtonProps={{
                            'aria-label': 'Next Page',
                        }}
                        onChangePage={(e, page)=> this.setState({page})}
                        onChangeRowsPerPage={(e)=> this.setState({rowsPerPage: e.target.value})}
                    />
                </Paper>

                <NewTask isOpenModal={isOpenModalNewTask}
                         updateTask={selectedTask}
                         okModal={updateTask}
                         closeModal={switchModel}/>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        task: state.task,
        project: state.project
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        removeTaskDispatch: (id) => {
            dispatch({
                type: TYPE.REMOVE_TASK,
                payload: id,
            })
        },
        updateTaskDispatch: (task) => {
            dispatch({
                type: TYPE.UPDATE_TASK,
                payload: task,
            })
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Task)
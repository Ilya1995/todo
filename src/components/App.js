import React, { Component } from 'react'
import Project from './Project'
import Task from './Task'
import NewTask from "../modals/NewTask"
import { connect } from "react-redux"
import { Button, AppBar } from '@material-ui/core'
import { TYPE } from "../constants";
import moment from 'moment'

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpenModalNewTask: false
        };
    }

    render() {
        const { isOpenModalNewTask } = this.state;
        const { addTaskDispatch } = this.props;
        const { project } = this.props.project;

        const switchModel = () => {
            this.setState({isOpenModalNewTask: !isOpenModalNewTask});
        };

        const addTask = (e) => {
            e.preventDefault();
            addTaskDispatch({
                id: moment(),
                projectId: project.id,
                title: e.target.title.value,
                description: e.target.description.value,
                deadline: moment(e.target.deadlineDate.value+' '+e.target.deadlineTime.value),
                priority: e.target.priority.value,
                finished: false
            });
            switchModel();
        };

        return (
            <div>
                <div className='container-fluid pb-5'>
                    <AppBar position='fixed' className='p-3'>
                        <div className="row align-items-center justify-content-between px-3">
                            <div className="col-6">
                                {
                                    !project || project.id === 1 ?
                                    null : <Button variant="contained" onClick={switchModel}>Добавить задачу</Button>
                                }
                            </div>


                            <Project />

                        </div>
                    </AppBar>

                    <br/><br/>
                    <br/><br/>

                    <Task />
                </div>


                <NewTask isOpenModal={isOpenModalNewTask}
                         updateTask={null}
                         okModal={addTask}
                         closeModal={switchModel}/>
            </div>


        )
    }
}

const mapStateToProps = (state) => {
    return {
        project: state.project
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        addTaskDispatch: (task) => {
            dispatch({
                type: TYPE.ADD_TASK,
                payload: task,
            })
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(App)
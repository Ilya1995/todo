import React, { Component } from 'react'
import { connect } from 'react-redux'
import { FormControl, InputLabel, Select, MenuItem, IconButton, Tooltip } from '@material-ui/core';
import { AddCircle, Settings } from '@material-ui/icons'
import NewProject from "../modals/NewProject"
import { TYPE } from "../constants";
import moment from "moment/moment";

class Project extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpenModalNewProject: false,
            selectedUpdateProject: null
        };
    }

    render() {
        const { isOpenModalNewProject, selectedUpdateProject } = this.state;
        const { selectProject, addProjectDispatch, updateProjectDispatch, removeProjectDispatch } = this.props;
        const { projects } = this.props.project;
        const project = this.props.project.project || this.props.project.projects[0];

        const switchModel = () => {
            this.setState({isOpenModalNewProject: !isOpenModalNewProject});
        };

        const addProject = (e) => {
            e.preventDefault();
            switchModel();
            addProjectDispatch({
                id: moment(),
                title: e.target.title.value,
                description: e.target.description.value
            });
        };

        const updateProject = (e) => {
            e.preventDefault();
            updateProjectDispatch({
                id: selectedUpdateProject.id,
                title: e.target.title.value,
                description: e.target.description.value
            });
            updateProjectCloseModal();
        };

        const removeProject = (e) => {
            e.preventDefault();
            removeProjectDispatch(selectedUpdateProject.id);
            updateProjectCloseModal();
        };

        const updateProjectOpenModal = (project) => {
            this.setState({selectedUpdateProject: project});
            switchModel();
        };

        const updateProjectCloseModal = () => {
            this.setState({selectedUpdateProject: null});
            switchModel();
        };

        return (
            <div className="col-md-3 col-6 px-0">
                <IconButton className="col-2" onClick={switchModel}>
                    <Tooltip title="Добавить проект">
                        <AddCircle classes={{root: 'ctm-clr'}} />
                    </Tooltip>
                </IconButton>

                <FormControl className="col-10 m-0" margin="normal">
                    <InputLabel classes={{root: 'ctm-clr'}} htmlFor="priority-simple">Выберите проект</InputLabel>
                    <Select classes={{root: 'ctm-clr-border', select: 'ctm-clr', icon: 'ctm-clr'}}
                            onChange={selectProject}
                            inputProps={{name: 'project', id: 'priority-simple', value: project}}>
                        {projects.map((project, index) => (
                            <MenuItem key={index} value={project}>

                                <div className="row align-items-center justify-content-between col-12 pr-0">
                                    <div className='col-9 px-0 elliosis'>
                                        {project.title}
                                    </div>

                                    {project.id === 1 ?
                                        null :
                                        <Settings className='change-project px-0' onClick={()=>updateProjectOpenModal(project)} />
                                    }

                                </div>

                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <NewProject isOpenModal={isOpenModalNewProject}
                            updateProject={selectedUpdateProject}
                            removeProject={removeProject}
                            okModal={selectedUpdateProject ? updateProject : addProject}
                            closeModal={updateProjectCloseModal}/>
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
        addProjectDispatch: (project) => {
            dispatch({
                type: TYPE.ADD_PROJECT,
                payload: project,
            })
        },
        updateProjectDispatch: (project) => {
            dispatch({
                type: TYPE.UPDATE_PROJECT,
                payload: project,
            })
        },
        removeProjectDispatch: (id) => {
            dispatch({
                type: TYPE.REMOVE_PROJECT,
                payload: id,
            })
        },
        selectProject: (e) => {
            const project = e.target.value;
            dispatch({
                type: TYPE.SELECT_PROJECT,
                payload: project,
            })
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Project)
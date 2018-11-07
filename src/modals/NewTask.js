import React, { Component } from 'react'
import { Button, Modal, TextField, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import PropTypes from "prop-types";
import { PRIORITY } from "../constants";
import moment from 'moment'

class NewTask extends Component {
    constructor(props) {
        super(props);
        this.state = {
            priority: PRIORITY[0]
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.updateTask) this.setState({priority: nextProps.updateTask.priority});
    }

    render() {
        const { isOpenModal, updateTask, okModal, closeModal } = this.props;

        return (
            <Modal open={isOpenModal} onClose={closeModal}
                   style={{"overflowY": "auto"}} BackdropProps={{classes: {root: 'mr-3'}}}>
                <div className="modal-dialog modal-dialog-centered">
                    <form onSubmit={okModal} className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title text-center">{updateTask ? 'Изменить задачу': 'Добавить задачу'}</h5>
                            <button onClick={closeModal} type="button" className="close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body px-5">
                            <TextField name="title" defaultValue={ updateTask ? updateTask.title : ''}
                                       required={true} label="Название" className="col-sm-12"/>
                            <br/>
                            <TextField name="description" defaultValue={ updateTask ? updateTask.description : ''}
                                       label="Описание" multiline required={true} margin="normal"
                                       rowsMax="4" className="col-sm-12 mb-0"/>
                            <br/>
                            <FormControl className="col-sm-12" margin="normal" required={true}>
                                <InputLabel htmlFor="priority-simple">Приоритет</InputLabel>
                                <Select value={this.state.priority}
                                        onChange={(event)=>this.setState({priority: event.target.value})}
                                        inputProps={{name: 'priority', id: 'priority-simple'}}>
                                    {PRIORITY.map((task, index) => (
                                        <MenuItem key={index} value={task}>{task}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <br/>
                            <div className="row mx-0">
                                <TextField name="deadlineDate" label="Дата окончания" type="date" required={true}
                                           defaultValue={ updateTask ? moment(updateTask.deadline).format("YYYY-MM-DD") : null}
                                           margin="normal" className="col-sm-5" InputLabelProps={{shrink: true}}/>
                                <div className="col-sm-2"/>
                                <TextField name="deadlineTime" label="Время окончания" type="time" required={true}
                                           defaultValue={ updateTask ? moment(updateTask.deadline).format("HH:mm") : null}
                                           margin="normal" className="col-sm-5" InputLabelProps={{shrink: true}}/>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <Button variant="contained" onClick={closeModal}>Отмена</Button>
                            <Button variant="contained" color="primary" type="submit">Подтвердить</Button>
                        </div>
                    </form>
                </div>
            </Modal>
        )
    }
}


NewTask.propTypes = {
    isOpenModal: PropTypes.bool.isRequired,
    okModal: PropTypes.func.isRequired,
    closeModal: PropTypes.func.isRequired
};

export default NewTask;
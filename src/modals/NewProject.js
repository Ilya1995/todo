import React, { Component } from 'react'
import { Button, Modal, TextField, IconButton } from '@material-ui/core';
import { Delete } from '@material-ui/icons'
import PropTypes from "prop-types";

class NewProject extends Component {

    render() {
        const { isOpenModal, updateProject, removeProject, okModal, closeModal } = this.props;

        return (
            <Modal open={isOpenModal} onClose={closeModal}>
                <div className="modal-dialog modal-dialog-centered">
                    <form onSubmit={okModal} className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title text-center">{updateProject ? 'Изменить проект': 'Добавить проект'}</h5>
                            <button onClick={closeModal} type="button" className="close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body px-5">
                            <TextField name="title" defaultValue={ updateProject ? updateProject.title : ''}
                                       required={true} label="Название" className="col-sm-12"/>
                            <br/>
                            <TextField name="description" defaultValue={ updateProject ? updateProject.description : ''}
                                       label="Описание" multiline required={true} margin="normal"
                                       rowsMax="4" className="col-sm-12 mb-0"/>
                            {
                                updateProject ?
                                    <div className="row justify-content-end pt-4">
                                        <div className="pr-3" onClick={removeProject}>
                                            <IconButton>
                                                <Delete />
                                            </IconButton> Удалить проект
                                        </div>
                                    </div>
                                    : null
                            }


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


NewProject.propTypes = {
    isOpenModal: PropTypes.bool.isRequired,
    removeProject: PropTypes.func.isRequired,
    okModal: PropTypes.func.isRequired,
    closeModal: PropTypes.func.isRequired
};

export default NewProject;
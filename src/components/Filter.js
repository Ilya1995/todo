import React, { Component } from 'react'
import { connect } from 'react-redux'
import { TYPE, FILTERS } from '../constants'
import { FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';

class Filter extends Component {

    render() {
        const filter = this.props.filter;
        const { updateFilter } = this.props;
        return (
            <div>
                <FormControl className="col-6 col-sm-3 col-md-2" margin="normal">
                    <InputLabel htmlFor="priority-simple">Приоритет</InputLabel>
                    <Select value={filter}
                            onChange={updateFilter}
                            inputProps={{name: 'priority', id: 'priority-simple'}}>
                        {FILTERS.map((priority, index) => (
                            <MenuItem key={index} value={priority}>{priority}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        filter: state.task.filter
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        updateFilter: e => {
            const filter = e.target.value;

            dispatch({
                type: TYPE.UPDATE_FILTER,
                payload: filter,
            })
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Filter)
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import PropTypes from 'prop-types';

const CustomersFilter = (props) => {
    const filterStyle = {
        padding: 20
    };

    const ComboBox = (
        <div style={filterStyle}>
            <Autocomplete
                options={props.data}
                value={props.selectedItem}
                onChange={(event, newValue) => {
                    props.onChange(newValue);
                }}
                getOptionLabel={(option) => option[props.label]}
                style={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="Search User" variant="outlined" />}
            />
        </div>
    )
    return <div>
        {ComboBox}
    </div>
}

CustomersFilter.propTypes = {
    data: PropTypes.arrayOf(
        PropTypes.shape({
            customerName: PropTypes.string,
            id: PropTypes.number,
            date: PropTypes.string,
            amount: PropTypes.number,
            category: PropTypes.string
        })
    ).isRequired,
    onChange: PropTypes.func,
    selectedItem: PropTypes.object,
    label: PropTypes.string
};
export default CustomersFilter;

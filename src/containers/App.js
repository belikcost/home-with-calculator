import React, { useCallback } from 'react';
import { connect } from "react-redux";
import debounce from 'lodash.debounce';

import { calculateRequest, createCartRequest } from "../redux/actions";

import { Calculator } from "../components/Calculator";


const App = ({calculate, error, success, handleCalculateRequest, handleCreateCartRequest}) => {

    const debouncedCalculateRequest = useCallback(debounce(handleCalculateRequest, 500), []);

    return (
        <Calculator
            calculate={calculate}
            error={error}
            success={success}
            handleCalculateRequest={debouncedCalculateRequest}
            handleCreateCartRequest={handleCreateCartRequest}
        />
    );
}

const mapStateToProps = (state) => ({
    calculate: state.calculate,
    error: state.error,
    success: state.success
});

const mapDispatchToProps = (dispatch) => ({
    handleCalculateRequest: (data) => dispatch(calculateRequest(data)),
    handleCreateCartRequest: (data) => dispatch(createCartRequest(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
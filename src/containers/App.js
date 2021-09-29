import React from 'react';
import { connect } from "react-redux";

import { calculateRequest, createCartRequest } from "../redux/actions";

import { Calculator } from "../components/Calculator";


const App = ({calculate, error, success, handleCalculateRequest, handleCreateCartRequest}) => {

    return (
        <Calculator
            calculate={calculate}
            error={error}
            success={success}
            handleCalculateRequest={handleCalculateRequest}
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
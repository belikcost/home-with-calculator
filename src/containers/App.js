import React, { useCallback, useEffect } from 'react';
import { connect } from "react-redux";
import debounce from 'lodash.debounce';

import { calculateRequest, createCartRequest, getSubscriptionsRequest } from "../redux/actions";

import { Calculator } from "../components/Calculator";


const App = ({calculate, error, success, handleCalculateRequest, handleCreateCartRequest, subscriptions, handleGetSubscriptionsRequest}) => {

    const debouncedCalculateRequest = useCallback(debounce(handleCalculateRequest, 500), []);

    useEffect(() => {
        handleGetSubscriptionsRequest();
    }, []);


    return (
        <Calculator
            calculate={calculate}
            error={error}
            success={success}
            handleCalculateRequest={debouncedCalculateRequest}
            handleCreateCartRequest={handleCreateCartRequest}
            subscriptions={subscriptions}
        />
    );
}

const mapStateToProps = (state) => ({
    calculate: state.calculate,
    error: state.error,
    success: state.success,
    subscriptions: state.subscriptions,
});

const mapDispatchToProps = (dispatch) => ({
    handleCalculateRequest: (data) => dispatch(calculateRequest(data)),
    handleCreateCartRequest: (data) => dispatch(createCartRequest(data)),
    handleGetSubscriptionsRequest: () => dispatch(getSubscriptionsRequest()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
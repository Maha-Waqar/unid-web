
export function actionTypes(id) {
    return {
        FETCH_SUGGESTED_RIDES: `fetch_suggested_rides_${id}`,
        FETCH_SUGGESTED_RIDES_SUCCESS: `fetch_suggested_rides_success_${id}`,
        FETCH_SUGGESTED_RIDES_ERROR: `fetch_suggested_rides_error_${id}`
    }
}

const staticActions = {
    UPDATE_SUGGESTED_RIDE: 'updateSuggestedRide'
}

export {
    staticActions
}
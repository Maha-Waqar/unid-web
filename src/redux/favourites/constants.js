export const actionsTypes = (id) => (
    {
        GET_FAVOURITE_DRIVER : `get_favourite_drivers${id}`,
        GET_FAVOURITE_DRIVER_SUCCESS : `get_favourite_drivers_success_${id}`,
        GET_FAVOURITE_DRIVER_FAILURE : `get_favourite_drivers_failure_${id}`,
        RESET_ERROR_MESSAGE : `reset_error_message_${id}`,
        ADD_FAVOURITE_DRIVER:  `add_favourite_driver_${id}`,
        ADD_FAVOURITE_DRIVER_SUCCESS: `add_favourite_driver_success_${id}`,
        ADD_FAVOURITE_DRIVER_FAILURE:  `add_favourite_driver_failure_${id}`,
        DELETE_FAVOURITE_DRIVER: `delete_favourite_driver_${id}`,
        DELETE_FAVOURITE_DRIVER_SUCCESS: `delete_favourite_driver_success_${id}`,
        DELETE_FAVOURITE_DRIVER_FAILURE: `delete_favourite_driver_failure_${id}`
    }
)
 
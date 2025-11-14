import type { Activity } from "../types"

export type ActivityActions = 
    { type: 'save_activity', payload: { newActivity: Activity } } |
    { type: 'set_activeId', payload: { id: Activity['id'] } } | 
    { type: 'delete_activity', payload: { id: Activity['id'] } } | 
    { type: 'restart_app' }


export type ActivityState = {
    activities: Activity[],
    activeId: Activity['id']
}

const localStorageActivities = () => {
    const activities = localStorage.getItem('activities');
    return activities ? JSON.parse(activities) as Activity[] : [];
}

export const initialState: ActivityState = {
    activities: localStorageActivities(),
    activeId: ''
}

export const activityReducer = (state: ActivityState = initialState, action: ActivityActions) => {
    switch (action.type) {
        case "save_activity":{
            let updatedActivities: Activity[] = []
            if (state.activeId) {
                updatedActivities = state.activities.map(act => 
                    act.id === state.activeId ? action.payload.newActivity : act
                );
            } else {
                updatedActivities = [...state.activities, action.payload.newActivity];
            }
            return {
                ...state,
                activities: updatedActivities,
                activeId: ''
            };
        }
        case "set_activeId":
            return {
                ...state,
                activeId: action.payload.id
            };
        case "delete_activity":
            return {
                ...state,
                activities: state.activities.filter(act => act.id !== action.payload.id),
                activeId: state.activeId === action.payload.id ? '' : state.activeId
            };
        case "restart_app":
            return {
                activities: [],
                activeId: ''
            };
        default:
            return state;
    }
}
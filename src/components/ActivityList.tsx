import { useMemo, type Dispatch } from "react"
import type { Activity } from "../types"
import { categories } from "../data/categories"
import { PencilSquareIcon, XCircleIcon } from '@heroicons/react/24/outline'
import type { ActivityActions } from "../reducers/activityReducer"

type ActivityListProps = {
    activities?: Activity[]
    dispatch: Dispatch<ActivityActions>
}

const ActivityList = ({ activities, dispatch }: ActivityListProps) => {
    const categoryName = useMemo(() => 
        // eslint-disable-next-line react-hooks/exhaustive-deps
        (category: Activity['category']) => categories.map(cat => cat.id === category ? cat.name : ''), [activities])

    const isEmptyActivities = useMemo(() => activities?.length === 0, [activities]);

  return (
    <>
        <h2 className="text-4xl font-bold text-slate-600 text-center">Activity List</h2>
        {
            isEmptyActivities ? (
                <p className="text-center mt-10 text-gray-500">No activities added yet.</p>
            ) : (
                activities?.map(activity => (
                <div key={activity.id} className="px-5 py-10 bg-white mt-5 flex justify-between shadow">
                    <div className="space-y-2 relative">
                        <p className={`absolute -top-8 -left-8 px-10 py-2 text-white uppercase font-bold ${activity.category === 1 ? 'bg-lime-500' : 'bg-orange-500'}`}>
                            {categoryName(+activity.category)}
                        </p>
                        <p className="font-bold text-2xl pt-5">
                            {activity.name}
                        </p>
                        <p className="font-black text-4xl text-lime-500">
                            {activity.calories} {''}
                            <span>Calories</span>
                        </p>
                    </div>

                    <div className="flex gap-5 items-center">
                        <button
                            onClick={() => {
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                                dispatch({type: 'set_activeId', payload: { id: activity.id}})
                            }}
                        >
                            <PencilSquareIcon className="h-8 w-8 text-gray-800" />
                        </button>
                        <button
                            onClick={() => dispatch({type: 'delete_activity', payload: { id: activity.id}})}
                        >
                            <XCircleIcon className="h-8 w-8 text-red-800" />
                        </button>
                    </div>
                </div>
                )
            ))
        }
    </>
  )
}

export default ActivityList

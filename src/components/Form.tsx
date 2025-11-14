import { useEffect, useState, type Dispatch } from "react"
import { categories } from "../data/categories"
import type { Activity } from "../types";
import type { ActivityActions, ActivityState } from "../reducers/activityReducer";
import { v4 as uuidv4 } from 'uuid'

type FormProps = {
    dispatch: Dispatch<ActivityActions>;
    state: ActivityState;
}

const initialState: Activity = {
    id: uuidv4(),
    category: 1,
    name: '',
    calories: 0
}

const Form = ({ dispatch, state }: FormProps) => {
    const [activity, setActivity] = useState<Activity>(initialState);
    useEffect(() => {
        if (state.activeId) {
            const activeActivity = state.activities.find(act => act.id === state.activeId);
            if (activeActivity) {
                setActivity(activeActivity);
            }
        } else {
            setActivity({
                ...initialState,
                id: uuidv4()
            });
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state.activeId]);

    const handleNumberChange = (value: string) => {
        return Number(value.replaceAll(/\D/g, ""))
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { id, value } = e.target;
        if (id === 'calories' || id === 'category') {
            setActivity({...activity, [id]: handleNumberChange(value) });
        } else {
            setActivity({...activity, [id]: value });
        }
    }

    const isValidActivity = (): boolean => {
        const { name, calories } = activity;
        console.log(name)
        return name.trim() !== '' && calories > 0;
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch({ type: 'save_activity', payload: { newActivity: activity } });
        setActivity({
            ...initialState,
            id: uuidv4()
        });
    }

  return (
    <div>
        <form className="space-y-5 bg-white shadow p-10 rounded-lg" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-3">
                <label htmlFor="">Category:</label>
                <select
                    id="category"
                    className="border border-slate-300 p-2 rounded-lg w-full"
                    value={activity.category}
                    onChange={handleChange}
                >
                    {
                        categories.map(category => (
                            <option key={category.id} value={category.id}>{category.name}</option>
                        ))
                    }
                </select>
            </div>

            <div className="grid grid-cols-1 gap-3">
                <label htmlFor="name">Activity:</label>
                <input
                    id="name"
                    type="text"
                    className="border border-slate-300 p-2 rounded-lg w-full"
                    placeholder="Ej. Food, orange juice, salad, workout"
                    value={activity.name}
                    onChange={handleChange}
                />
            </div>

            <div className="grid grid-cols-1 gap-3">
                <label htmlFor="calories">Calories:</label>
                <input
                    name="calories"
                    id="calories"
                    type="text"
                    className="border border-slate-300 p-2 rounded-lg w-full"
                    placeholder="Ej. 100, 200, 300"
                    value={activity.calories === 0 ? '' : activity.calories}
                    onChange={handleChange}
                />
            </div>

            <input
                className="bg-gray-800 text-white p-2 rounded-lg font-bold hover:bg-gray-900 cursor-pointer uppercase transition w-full disabled:opacity-50 disabled:cursor-not-allowed"
                type="submit"
                value={activity.category === 1 ? 'Add Food' : 'Add Exercise'}
                disabled={!isValidActivity()}
            />
        </form>
    </div>
  )
}

export default Form

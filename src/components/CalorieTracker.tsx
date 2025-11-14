import { useMemo } from "react"
import type { Activity } from "../types"
import CaloryDisplay from "./CaloryDisplay"

type CalorieTrackerProps = {
    activities?: Activity[]
}

const CalorieTracker = ({ activities }: CalorieTrackerProps) => {
    const caloriesConsumed = useMemo(() => {
        return activities?.reduce((total: number, activity: Activity) => activity.category === 1 ? total + activity.calories : total, 0) || 0;
    }, [activities]);

    const caloriesBurned = useMemo(() => {
        return activities?.reduce((total: number, activity: Activity) => activity.category === 2 ? total + activity.calories : total, 0) || 0;
    }, [activities]);

    const netCalories = useMemo(() => {
        return caloriesConsumed - caloriesBurned;
    }, [caloriesConsumed, caloriesBurned]);

    return (
        <>
            <h2 className="text-4xl font-black text-white text-center">Calories summary</h2>

            <div className="flex flex-col items-center md:flex-row md:justify-between gap-5 mt-10">
                <CaloryDisplay calories={caloriesConsumed} text="Calories Consumed" />
                <CaloryDisplay calories={caloriesBurned} text="Calories Burned" />
                <CaloryDisplay calories={netCalories} text="Net Calories" />
            </div>
        </>
    )
}

export default CalorieTracker

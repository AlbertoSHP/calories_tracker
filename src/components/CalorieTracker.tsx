import { useActivity } from "../hooks/useActivity"
import CaloryDisplay from "./CaloryDisplay"

const CalorieTracker = () => {
    const {caloriesConsumed, caloriesBurned, netCalories} = useActivity()

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

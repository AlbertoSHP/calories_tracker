type CaloryDisplayProps = {
    calories: number;
    text: string;
}

const CaloryDisplay = ({ calories, text }: CaloryDisplayProps) => {
  return (
    <p className="text-white font-bold rounded-full grid grid-cols-1 gap-3 text-center">
        <span className="text-6xl">{calories} {''}</span>
        {text}
    </p>
  )
}

export default CaloryDisplay

import classNames from 'classnames'


export type DurationProps = {
    duration: number
    availableGameDuration: number
    setDuration: (duration: number) => void
    setLoadingDuration: (loadingDuration: boolean) => void
}

const Duration = ({duration, availableGameDuration, setDuration }: DurationProps) => {
    //handle duration
    const durationHandle = (givenDuration: number) => {
        setDuration(givenDuration)
    }
    return (
        <div className="">
            <button
                onClick={() => durationHandle(availableGameDuration)}
                className={classNames(
                    'bg-gradient-to-tl font-bold py-2 px-4 rounded shadow-md',
                    duration !== availableGameDuration ? 'from-slate-400 to-white text-zinc-700' : 'from-green-300 to-green-500 text-white'
                )}
            >
                {(availableGameDuration/60)} {(availableGameDuration/60) === 1 ? 'Hour': 'Hours'}
            </button>
        </div>
    )
}

export default Duration

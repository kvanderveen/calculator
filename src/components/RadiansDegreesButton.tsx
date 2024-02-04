import { useAppContext } from '../context/AppContext'

export function RadiansDegreesButton() {
  const { toggleIsInDegrees, isInDegrees } = useAppContext()
  return (
    <button
      className="items-center justify-center hidden col-span-2 gap-2 py-3 transition-opacity duration-150 rounded-md sm:flex landscape:flex opacity-80 hover:opacity-100 bg-slate-500"
      onClick={toggleIsInDegrees}
    >
      <div className={`${isInDegrees ? 'text-slate-400' : 'text-white'}`}>Rad</div>
      <div>|</div>
      <div className={`${isInDegrees ? 'text-white' : 'text-slate-400'}`}>Deg</div>
    </button>
  )
}

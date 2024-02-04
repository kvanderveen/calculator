import { useAppContext } from '../context/AppContext'

export function CalculatorWindow() {
  const { textInWindow } = useAppContext()
  return (
    <div className="col-span-4 sm:col-span-7 landscape:col-span-7 w-full h-16 rounded-md border-slate-200 border-[1px] bg-transparent text-right px-4 text-2xl flex items-center justify-end">
      {textInWindow}
    </div>
  )
}

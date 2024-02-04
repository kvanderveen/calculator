import { CalculatorWindow } from './CalculatorWindow'
import { CalculatorKeys } from './CalculatorKeys'

export function Calculator() {
  return (
    <div className="h-[100vh] flex items-center justify-center bg-slate-800 box-border p-2 landscape:scale-75">
      <div className="grid w-[600px] grid-cols-4 sm:grid-cols-7 landscape:grid-cols-7  text-white gap-2">
        <CalculatorWindow />
        <CalculatorKeys />
      </div>
    </div>
  )
}

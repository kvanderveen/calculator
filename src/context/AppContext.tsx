import { useState, createContext, useContext, ReactNode } from 'react'
import { evaluate, round } from 'mathjs'
import { KeyObjectType } from '../data/keys'

type AppContextType = {
  textInWindow: string
  setTextInWindow: React.Dispatch<React.SetStateAction<string>>
  isInDegrees: boolean
  toggleIsInDegrees: () => void
  handleChange: (keyObject: KeyObjectType) => void
  isInverseActive: boolean
}

// eslint-disable-next-line react-refresh/only-export-components
export function useStateHooks() {
  const [textInWindow, setTextInWindow] = useState<string>('0')
  const [textForCalculation, setTextForCalculation] = useState<string>('0')
  const [isInDegrees, setIsInDegrees] = useState(false)
  const [isTrigFunctionActive, setIsTrigFunctionActive] = useState(false)
  const [isArcTrigFunctionActive, setIsArcTrigFunctionActive] = useState(false)
  const [isInverseActive, setIsInverseActive] = useState(false)
  const [isError, setIsError] = useState(false)

  const trigFunctions = ['sin(', 'cos(', 'tan(']
  const arcTrigFunctions = ['asin(', 'acos(', 'atan(']

  if (
    isInDegrees &&
    !isTrigFunctionActive &&
    trigFunctions.some((func) => textInWindow.endsWith(func))
  ) {
    setIsTrigFunctionActive(true)
  }

  if (
    isInDegrees &&
    !isArcTrigFunctionActive &&
    arcTrigFunctions.some((func) => textForCalculation.endsWith(func))
  ) {
    setIsArcTrigFunctionActive(true)
  }

  function toggleIsInDegrees() {
    setIsInDegrees((prev) => !prev)
  }

  function toggleIsInverseActive() {
    setIsInverseActive((prev) => !prev)
  }

  function handleChange(keyObject: KeyObjectType) {
    if (keyObject.key === 'CE') {
      setIsError(false)
      setTextInWindow('0')
      setTextForCalculation('0')
      return
    }
    if (isError) return
    if (keyObject.key === '=') {
      calculate()
      return
    }
    if (keyObject.key === 'Inv') {
      toggleIsInverseActive()
      return
    }
    if (keyObject.key === ')' && isInDegrees && isTrigFunctionActive) {
      setIsTrigFunctionActive(false)
      setTextInWindow((prev) => prev + ')')
      setTextForCalculation((prev) => prev + ' deg)')
      return
    }
    if (keyObject.key === ')' && isInDegrees && isArcTrigFunctionActive) {
      setIsArcTrigFunctionActive(false)
      setTextInWindow((prev) => prev + ')')
      setTextForCalculation((prev) => prev + `) / 2 / ${Math.PI} * 360`)
      return
    }
    if (textInWindow === '0' && !'*/+-'.includes(keyObject.calculationString)) {
      setTextInWindow('')
      setTextForCalculation('')
    }
    setTextInWindow((prev) => `${prev}${keyObject.windowString}`)
    setTextForCalculation((prev) => prev + keyObject.calculationString)
  }

  function calculate() {
    console.log(textForCalculation)
    try {
      const answer = round(evaluate(textForCalculation), 13).toString()
      setTextInWindow(answer)
      setTextForCalculation(answer)
    } catch (error) {
      setTextInWindow((prev) => `Error, '${prev}' is not valid.`)
      setTextForCalculation('')
      setIsError(true)
    }
  }
  return {
    textInWindow,
    setTextInWindow,
    isInDegrees,
    toggleIsInDegrees,
    handleChange,
    isInverseActive,
  }
}

const AppContext = createContext<AppContextType | null>(null)

// eslint-disable-next-line react-refresh/only-export-components
export function useAppContext() {
  const context = useContext(AppContext)
  if (context == null) throw Error('Must be used in context.')
  return context
}

export function AppContextProvider({ children }: { children: ReactNode }) {
  return <AppContext.Provider value={useStateHooks()}>{children}</AppContext.Provider>
}

import { keys } from '../data/keys'
import { KeyButton } from './KeyButton'
import { RadiansDegreesButton } from './RadiansDegreesButton'

export function CalculatorKeys() {
  return (
    <>
      <RadiansDegreesButton />
      {keys.map((keyObject) => {
        return <KeyButton keyObject={keyObject} key={keyObject.id} />
      })}
    </>
  )
}

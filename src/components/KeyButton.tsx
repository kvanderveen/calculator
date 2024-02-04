import { KeyObjectType } from '../data/keys'
import { useAppContext } from '../context/AppContext'

type KeyButtonProps = {
  keyObject: KeyObjectType
}

export function KeyButton({ keyObject }: KeyButtonProps) {
  const { handleChange, isInverseActive } = useAppContext()
  const { visibleMobilePortrait, key, background, showInverseActive, showInverseInactive } =
    keyObject
  const showOnAllScreens = 'flex sm:flex landscape:flex'
  const hideOnMobilePortraitScreen = 'hidden sm:flex landscape:flex'
  const hideOnAllScreens = 'hidden'
  const visibility = visibleMobilePortrait
    ? showOnAllScreens
    : (isInverseActive && showInverseActive) || (!isInverseActive && showInverseInactive)
    ? hideOnMobilePortraitScreen
    : hideOnAllScreens
  return (
    <button
      className={`${visibility} items-center justify-center ${background} rounded-md py-3 opacity-80 hover:opacity-100 transition-opacity duration-150`}
      onClick={() => handleChange(keyObject)}
    >
      {key}
    </button>
  )
}

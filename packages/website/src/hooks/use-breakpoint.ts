
import twConfig from '@/../tailwind.config'
import resolveConfig from 'tailwindcss/resolveConfig'
import {useMediaQuery} from "usehooks-ts";
type BreakpointKey = keyof typeof breakpoints;
const fullConfig = resolveConfig(twConfig)
const breakpoints = fullConfig.theme.screens;
export function useBreakpoint<K extends BreakpointKey>(breakpointKey: K) {
  const bool = useMediaQuery( `only screen and (min-width: ${breakpoints[breakpointKey]})`,);
  const capitalizedKey = breakpointKey[0].toUpperCase() + breakpointKey.substring(1);
  type Key = `is${Capitalize<K>}`;
  return {
    [`is${capitalizedKey}`]: bool,
  } as Record<Key, boolean>;
}
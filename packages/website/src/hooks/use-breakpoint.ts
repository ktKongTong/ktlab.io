'use client'

import twConfig from '@/../tailwind.config'
import resolveConfig from 'tailwindcss/resolveConfig'
// import {useMediaQuery} from "@uidotdev/usehooks";
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

import * as React from "react";

export function useMediaQuery(query: string) {
  const [value, setValue] = React.useState(false);

  React.useEffect(() => {
    function onChange(event: MediaQueryListEvent) {
      setValue(event.matches);
    }

    const result = matchMedia(query);
    result.addEventListener("change", onChange);
    setValue(result.matches);

    return () => result.removeEventListener("change", onChange);
  }, [query]);

  return value;
}

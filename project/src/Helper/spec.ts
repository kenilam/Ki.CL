import Color from 'color';

export type CSSUnit = (
  prop?: {
    values?: number | string
  }
) => number

export type CSSUnitGroup = (
  prop?: {
    style?: Style
  }
) => {
  [name in 'fontSize' | 'maxFontSize']?: Style[keyof Style]
}

export type Style = {
  [name: string]: number | string
}

export type Cancel = () => void
export type Trigger = () => Promise<Response>

export type Fetch = (url?: string, options?: RequestInit) => ({
  cancel: Cancel
  trigger: Trigger
})

export type FetchImage = (
  prop?: {
    url?: string
  }
) => {
  cancel: Cancel
  trigger: Trigger
}

export type GetFileExtension<T = string> = (
  prop?: {
    path?: string
  }
) => T | string

export type IsImage = (
  prop?: {
    path?: string
  }
) => boolean

export type RandomColor = (
  prop?: {
    hex?: number | string
  }
) => Color

export type RandomNumber = (
  prop?: {
    start?: number,
    end?: number,
  }
) => number

export type RandomId = (
  prop?: {
    range?: number,
  }
) => number

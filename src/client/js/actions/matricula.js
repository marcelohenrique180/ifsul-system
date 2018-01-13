// @flow

import type { Action } from './types'

export const NOVA_MATRICULA: string = 'NOVA_MATRICULA'

export function novaMatricula(): Action {
  return { type: NOVA_MATRICULA }
}

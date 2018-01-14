// @flow

import type { Action } from './types'
import type { Matricula } from '../reducers/types/index'

export const NOVA_MATRICULA: string = 'NOVA_MATRICULA'

export function novaMatricula(): Action<Matricula> {
  return { type: NOVA_MATRICULA, payload: {} }
}

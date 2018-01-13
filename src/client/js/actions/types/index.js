// @flow

import type { Error } from '../../reducers/types'

export type Action = {
  +type: string,
  +payload: Object,
  +error: ?Error
}

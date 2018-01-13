// @flow

import type { AlunoType } from '../reducer-aluno'
import type { UsuarioType } from '../reducer-user'
import type { MatriculaType } from '../reducer-matricula'
import type { AlunoUsuarioType } from '../reducer-aluno-user'
import type { TipoType } from '../reducer-tipos'
import type { CursoType } from '../reducer-curso'
import type { RequerimentoType } from '../reducer-requerimento'
import type { RequerimentoPageType } from '../reducer-requerimento-page'
import type { NotificacaType } from '../reducer-notificacao'
import type { ParecerType } from '../reducer-parecer'
import type { RequerimentoAbertoType } from '../reducer-requerimentos-abertos'

export type Store = {
  +usuario: State<?UsuarioType>,
  +matricula: State<?MatriculaType>,
  +aluno_usuario: State<?AlunoUsuarioType>,
  +aluno: State<?AlunoType>,
  +tipos: State<?TipoType>,
  +curso: State<?CursoType>,
  +requerimento: State<?RequerimentoType>,
  +requerimentoPage: State<?RequerimentoPageType>,
  +notificacao: State<?NotificacaType>,
  +parecer: State<?ParecerType>,
  +requerimentos_abertos: State<?RequerimentoAbertoType>
}

export type Case = {
  +request: string,
  +receive: string,
  +failure: string
}

export type Error = {
  +message: string,
  +status: number
}

export type State<T> = {
  +isFetching: boolean,
  +hasError: boolean,
  +fetched: boolean,
  +payload: ?T,
  +error: ?Error
}

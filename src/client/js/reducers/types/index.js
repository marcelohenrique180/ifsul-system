// @flow

import type { Page } from '../../util'

export type Store = {
  +usuario: State<Usuario>,
  +matricula: State<Matricula>,
  +aluno_usuario: State<AlunoUsuario>,
  +aluno: State<Aluno>,
  +tipos: State<Tipo>,
  +curso: State<Curso>,
  +requerimento: State<Requerimento>,
  +requerimentoPage: State<RequerimentoPage>,
  +notificacao: State<Notificacao>,
  +parecer: State<Parecer>,
  +requerimentos_abertos: State<RequerimentoAberto>
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
  +payload: T,
  +error: Error
}

export type Aluno = {
  dataNasc: string,
  matricula: string,
  nome: string,
  rg: string,
  telefone: string,
  _links: { curso: { href: string } }
}

export type Matricula = {}

export type Usuario = {
  idToken: ?string,
  isAuthenticated: boolean,
  role: ?string
}

export type AlunoUsuario = {}

export type Tipo = {
  tipo: string
}

export type Curso = {
  nome: string
}

export type Requerimento = {
  data: string,
  justificativa: string,
  requerimento: string,
  +_links: {
    tipo: { href: string },
    aluno: { href: string },
    self: { href: string }
  }
}

export type Notificacao = {}

export type Parecer = {
  deferido: boolean,
  memorando: string,
  parecer: string,
  requerimento: string
}

export type RequerimentoPage = {
  page: Page,
  _links: { first: { href: string }, last: { href: string } },
  _embedded: {
    requerimentos: Array<Requerimento>
  }
}

export type RequerimentoAberto = {
  _embedded: Array<Requerimento>
}

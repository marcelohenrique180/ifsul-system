// @flow

import * as React from 'react'

import type { Action, Dispatch } from '../../actions/types'
import type {
  State as DefaultState,
  Parecer,
  Requerimento,
  Store
} from '../../reducers/types/index'

import ParecerView from '../parecer/ParecerView'
import RequerimentoForm from './RequerimentoForm'
import { connect } from 'react-redux'
import { getParecerByRequerimentoId } from '../../actions/parecer'

type DispatchProps = {
  getParecerByRequerimentoId: string => Promise<Action<Requerimento>>
}

type ExternalProps = {
  requerimento: Requerimento
}

type StateProps = {
  parecer: DefaultState<Parecer>
}

type Props = StateProps &
  DispatchProps &
  ExternalProps & {
    params: { requerimento: string }
  }

@connect(mapStateToProps, mapDispatchToProps)
export default class AlunoVisualizarRequerimento extends React.Component<
  Props
> {
  constructor(props: Props) {
    super(props)

    this.props.getParecerByRequerimentoId(this.props.params.requerimento)
  }

  render() {
    const { parecer } = this.props

    console.log(this.props)
    return (
      <RequerimentoForm requerimentoId={this.props.params.requerimento}>
        <ParecerView parecer={parecer} />
      </RequerimentoForm>
    )
  }
}

function mapStateToProps(store: Store): StateProps {
  return {
    parecer: store.parecer
  }
}

function mapDispatchToProps(dispatch: Dispatch): DispatchProps {
  return {
    getParecerByRequerimentoId: requerimento =>
      dispatch(getParecerByRequerimentoId(requerimento))
  }
}

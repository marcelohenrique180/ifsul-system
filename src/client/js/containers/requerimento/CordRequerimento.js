// @flow

import * as React from 'react'

import type { Action, Dispatch } from '../../actions/types'
import type {
  State as DefaultState,
  Parecer,
  Requerimento,
  Store
} from '../../reducers/types/index'

import Carregando from '../../components/Carregando'
import ParecerInsert from '../parecer/ParecerInsert'
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
export default class CordVisualizarRequerimento extends React.Component<Props> {
  constructor(props: Props) {
    super(props)

    this.props.getParecerByRequerimentoId(this.props.params.requerimento)
  }

  render() {
    const { parecer } = this.props
    let parecerComponent: React$Node = <Carregando />

    if (parecer.hasError) {
      parecerComponent = <ParecerInsert />
    } else if (!parecer.isFetching) {
      parecerComponent = <ParecerView parecer={parecer} />
    }

    console.log(this.props.parecer.hasError)
    return (
      <RequerimentoForm requerimentoId={this.props.params.requerimento}>
        {parecerComponent}
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

// @flow

import Carregando from '../components/Carregando'
import FlatButton from 'material-ui/FlatButton'
import { Link } from 'react-router'
import React from 'react'
import type { RequerimentoPage } from '../reducers/types/index'
import type { Theme } from './App'
import autobind from 'autobind-decorator'
import muiThemeable from 'material-ui/styles/muiThemeable'

const style = {
  paginator: {
    listStyle: 'none',
    display: 'flex',
    justifyContent: 'center',
    padding: 0
  },
  pageItem: {}
}

type Props = {
  pageableEntity: RequerimentoPage,
  currentPage: number,
  onClickHandler: string => () => void,
  api: string,
  location: { pathname: string }
} & {
  muiTheme?: Theme
}

@muiThemeable()
export default class Paginator extends React.Component<Props> {
  @autobind
  onClickHandler(i: number) {}

  render() {
    const { pageableEntity, currentPage, onClickHandler, api } = this.props
    const { pathname } = this.props.location

    if (typeof pageableEntity.page !== 'undefined') {
      const { _links, page } = pageableEntity
      let pagination = null

      if (page.totalElements - 1 > 0) {
        const itens = () => {
          const array = []

          const pageControl = (() => {
            const { totalPages } = page
            const pages = 6
            const pageControl = {}

            if (pages >= totalPages) {
              pageControl.start = 0
              pageControl.end = totalPages - 1
            } else {
              if (totalPages - currentPage <= pages / 2) {
                // ending node
                pageControl.start = totalPages - pages - 1
                pageControl.end = totalPages - 1
              } else if (pages / 2 > currentPage) {
                // starting node
                pageControl.start = 0
                pageControl.end = pages
              } else {
                pageControl.start = currentPage - pages / 2
                pageControl.end = currentPage + pages / 2
              }
            }

            return pageControl
          })()

          for (let i = pageControl.start; i <= pageControl.end; i++) {
            if (
              i === currentPage &&
              typeof this.props.muiTheme !== 'undefined'
            ) {
              array.push(
                <li key={i} style={style.pageItem}>
                  <FlatButton
                    backgroundColor={this.props.muiTheme.palette.primary1Color}
                    hoverColor={this.props.muiTheme.palette.primary2Color}
                    style={{ color: 'white' }}
                    fullWidth={true}
                    onClick={() => {
                      onClickHandler(api + 'page=' + i)
                    }}
                    label={i + 1}
                  />
                </li>
              )
            } else {
              array.push(
                <li key={i} style={style.pageItem}>
                  <FlatButton
                    fullWidth={true}
                    onClick={onClickHandler(api + 'page=' + i)}
                    label={i + 1}
                  />
                </li>
              )
            }
          }
          return array
        }

        if (_links.first) {
          pagination = (
            <div>
              <ul style={style.paginator}>
                <li style={style.pageItem}>
                  <FlatButton
                    onClick={onClickHandler(_links.first.href)}
                    fullWidth={true}
                    label="&laquo;"
                  />
                </li>
                {itens()}
                <li style={style.pageItem}>
                  <FlatButton
                    fullWidth={true}
                    onClick={onClickHandler(_links.last.href)}
                    label="&raquo;"
                  />
                </li>
              </ul>
            </div>
          )
        }
      }

      return pagination
    }
    return <Carregando />
  }
}

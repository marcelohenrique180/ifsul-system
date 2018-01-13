// @flow

import { Link } from 'react-router'

import React from 'react'
import Carregando from '../components/Carregando'

type Props = Object

export default class Paginator extends React.Component<Props> {
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
            if (i !== currentPage) {
              array.push(
                <li key={i}>
                  <Link
                    to={pathname}
                    onClick={onClickHandler(api + 'page=' + i)}
                  >
                    {i + 1}
                  </Link>
                </li>
              )
            } else {
              array.push(
                <li className="active" key={i}>
                  <Link
                    to={pathname}
                    onClick={() => {
                      onClickHandler(api + 'page=' + i)
                    }}
                  >
                    {i + 1}
                  </Link>
                </li>
              )
            }
          }
          return array
        }

        if (_links.first) {
          pagination = (
            <div>
              <ul className="pagination">
                <li>
                  <Link
                    to={pathname}
                    onClick={onClickHandler(_links.first.href)}
                  >
                    &laquo;
                  </Link>
                </li>
                {itens()}
                <li>
                  <Link
                    to={pathname}
                    onClick={onClickHandler(_links.last.href)}
                  >
                    &raquo;
                  </Link>
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

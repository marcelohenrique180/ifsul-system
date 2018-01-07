import React, {Component} from 'react'

export default class Carregando extends Component {
  render () {
    return (
      <div className="loadingbox">
        <div className="loadingbox__ball" id="loading_ball_1">
          <div className="loadingbox__ball__innerball" />
        </div>
        <div className="loadingbox__ball" id="loading_ball_2">
          <div className="loadingbox__ball__innerball" />
        </div>
        <div className="loadingbox__ball" id="loading_ball_3">
          <div className="loadingbox__ball__innerball" />
        </div>
        <div className="loadingbox__ball" id="loading_ball_4">
          <div className="loadingbox__ball__innerball" />
        </div>
        <div className="loadingbox__ball" id="loading_ball_5">
          <div className="loadingbox__ball__innerball" />
        </div>
      </div>
    )
  }
}

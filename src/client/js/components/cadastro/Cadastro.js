import React from 'react';

export default class Cadastro extends React.Component{
    render (){
        return (
            <div>
                <h1 className="text-center">Cadastro</h1>
                {this.props.children}
            </div>
        );
    }
}
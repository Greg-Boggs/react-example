import React, { useState, useEffect } from 'react';

import './App.css';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: []
        };
    }

    componentDidMount() {

        fetch('https://master-7rqtwti-su7dp7cnlghym.us-3.platformsh.site/jsonapi/node/event', {
            method: 'GET', // or GET
            headers:{
                'Accept': 'application/json',
            }
        })
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        items: result.data
                    });
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    render() {
        const { error, isLoaded, items } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <table>
                    <thead>
                    <tr>
                        <th>title</th>
                    </tr>
                    </thead>
                    <tbody>
                    {items.map(item => (
                        <tr key={item.attributes.title}>
                            <td>{item.attributes.title}</td>
                        </tr>
                            ))}
                    </tbody>
                </table>
            );
        }
    }
}

export default App;
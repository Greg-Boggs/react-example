import React, {} from 'react';

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
        fetch('https://api.communico.co/v3/attend/events?start=0&limit=10&status=published', {
            method: 'GET', // or GET
            headers:{
                'Authorization': 'Bearer <KEY HERE>',
                'Accept': 'application/json',
            }
        })
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        items: result.data.entries
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
                        <th>eventId</th>
                        <th>recurringId</th>
                        <th>status</th>
                        <th>modified</th>
                        <th>newEventId</th>
                        <th>title</th>
                        <th>subTitle</th>
                        <th>shortDescription</th>
                        <th>description</th>
                        <th>eventStart</th>
                        <th>eventEnd</th>
                        <th>locationId</th>
                        <th>locationName</th>
                        <th>roomId</th>
                        <th>roomName</th>
                    </tr>
                    </thead>
                    <tbody>
                    {items.map(item => (
                        <tr key={item.eventId}>
                            <td>{item.eventId}</td>
                            <td>{item.recurringId}</td>
                            <td>{item.status}</td>
                            <td>{item.modified}</td>
                            <td>{item.newEventId}</td>
                            <td>{item.title}</td>
                            <td>{item.subTitle}</td>
                            <td>{item.shortDescription}</td>
                            <td>{item.description}</td>
                            <td>{item.eventStart}</td>
                            <td>{item.eventEnd}</td>
                            <td>{item.locationId}</td>
                            <td>{item.locationName}</td>
                            <td>{item.roomId}</td>
                            <td>{item.roomName}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            );
        }
    }
}

export default App;
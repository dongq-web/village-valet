import React, { Component } from 'react';
import { connect } from "react-redux";

import Card from "react-bootstrap/Card"

const TEST = [
    {
        id:53423,
        rider:'Rider Name',
        driver:'Driver Name',
        pickup: "555 Test Ave, Troy, NY 12343",
        dropoff: "4534 Pizza St, Troy, NY 12432"
    },
    {
        id:5523455,
        rider:'Rider Name',
        driver:'Driver Name',
        pickup: "555 Test Ave, Troy, NY 12343",
        dropoff: "4534 Pizza St, Troy, NY 12432"
    }
];

class UpcomingRides extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
		this.handleChange = this.handleChange.bind(this);
    }

	handleChange(event) {
	}


    handleClick = ride => {
        this.props.changeRideBreakdown(ride);
    };

    createTable = () => {
        let table = [];
        for (const ride of TEST) {
            table.push(<tr key={ride.id}><td><button onClick={() => this.handleClick(ride)} >{'Ride Id: '+ ride.id}</button></td></tr>)
        }
        return table
    };

    render() {
        return (
            <Card>
                <Card.Header>Upcoming Rides</Card.Header>
                <Card.Body>
                    <table>
                        <tbody>
                            {this.createTable()}
                        </tbody>
                    </table>
                </Card.Body>
            </Card>
        );
    }
}

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
    changeRideBreakdown: (ride) => dispatch({
        type: "ridebreakdown",
        payload: ride,
    }),
});

export default connect(mapStateToProps, mapDispatchToProps)(UpcomingRides);

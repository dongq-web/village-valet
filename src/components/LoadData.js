import React, {Component} from 'react';
import {connect} from "react-redux";
import axios from "axios"

import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import ProgressBar from "react-bootstrap/ProgressBar";
import {API_ROOT} from "../modules/api";
import cookie from 'react-cookies'


class LoadData extends Component {
    constructor(props) {
        super(props);
        this.state = {
            status: 0,
            message: "",
        };
    }

	componentDidMount() {
        //Load the villages
        const token = cookie.load('token')
        this.setState({message: "Loading Village"});
        axios.get(API_ROOT + "/database/villages/all", {
            headers: {
                "Authorization": "BEARER " + token
            }
        }).then(response => {
            let data = {};
            for (const item of response.data) {
                data[item.id] = item;
            }
            this.props.load("villages", data);
        }).then(() => {
            this.setState({status: 20});
        }).then(() => {
            this.setState({message: "Loading Users"});
            axios.get(API_ROOT + "/database/users/all", {
                headers: {
                    "Authorization": "BEARER " + token
                }
            }).then(response => {
                let data = {};
                for (const item of response.data) {
                    data[item.id] = item;
                }
                this.props.load("users", data);
            }).then(() => {
                this.setState({status: 60});
            }).then(() => {
                //Load the Rides
                this.setState({message: "Loading Rides"});
                axios.get(API_ROOT + "/database/rides/all", {
                    headers: {
                        "Authorization": "BEARER " + token
                    }
                }).then(response => {
                    let data = {};
                    for (const item of response.data) {
                        data[item.id] = item;
                    }
                    console.log(response.data)
                    console.log(data)
                    this.props.load("rides", data);
                }).then(() => {
                    this.setState({status: 80});
                }).then(() => {
                    axios.get(API_ROOT + "/admin/googlemaps", {
                        headers: {
                            "Authorization": "BEARER " + token
                        }
                    }).then((response) => {
                        console.log(response.data, "LOAD")
                        cookie.save('googlemapstoken', response.data.token, {path: '/', maxAge: 3600})
                        cookie.save('token', response.headers.token, {path: '/', maxAge: 3600});
                        this.setState({status: 100});
                    }).then(() => {
                        this.props.load("loaded", true);
                    })
                })
            })
        })
    }

    render() {
        return (
            <div style={{padding: 100}}>
                <Container>
                    <Card>
                    <Card.Header>Loading...</Card.Header>
                        <Card.Body>
                            <ProgressBar animated now={this.state.status} />
                        </Card.Body>
                    </Card>
                </Container>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    village_id: state.operator.village_id
});

const mapDispatchToProps = dispatch => ({
    load: (tag, data) => dispatch({
        type: "load",
        payload: {
            tag: tag,
            data: data
        }
    }),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoadData);

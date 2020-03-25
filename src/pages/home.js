import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import PropTypes from 'prop-types';
//Components
import Scream from '../components/Scream';


class home extends Component {
    state = {
        screams: null
    }
    componentDidMount() {
        axios
            .get('/screams')
            .then(res => {
                this.setState({
                    screams: res.data

                })
            })
            .catch((err) => console.log(err));
    }
    render() {
        let recentScreams = this.state.screams ? (
            this.state.screams.map(scream => < Scream key={scream.screamId} scream={scream} />)

        ) : (<p>Carregando...</p>

            )
        return (

            <Grid container spacing={16}>

                <Grid item sm={8} xs={12}>
                    {recentScreams}
                </Grid>
                <Grid item sm={4} xs={12}>
                    <p>Users...</p>
                </Grid>
            </Grid>

        )
    }
}

export default home
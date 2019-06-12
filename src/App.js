import React, { Component } from 'react';
import classes from './App.css';
import GetUserDashboardInformation from './components/GetUserDashboardInformation';
import asyncComponent from './hoc/asyncComponent';
import Layout from './components/UI/Layout/Layout';

const UserInformation = asyncComponent( ()=>{
  return import('./containers/UserDashboardInformation'); 
});
class App extends Component {
  render() {
    return (
    <Layout>
      	<div className={classes.panelBody}>
      		<UserInformation />
 		</div>
    </Layout>  
    );
  }
}

export default App;


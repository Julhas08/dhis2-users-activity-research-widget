import React, { Component } from 'react';
import withErrorHandler from '../hoc/withErrorHandler/withErrorHandler';
import Aux from '../hoc/Auxi';
import {CSVLink} from 'react-csv';
import axios from 'axios';
import classes from './GetUserDashboardInformation.css';

var DataTable = require('react-data-components').DataTable;
const baseURL = "https://bd-eregistry.dhis2.org/dhis/";
//const baseURL = "../../../";
const fetchOptions = {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: "Basic " + btoa("julhan:Dhaka123!")         

        }
      };
// Tabular view         
var columns = [
  { title: 'User Name', prop: 'name'  },
  { title: 'Org Unit', prop: 'orgUnits'  },
  { title: 'Email', prop: 'email' },
  { title: 'Dasbhaord Name', prop: 'dasbhaordName' },
  { title: 'Start Time', prop: 'startTime' },
  { title: 'End Time', prop: 'endTime' },
  { title: 'Duration', prop: 'duration' }
];      

       
class GetUserInformation extends Component{
  constructor(props){
    super(props);
    this.state = {
      usersDashboardInfo: [],
      orgUnits : [], 
    }
  }
  componentDidMount(){
        let usersInfo = [];
        fetch(baseURL+'api/dataStore/useractivitymonitor',fetchOptions).then(res => res.json()) 
        .then(responseKey => { 
          // console.log("responseKey: ", responseKey);
          responseKey.map((uid, index)=>{
            fetch(baseURL+'api/dataStore/useractivitymonitor/'+uid,fetchOptions).then(res => res.json()) 
            .then(userInfo => { 
              usersInfo.push(userInfo);
              // console.log("usersInfo: ", usersInfo);
              this.setState({
                usersDashboardInfo : usersInfo,
                orgUnits : usersInfo.orgUnits    
              });
            });
            return null;
          });
              
        });  
  }
  render(){
  // Tabular view  
    var data = [];
    this.state.usersDashboardInfo.map((rowDashboard, indexDashboard) => {          
      rowDashboard[0].dashboardInfo.map((info, key) => {
          let sortedOrgUnit= rowDashboard[0].orgUnits[0].sort(function(a, b){return a.level - b.level});
          let customJSON = {"name": rowDashboard[0].name,"orgUnits":sortedOrgUnit[0].name,"email": rowDashboard[0].email,"dasbhaordName": info.dasbhaordName,"startTime": info.startTime, "endTime": info.endTime, "duration": "Minutes: "+Math.abs(Math.round(((new Date(info.endTime)-new Date(info.startTime))/1000)/60))}
          data.push(customJSON); 
          return null;       
        })
        return null; 
      }) 

    return(

      <div className={classes.grid}> 
        <ul className="nav nav-tabs">
          <li className="active"><a data-toggle="tab" href="#grid">INDIVIDUAL USERS</a></li>
          <li><a data-toggle="tab" href="#tabular">TABULAR</a></li>
        </ul>

        <div className="tab-content">
        <div id="grid" className="tab-pane fade in active">
        
          <div className={classes.wrapperBox}>
          {
          this.state.usersDashboardInfo.map((row, index) => (  
            <div className={classes.filterDiv} key={index}>
              <div className={classes.leftAlignment}>{row[0].name}</div>             
              <div className={classes.leftAlignment}>{row[0].orgUnits[0][0].name} </div> 
                <div className={classes.boxBottomAlignment}>
                  <span className="glyphicon glyphicon-zoom-in bottom-icons" data-toggle="modal" data-target={"#usermodal"+index}></span>
                  <span className={classes.zoomIn}> </span>
                  <span className="glyphicon glyphicon-align-justify bottom-icons" data-toggle="modal" data-target={"#userOrgUnitModal"+index}></span>
                </div>
                <div id={"usermodal"+index} className="modal fade" role="dialog" key={index}>
                  <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                      <div className="modal-header">
                        <button type="button" className="close" data-dismiss="modal">&times;</button>
                        <h4 className={classes.modal}>USER DASHBOARD ACTIVITY</h4>
                      </div>
                      <div className="modal-body" key={index}>
                       <table key={index} className={classes.table, classes.tableBordered}>
                        <thead className={classes.thead, classes.tableHeaderBg}>
                        <tr>
                          <th>Dashboard Name</th>
                          <th>Start Time</th>
                          <th>End Time</th>
                          <th>Duration</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                          this.state.usersDashboardInfo.map((rowDashboard,indexDashboard) => (          
                            rowDashboard[0].dashboardInfo.map((info,key) => ( 
                            row[0].userId === rowDashboard[0].userId ?
                              <tr key={key}>                             
                                <td> {info.dasbhaordName}</td>
                                <td> {info.startTime}</td>
                                <td> {info.endTime}</td>
                                <td> Minutes: { 
                                       Math.abs(Math.round(((new Date(info.endTime)-new Date(info.startTime))/1000)/60))
                                      }
                                </td>
                              </tr>
                            : null   
                            ))                         
                          ))

                        }
                        </tbody>
                        
                      </table> 
                      </div>
                      <div className="modal-footer">
                        <button type="button" className="btn btn-primary" data-dismiss="modal">Close</button>
                      </div>
                    </div>

                  </div>
                </div>

                <div id={"userOrgUnitModal"+index} className="modal fade" role="dialog" key={index}>
                  <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                      <div className="modal-header">
                        <button type="button" className="close" data-dismiss="modal">&times;</button>
                        <h4 className={classes.modal}>USER ALL ORGANISATION UNITS</h4>
                      </div>
                      <div className="modal-body" key={index}>
                       <table className={classes.table, classes.tableBordered} key={index}>
                        <thead className={classes.thead, classes.tableHeaderBg}>
                        <tr>
                          <th>Organsation Unit Name</th>
                          <th>Level</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                          this.state.usersDashboardInfo.map((rowDashboard,indexDashboard) => (          
                            rowDashboard[0].orgUnits[0].map((info,key) => ( 
                            row[0].userId === rowDashboard[0].userId ?
                              <tr key={key}>                             
                                <td> {info.name}</td>
                                <td> {info.level}</td>
                              </tr>
                            : null     
                            ))                         
                          ))

                        }
                        </tbody>
                        
                      </table> 
                      </div>
                      <div className="modal-footer">
                        <button type="button" className="btn btn-primary" data-dismiss="modal">Close</button>
                      </div>
                    </div>

                  </div>
                </div>
            </div> 
          ))
          }
        </div>
          </div>
          <div id="tabular" className="tab-pane fade">  
          <CSVLink data={data} ><button className={classes.btnCSVdl}><i className="fa fa-download"></i> Download Excel</button></CSVLink>  

            <DataTable
            keys="id"
            className={classes.container}
            columns={columns}
            initialData={data}
            initialPageLength={20}
            pageLengthOptions={[ 10, 20, 30, 50, 100, 200, 300, 400, 500, 1000, 2000 ]}
            initialSortBy={{ prop: 'name', order: 'descending' }}
          />
          </div>
        </div>       
      </div> 
    );
  }

}

export default withErrorHandler(GetUserInformation, axios);

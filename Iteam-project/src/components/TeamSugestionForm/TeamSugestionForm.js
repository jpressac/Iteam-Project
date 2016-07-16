import React from 'react';
import classes from './TeamSugestionForm.scss'
import axios from 'axios'

class TeamSugestionForm extends React.Component {
    constructor(props){
      super(props);
      this.state= {
        filters: [],
        users: [],
        selectedUsers: [],
        usernames: {}
      }

    }
    handleClick(){
      let valueFields = [];
      valueFields.push(this.refs.filterValue.value);
      this.state.filters.push({field: (this.refs.filterName.value).toLowerCase(), values: valueFields});
      console.log(this.state);
      this.forceUpdate();
    }

    handleOnChange(username){
      var _this = this;
      let newMap = {};
      newMap= _this.state.usernames;
      newMap[username]=true;
      this.setState({usernames:newMap});
      console.log(_this.state.usernames);
      _this.forceUpdate();
    }

    searchUsers(){
      var _this = this;
      if(this.state.filters.length > 0){
        axios.get('http://localhost:8080/team/select',
                        {params: {filter: JSON.stringify(this.state.filters)}
                        }).then(function(response){
                          console.log(response.data);
                          _this.fillUsersTable(response.data);
                      }).catch(function(response){
                        console.log(response.error);
                      });
      }
    }
    sendUsers(){
      let usersMap = this.state.usernames;
      let selected = [];
      debugger
      for (let user in usersMap){
        if(usersMap[user]==true){
          selected.push(user);
        }
      }
      axios.post('http://localhost:8080/team/create', {
        ownerName: "valran",
        name: "iteam",
        members: selected
      }).then(function (response){
        console.log(response.status);
      }).catch(function(response){
        console.log(response.status);
      })
    }
    fillUsersTable(data){
      var _this = this;
      let us = [];
      let names={};
      debugger
      data.map(function(user,index){
        us.push(
          <tr key={us.length}>
            <td><input className="no-margin" type="checkbox" onChange={_this.handleOnChange.bind(_this, user.username)}></input></td>
            <td>{user.lastName}</td>
            <td>{user.name}</td>
          </tr>
        );
        names[user.username] = false;
      });
      this.setState({users: us});
      this.setState({usernames:names});
      this.forceUpdate();
    }



    render(){
      var filterLabels = this.state.filters.map(function(filter,index) {

            return (
              <span className="tag label label-info" style={{fontSize:14, margin:10, marginTop:50}}>
                <span key={index}>{filter.field} : {filter.values}</span>
                <a><i className="remove glyphicon glyphicon-remove-sign glyphicon-white" ></i></a>
              </span>
            );
          });
      return(
        <form className="form-horizontal">
  <div className={classes.title} >
  <h2>Team creation</h2>
  </div>
  <div className="row">
		<div className="form-horizontal">
			<div className={"form-group", classes.filter}>
				<div className="col-md-8">
					<div className="row">
						<label for="filterselect" className="col-md-2 control-label">Filters <i className="glyphicon glyphicon-filter "></i></label>
						<div className="col-md-3">
							<select className="form-control" id="filters" data-width="fit" data-live-search="true" ref="filterName" defaultvalue="Profession" >
								<option> Profession </option>
								<option> Age </option>
								<option> Nationality </option>
								<option> Job position </option>
								<option> Hobbies </option>
							</select>
						</div>
						<label for="inputvalue" className="col-md-2 control-label">Value</label>
						<div className="col-md-3">
							<input type="text" className="form-control" id="inputvalue" ref="filterValue"></input>
						</div>
						<div className="col-md-2">
							<button type="button" className="btn btn-primary"  onClick={this.handleClick.bind(this)}>
    					     <span className="glyphicon glyphicon-plus"></span> Add
							</button>
						</div>
					</div>
				</div>
		  </div>
			<div className="row">
				<div className="col-md-8" style={{marginTop:20}}>
					{filterLabels}
				</div>
			</div>
		</div>
	</div>
  <div className="row">
    <div className="col-md-1">
      <button type="button" className="btn btn-primary" style={{marginTop:30}} onClick={this.searchUsers.bind(this)}>
        <span className="glyphicon glyphicon-search"></span> Search
      </button>
    </div>
  </div>
	<div className="row">
    <div className="col-md-8">
		  <table className="table table-condensed table-striped table-bordered table-hover no-margin" style={{marginTop:20}} data-height="299" data-click-to-select="true">
        <thead>
            <tr>
              <th style={{"width": "5%"}}>
                <input className="no-margin" type="checkbox"></input>
              </th>
              <th style={{"width" : "45%" , "align":"center"}}>Last name</th>
              <th style={{"width" : "50%"}}>Name</th>
            </tr>
        </thead>
        <tbody>
        {this.state.users}
        </tbody>
		  </table>
      <div className="row">
      <button type="button" className="btn btn-primary" style={{marginTop:20}} onClick={this.sendUsers.bind(this)}>
        Create
      </button>
    </div>

    </div>
	</div>
</form>);
}


}
export default TeamSugestionForm

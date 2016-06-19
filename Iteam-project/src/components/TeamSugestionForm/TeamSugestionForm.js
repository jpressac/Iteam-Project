import React from 'react';
import classes from './TeamSugestionForm.scss'
import axios from 'axios'

class TeamSugestionForm extends React.Component {
    constructor(props){
      super(props);
      this.state= {
        filters: [],
      }
    }
    handleClick(){
      let valueFields = [];
      valueFields.push(this.refs.filterValue.value);
      this.state.filters.push({field: (this.refs.filterName.value).toLowerCase(), values: valueFields});
      console.log(this.state);
      this.forceUpdate();
    }

    searchUsers(){
      if(this.state.filters.length > 0){
        axios.get('http://localhost:8080/team/select',
                        {params: {filter: JSON.stringify(this.state.filters)}
                        }).then(function(response){
                          console.log(response.data);
                      }).catch(function(response){
                        console.log(response.error);
                      });
      }
    }

    render(){
      var filterLabels = this.state.filters.map(function(filter,index) {

            return (
              <span className="tag label label-info" style={{fontSize:14, margin:10, marginTop:20}}>
                <span key={index}>{filter.field} : {filter.values}</span>
                <a><i className="remove glyphicon glyphicon-remove-sign glyphicon-white" ></i></a>
              </span>
            );
          });
      return(<div className="container">
  <h2>Team creation</h2>
  <div className="row">
		<div className="form-horizontal">
			<div className="form-group">
				<div className="col-md-12">
					<div className="row">
						<label for="filterselect" className="col-md-2 control-label">Filters <i className="glyphicon glyphicon-filter "></i></label>
						<div className="col-md-2">
							<select className="form-control" id="filters" data-width="fit" data-live-search="true" ref="filterName" defaultvalue="Profession" >
								<option> Profession </option>
								<option> Age </option>
								<option> Nationality </option>
								<option> Job position </option>
								<option> Hobbies </option>
							</select>
						</div>
						<label for="inputvalue" className="col-md-2 control-label">Value</label>
						<div className="col-md-2">
							<input type="text" className="form-control" id="inputvalue" ref="filterValue"></input>
						</div>
						<div className="col-md-2">
							<button type="button" className="btn btn-primary" style={{marginTop:20}} onClick={this.handleClick.bind(this)}>
    					     <span className="glyphicon glyphicon-plus"></span> Add
							</button>
						</div>
					</div>
				</div>
		  </div>
			<div className="row">
				<div className="col-md-8">
					{filterLabels}
				</div>
			</div>
		</div>
	</div>
  <div className="row">
    <div className="col-md-2">
      <button type="button" className="btn btn-primary" style={{marginTop:20}} onClick={this.searchUsers.bind(this)}>
        <span className="glyphicon glyphicon-search"></span> Search
      </button>
    </div>
  </div>
	<div className="row">
    <div className="col-md-8">
		  <table className="table table-condensed table-striped table-bordered table-hover no-margin" data-url="data1.json" data-height="299" data-click-to-select="true">
        <thead>
            <tr>
              <th style={{"width": "5%"}}>
                <input className="no-margin" type="checkbox"></input>
              </th>
              <th style={{"width" : "45%"}}>Last name</th>
              <th style={{"width" : "50%"}}>Name</th>
            </tr>
        </thead>
        <tbody>

        </tbody>
		  </table>
    </div>
	</div>
</div>);
}


}
export default TeamSugestionForm

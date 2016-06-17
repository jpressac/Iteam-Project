import React from 'react';
import classes from './TeamSugestionForm.scss'
class TeamSugestionForm extends React.Component {
    constructor(props){
      super(props);
      this.state= {
        filters: [],
      }
    }
    handleClick(){
      this.state.filters.push({name: this.refs.filterName.value, value: this.refs.filterValue.value});
      console.log(this.state);
      this.forceUpdate();
    }



    render(){
      var filterLabels = this.state.filters.map(function(filter,index) {

            return (
              <span className="tag label label-info" style={{fontSize:14, margin:10, marginTop:20}}>
                <span key={index}>{filter.name} : {filter.value}</span>
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
    <div className="table-responsive">
		  <table className="table table-condensed table-striped table-bordered table-hover no-margin" data-url="data1.json" data-height="299" data-click-to-select="true">
        <thead>
            <tr>
              <th >
                <input className="no-margin" type="checkbox"></input>
              </th>
              <th >Last name</th>
              <th >Name</th>
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

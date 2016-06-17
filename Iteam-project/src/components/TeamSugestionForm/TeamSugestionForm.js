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
      return(
        <div className="container">
          <div className="row">
            <div className="col-md-8">
              <div className = "well well-lg">
                <div className="icon">
                  <h2>Filters <i className="glyphicon glyphicon-filter"></i></h2>
                </div>
                <select className="form-control selectPicker col-md-4" id="filters" data-width="fit" data-live-search="true" ref="filterName" defaultvalue="Profession" >
                  <option> Profession </option>
                  <option> Age </option>
                  <option> Nationality </option>
                  <option> Job position </option>
                  <option> Hobbies </option>
                </select>
                <h2>Value</h2>
                <input type="text" className="form-control" ref="filterValue"></input>
                <button type="button" className="btn btn-primary" style={{marginTop:20}} onClick={this.handleClick.bind(this)}>
                  <span className="glyphicon glyphicon-plus"></span> Add
                </button>
                <div>
                  {filterLabels}
                </div>
              </div>
            </div>
          </div>
          <div className="row">

          </div>
        </div>
      );
    }


}
export default TeamSugestionForm

/**
 * Created by Randanne on 29/10/2016.
 */
import React, {Component, PropTypes} from 'react';
import classes from './ReportForm.scss'
class Idea extends Component {

  constructor(props) {
    super(props);
  }

  renderReport =(type) =>  {
    switch (type) {
      case '1':
        return this.renderByTag();
        console.log(type);
            break;
      case '2':
        return this.renderByUser();
        console.log(type);
            break;
      case '3':
        return this.renderByRanking();
        console.log(type);
            break;
      default:
        return this.renderByRanking();
    }
};
  renderByTag = () => {
    return(
      <span>
        <div>
          <div>
        <label className={classes.title} >Tag: {this.props.tag}</label>
          </div>
        <p><label style={{fontSize:25}}>Title: {this.props.title}</label></p>
        <p><label style={{fontSize:'medium'}}>Content: {this.props.content}</label></p>
        <p><label style={{fontSize:'medium'}}>Ranking: {this.props.ranking}</label></p>
        <p><label style={{fontSize:'medium'}}>Author: {this.props.author}</label></p>
        <p><label style={{fontSize:'medium'}}>Comments:{this.props.comments}</label></p>
        <hr></hr>
          </div>
      </span> );
  };
  renderByRanking = () => {
    return(<span>

      <div>
          <div>
        <label className={classes.title} >Ranking: {this.props.ranking}</label>
          </div>
        <p><label style={{fontSize:25}}>Title: {this.props.title}</label></p>
        <p><label style={{fontSize:'medium'}}>Content: {this.props.content}</label></p>
        <p><label style={{fontSize:'medium'}}>Tag: {this.props.tag}</label></p>
        <p><label style={{fontSize:'medium'}}>Author: {this.props.author}</label></p>
        <p><label style={{fontSize:'medium'}}>Comments:{this.props.comments}</label></p>
        <hr></hr>
          </div>
        <hr></hr>
      </span> );
  };

  renderByUser = () => {
    return(<span>
            <div>
          <div>
        <label className={classes.title} >Author: {this.props.author}</label>
          </div>
        <p><label style={{fontSize:25}}>Title: {this.props.title}</label></p>
        <p><label style={{fontSize:'medium'}}>Content: {this.props.content}</label></p>
        <p><label style={{fontSize:'medium'}}>Tag: {this.props.tag}</label></p>
        <p><label style={{fontSize:'medium'}}>Ranking: {this.props.ranking}</label></p>
        <p><label style={{fontSize:'medium'}}>Comments:{this.props.comments}</label></p>
        <hr></hr>
          </div>
        <hr></hr>
      </span> );
  };

  render(){
  return(
    <div className="list">
      {this.renderReport(this.props.reportType)}
    </div>
  );
}
}

Idea.propTypes = {
  ranking:PropTypes.number,
  position: PropTypes.number,
  title: PropTypes.string,
  content: PropTypes.string,
  author: PropTypes.string,
  comments:PropTypes.string,
  tag:PropTypes.string,
  reportType: PropTypes.string
};

export default Idea;

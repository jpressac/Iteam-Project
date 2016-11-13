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
        <h1 className={classes.h1}>Tag: {this.props.tag}</h1>
        <h3>Title: {this.props.title}</h3>
        <h3>Content: {this.props.content}</h3>
        <h3>Ranking: {this.props.ranking}</h3>
        <h3>Author: {this.props.author}</h3>
        <h3>Comments:{this.props.comments}</h3>
        <hr></hr>
      </span> );
  };
  renderByRanking = () => {
    return(<span>
        <h1 className={classes.h1}>Ranking: {this.props.ranking}</h1>
        <h3>Title: {this.props.title}</h3>
        <h3>Tag: {this.props.tag}</h3>
        <h3>Content: {this.props.content}</h3>
        <h3>Author: {this.props.author}</h3>
        <h3>Comments:{this.props.comments}</h3>
        <hr></hr>
      </span> );
  };

  renderByUser = () => {
    return(<span>
        <h1 className={classes.h1}>Author: {this.props.author}</h1>
        <h3>Title: {this.props.title}</h3>
        <h3>Content: {this.props.content}</h3>
        <h3>Tag: {this.props.tag}</h3>
        <h3>Comments:{this.props.comments}</h3>
        <h3>Ranking: {this.props.ranking}</h3>
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

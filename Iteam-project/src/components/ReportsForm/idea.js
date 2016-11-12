/**
 * Created by Randanne on 29/10/2016.
 */
import React, {Component, PropTypes} from "react";

class Idea extends Component {

  constructor(props) {
    super(props);
  }

  render(){
  return(
    <div className="list">
      <span>
        <h1>{this.props.position}</h1>
        <h1>{this.props.title}</h1>
        <h3>Content: {this.props.content}</h3>
        <h3>Ranking: {this.props.ranking}</h3>
        <h3>Author: {this.props.author}</h3>
      </span>
    </div>
  );
}
}

Idea.propTypes = {
  ranking:PropTypes.number,
  position: PropTypes.number,
  title: PropTypes.string,
  content: PropTypes.string,
  author: PropTypes.string
};

export default Idea;

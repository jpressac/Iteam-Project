import React, {Component, PropTypes} from "react";
import {DropTarget} from "react-dnd";
import classes from "./scamperRender.scss";
import {ItemTypes} from "../../Constants/Constants";

class scamperRender extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}

  };

 

  render() {
    return (
      <div>
        <div className="row">
          <div className={classes.square}>
            <div className={classes.content}>
              <label className={classes.letter}>S </label>
              <label>(subtitute)</label>
            </div>
          </div>
          <div className={classes.square}>
            <div className={classes.content}>
              <label className={classes.letter}>C</label>
              <label>(combine)</label>
            </div>
          </div>
        </div>
        <div className="row">
          <div className={classes.squareMiddle}>
            <div className={classes.content}>
              <label className={classes.letter}>A </label>
              <label>(adapt)</label>
            </div>
          </div>
          <div className={classes.squareMiddle}>
            <div className={classes.content}>
              <label className={classes.letter}>M </label>
              <label>(modify)</label>
            </div>
          </div>
          <div className={classes.squareMiddle}>
            <div className={classes.content}>
              <label className={classes.letter}>P </label>
              <label>(put to other use)</label>
            </div>
          </div>
        </div>
        <div className="row">
          <div className={classes.square}>
            <div className={classes.content}>
              <label className={classes.letter}>E </label>
              <label>(eliminate)</label>
            </div>
          </div>
          <div className={classes.square}>
            <div className={classes.content}>
              <label className={classes.letter}>R </label>
              <label>(rearrange)</label>
            </div>
          </div>
        </div>
      </div>

    )

  }


}
;
export default scamperRender

// export default flow(
//   DropTarget(ItemTypes.NOTE, NoteTarget,
//     connection =>
//       ( {
//         connectDropTarget: connection.dropTarget()
//       }
//       )), connect(null, null))(scamperRender);

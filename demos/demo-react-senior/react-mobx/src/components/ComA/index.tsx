import * as React from "react";
import { observer } from "mobx-react";

import store from "../../store";

@observer
export default class ComA extends React.Component {
  render() {
    return <div>ComA: {store.username}</div>;
  }
}

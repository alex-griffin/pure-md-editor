import React, { Component } from 'react';
import Mousetrap from "mousetrap"

import CodeMirrorEditor from "./CodeMirrorEditor.js"

import keymaps from "../assets/js/codemirror/keymap/keymap.js"
import api from "../assets/js/api.js"


export default class Editor extends Component {
  constructor(props) {
    super(props);
    if(props.match.params.project !== "new") {
      this.state = {
        project: api.getProject(props.match.params.project),
      }
    }
    this.state = {
      project: api.getNewProject()
    }
  }
  componentWillMount() {
    keymaps.map((map) => {
      if(!map.cm) {
        console.log("hi from here");
        console.log(map.name);
        Mousetrap.bind(map.name, (e, c) => map.action(e, c, this.state))
      }
    })
  }
  handleCmChange(cm) {
    this.state.project.value = cm.getValue
  }
  render() {
    return (
      <div className="default-editor">
        <CodeMirrorEditor defaultValue={ this.state.project.value }
                          onChange={ this.handleCmChange.bind(this) }/>
      </div>
    )
  }
}

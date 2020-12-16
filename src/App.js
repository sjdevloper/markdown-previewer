import React from "react";
import './App.css';
import Badge from "react-bootstrap/Badge";


let marked = require("marked");
marked.setOptions({
  breaks: true,
});

const renderer = new marked.Renderer();
renderer.link = function (href, title, text) {
  return `<a target="_blank" href="${href}">${text}` + '</a>';
}

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      markdown: `
  # Welcome to my React Markdown Previewer!

## This is a sub-heading...
### And here's some other cool stuff:
  
Heres some code, \`<div></div>\`, between 2 backticks.

\`\`\`
// this is multi-line code:

function anotherExample(firstLine, lastLine) {
  if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
    return multiLineCode;
  }
}
\`\`\`
  
You can also make text **bold**... whoa!
Or _italic_.
Or... wait for it... **_both!_**
And feel free to go crazy ~~crossing stuff out~~.

There's also [links](https://www.freecodecamp.com), and
> Block Quotes!

And if you want to get really crazy, even tables:

Wild Header | Crazy Header | Another Header?
------------ | ------------- | ------------- 
Your content can | be here, and it | can be here....
And here. | Okay. | I think we get it.

- And of course there are lists.
  - Some are bulleted.
     - With different indentation levels.
        - That look like this.


1. And there are numbererd lists too.
1. Use just 1s if you want! 
1. But the list goes on...
- Even if you use dashes or asterisks.
* And last but not least, let's not forget embedded images:

![React Logo w/ Text](https://goo.gl/Umyytc)
      

  
       
    
      `,
      editorMaximized:false,
      previewMaximized:false
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleEditorMaximize = this.handleEditorMaximize.bind(this);
    this.handlePreviewMaximize = this.handlePreviewMaximize.bind(this);
  }

 handleChange(event) {
    this.setState({
      markdown: event.target.value
  });
}
 handleEditorMaximize() {
    this.setState({
      editorMaximized: !this.state.editorMaximized
    });
  }
  handlePreviewMaximize() {
    this.setState({
      previewMaximized: !this.state.previewMaximized
    });
  }

  render() {

    return (
      <div className="App">
        <div className="container">
          <div className="row mt-4">
            <div className="col text-center">
              <h1>
                {" "}
                <Badge className="text-align-center" variant="light">
                  Markdown Previewer
                </Badge>
              </h1>
            </div>
          </div>
          <div className="row mt-4">
            <div className="col text-center" style={{ padding: "10px" }}>
              <div style={{ marginLeft: "10px" }}></div>
              <a
                class="github-button"
                href="https://github.com/sjiang20/markdown-previewer"
                data-icon="octicon-star"
                data-size="large"
                aria-label="Project sjiang20/markdown-previewer on GitHub"
              >
                Github Project
              </a>
            </div>
          </div>

      <div className="row mt-4">
        <div className="col-md-6">
          <div className="editorWrap"> 
              <Toolbar
            onClick={this.handleEditorMaximize}
             text="Editor Input"/>
          <Editor markdown={this.state.markdown} 
            onChange={this.handleChange} />
        </div>
      </div>

          <div className="col-md-6">
            <div className="previewWrap">
              <Toolbar
            onClick={this.handlePreviewMaximize}
             text="Previewer"/>
          <Preview  markdown={this.state.markdown}
          onChange={this.handleChange} />
            </div>
        </div>
    </div>
  </div>
</div>
    );
  }
}

const Toolbar = (props) => {
    return (
      <div className="toolbar">
        <i title="no-stack-dub-sack" className="fa fa-free-code-camp"/>      
        {props.text}
        <i onClick={props.onClick} className={props.icon}></i>
      </div>
   )
}

const Editor = (props) => {
  return (
    <textarea id="editor"
      value={props.markdown}
      onChange={props.onChange}
      type="text"/>
    )
}

const Preview = (props) => {
  return (
      <div id='preview' dangerouslySetInnerHTML={{__html: marked(props.markdown, { renderer: renderer })}} />
    )
}
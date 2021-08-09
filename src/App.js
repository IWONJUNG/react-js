import React, { Component } from 'react';
import './App.css';

import ReadContent from './components/ReadContent';
import CreateContent from './components/CreateContent';
import UpdateContent from './components/UpdateContent';
import TOC from './components/TOC';
import Subject from './components/Subject';
import Control from './components/Control';



class App extends Component {
  constructor(props) { 
    super(props);
    this.max_content_id = 3;
    this.state = {
      mode:'welcome',
      selected_content_id:2,
      Subject: {title: 'WEB', sub:'World Wide Web!!!'},
      welcome:{title: 'welcome', desc:'Hello, React!'},
      Content: [
        {id:1, title:'HTML', desc:'HTML is HyperText...'},
        {id:2, title:'CSS', desc:'CSS is for design...'},
        {id:3, title:'JavaScript', desc:'JavaScript is for interactive...'},
      ]
    }
  }

  getReadContent() {
    let i = 0;
      while(i < this.state.Content.length) {
        let data = this.state.Content[i];
        if(data.id === this.state.selected_content_id) {
          return data;
          // break;
        }

        i++;
      }
  }

  getContent(){
    let _title, _desc, _article, _content = null;
    if(this.state.mode === 'welcome') {
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
      _article = <ReadContent title={_title} desc={_desc}></ReadContent>
    } else if(this.state.mode === 'read') {
     _content = this.getReadContent();

      _article = <ReadContent title={_content.title} desc={_content.desc}></ReadContent>
      
    } else if (this.state.mode === 'create') {
      _article = <CreateContent onSubmit={function(_title, _desc){
        this.max_content_id = this.max_content_id + 1;

        let _contents = Array.from(this.state.Content);
        _contents.push({id:this.max_content_id, title:_title, desc:_desc});
        this.setState({
          Content:_contents,
          mode:'read',
          selected_content_id:this.max_content_id
        });

      }.bind(this)}>  </CreateContent>

    } else if (this.state.mode === 'update') {
      _content = this.getReadContent();
      _article = <UpdateContent data={_content} onSubmit={
        function(_id, _title, _desc){
        let _contents = Array.from(this.state.Content);
        let i = 0;
        while(i < _contents.length) {
          if(_contents[i].id === _id) {
            _contents[i] = {id:_id, title:_title, desc:_desc}
            break;
          }
          i++;
        }
        this.setState({
          Content:_contents,
          mode:'read'
        });

      }.bind(this)}>  </UpdateContent>
    }
    return _article;
  }


  render() {

    return (
      <div className="App">
        <Subject 
          title={this.state.Subject.title} 
          sub={this.state.Subject.sub}
          onChangePage={function(){
            this.setState({mode:'welcome'});
          }.bind(this)}
          >
        </Subject>

        <TOC 
          onChangePage={function(id){
            this.setState({
              mode:'read',
              selected_content_id:Number(id)
            });
        }.bind(this)} 
        data={this.state.Content}
        ></TOC>

        <Control onChangeMode={function(_mode){
          if(_mode === 'delete') {
            if(window.confirm('삭제하시겠습니까?')) {
              let _contents = Array.from(this.state.Content);
              let i = 0;
              while(i < _contents.length) {
                if(_contents[i].id === this.state.selected_content_id) {
                  _contents.splice(i,1);
                  break;
                }
                i++;
              }
              this.setState({
                mode:'welcome',
                Content:_contents
              });
              alert('삭제되었습니다.');
            }
          } else {
            this.setState({
              mode:_mode
            });
          }
        }.bind(this)}></Control>

        {this.getContent()}
        
      </div>

    );
  }
}


export default App;

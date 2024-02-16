import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import GridComplexExample from './component/form';
import Ajouter from './component/Ajouter';
import Inscrit from './component/inscrit';
import { Component } from 'react';
class App extends Component{
  constructor(){
    super()
this.state ={
  showform:false,
  showHome:true
}
  this.showHome=this.showHome.bind(this)
  this.showform=this.showHome.bind(this)

  }
  showHome(){
   this.setState({showHome:true})
  }
  showForm(){
    this.setState({showForm:false})

  }
  render(){
  return (
    <div className="App">
      <Inscrit />
      <div>
        
      <GridComplexExample />
     
      </div>
     
     {this.state.showform===false? <div>
      <GridComplexExample showHome={this.showHome}/>
     
      </div>:<Ajouter showForm={this.showForm} />}
      
    </div>
    
  )};
}

export default App;

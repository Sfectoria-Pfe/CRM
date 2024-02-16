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
  async componentDidMount() {
    // axios
    //   .get("http://localhost:3000/data/data.json")
    //   .then((response) => {
    //     this.setState({data:response.data});
    //   })
    //   .catch((err) => console.log(err));

    try {
      await this.setState({isLoading:true})
      let response = await axios.get("http://localhost:3000/data/data.json");
      this.setState({ data: response.data,isLoading:false });
    } catch (err){
       console.log(err);
    }
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
      <div className="d-flex justify-content-center flex-wrap">
          {this.state.isLoading===true?<Spinner animation="border" variant="primary" />:this.state.data.map((elem, i) => (
            <Card style={{ width: "18rem" }} key={i}>
              <Card.Img variant="top" src={elem.imageURL} />
              <Card.Body>
                <Card.Title>{elem.productName}</Card.Title>
                <Card.Text>{elem.discription}</Card.Text>
                <Button variant="primary">Go somewhere</Button>
              </Card.Body>
            </Card>
          ))}
        </div>
      
    </div>
    
    
  )};
}

export default App;

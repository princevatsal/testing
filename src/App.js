import React ,{Component} from 'react'

const defaultStyle={
  color:'white'
}
class Aggregate extends Component{
  render(){
    return(
      <div style={{width:'50%',display:'inline-block'}}>
        <h2 style={defaultStyle}>Number Text</h2>
      </div>
    )
  }
}
class Filter extends Component{
  render(){
    return(
      <div style={{...defaultStyle,textAlign:'center',margin:'20px 5px'}}>
        <img/>
        <input type="text"/>
        Filter
      </div>
      )
  }
}

class Playlist extends Component{
render(){
  return(
  <div style={{color:'white',width:'25%',display:'inline-block'}}>
    <h3>playlist Name</h3>
    <ul>
      <li>Song 1</li>
      <li>Song 2</li>
      <li>Song 3</li>
    </ul>
  </div>
  )
}
}

class main extends Component{
  render(){
    return(
      <div style={{padding:'5px 70px'}}>
      <h1 style={{textAlign:'center',fontSize:'40px',color:'white'}}>Title</h1>
      <Aggregate/>
      <Aggregate/>
      <Filter/>
      <Playlist/>
      <Playlist/>
      <Playlist/>
      <Playlist/>
      </div>
      )
  }
}

export default main
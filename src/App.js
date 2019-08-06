import React ,{Component} from 'react'

const defaultStyle={
  color:'white'
}
const fakeServerData={
  user:{
    name:'Priyansh',
    playlists:[{
      name:'my favo',
      songs:[{name:'brazil',duration:1300},{name:'jattti',duration:1900},{name:'yarri',duration:2333}]
    },{
      name:'punajbi',
      songs:[{name:'kamli',duration:13000},{name:'jaan',duration:1100},{name:'pagol',duration:2033}]
    },
    {
      name:'old',
      songs:[{name:'pyar',duration:5000},{name:'aahsan',duration:1000},{name:'sanam',duration:6333}]
    },
    {
      name:'hiphop',
      songs:[{name:'Dj Wale Babu',duration:1000},{name:'mercy',duration:1400},{name:'braro',duration:1333}]
    }]
  }
}
class PlaylistCounter extends Component{
  render(){
    console.log('hello',this.props.playlists && this.props.playlists.length)
    return(
      <div style={{width:'50%',display:'inline-block'}}>
        <h2 style={defaultStyle}>{this.props.playlists.length} playlists</h2>
      </div>
    )
  }
}
class HoursCounter extends Component{
  render(){
    let allSongs=this.props.playlists.reduce((songs,eachPlaylist)=>{
      return songs.concat(eachPlaylist.songs)
    },[])
    let totaltime=allSongs.reduce((sum,item)=>{return sum+=item.duration
    },0)
    console.log('hello',this.props.playlists && this.props.playlists.length)
    return(
      <div style={{width:'50%',display:'inline-block'}}>
        <h2 style={defaultStyle}>{Math.round(totaltime/60)} Hours</h2>
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
  constructor(){
    super()
    this.state={serverData:{}}
  }
  componentDidMount(){
    setTimeout(()=>{this.setState({serverData:fakeServerData})},1000)
  }
  render(){
    return(
    <div>
    {this.state.serverData.user ? 
      <div style={{padding:'5px 70px'}}>
        <h1 style={{textAlign:'center',fontSize:'40px',color:'white'}}>{this.state.serverData.user.name }'s Playlist</h1>
        <PlaylistCounter playlists={this.state.serverData.user && this.state.serverData.user.playlists}/>
        <HoursCounter playlists={this.state.serverData.user && this.state.serverData.user.playlists}/>
        <Filter/>
        <Playlist/>
        <Playlist/>
        <Playlist/>
        <Playlist/>
      </div>:<h1 style={{color:'white',textAlign:'center'}}>'Loading...'</h1>
    }
    </div>
    )
  }
}

export default main
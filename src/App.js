import React ,{Component} from 'react'
import queryString from 'query-string'
const defaultStyle={
  color:'white'
}
class PlaylistCounter extends Component{
  render(){
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
        <input type="text" onKeyUp={event=>this.props.onTextChange(event.target.value)}/>
        Filter
      </div>
      )
  }
}

class Playlist extends Component{
render(){
  let playlist=this.props.playlist
  return(
  <div style={{color:'white',width:'25%',display:'inline-block'}}>
    <img src={playlist.imageUrl} style={{width:'160px'}} />
    <h3>{playlist.name}</h3>
    <ul style={{listStyleType:'none',paddingLeft:'0px'}}>
      {
        playlist.songs.map(song=><li>{song.name}</li>)
      }
    </ul>
  </div>
  )
}
}

class main extends Component{
  constructor(){
    super()
    this.state={serverData:{},filterString:''}
  }
  componentDidMount(){
    let parsed=queryString.parse(window.location.search)
    let acess_token=parsed.access_token
    if(!acess_token){
      return
    }
    fetch('https://api.spotify.com/v1/me/',
      {headers:{Authorization:' Bearer '+acess_token}})
        .then(response=>response.json())
          .then(data=>{
            this.setState({user:{name:data.display_name}})
          })
    fetch('https://api.spotify.com/v1/me/playlists',
      {headers:{Authorization:' Bearer '+acess_token}})
        .then(response=>response.json())
          .then(playlists=>{
            let promises=playlists.items.map(playlist=>{
              return fetch(playlist.tracks.href,
                {headers:{Authorization:' Bearer '+acess_token}})
                        .then(resp=>resp.json())
            })
            Promise.all(promises)
              .then(arrayofplaylists=>{
                  var songsbeaddedinplaylists=arrayofplaylists.map(playlist=>playlist.items.map(song=>({
                    name:song.track.name,
                    duration:song.track.duration_ms/1000
                  })))
                  let cool= playlists.items.map((playlist,i)=>{playlist.songs=songsbeaddedinplaylists[i];return playlist})
                  return cool
              }).then(data=>{
            this.setState({
                  playlists:data.map(playlist=>({name:playlist.name,songs:playlist.songs,imageUrl:playlist.images[0].url}))
                        })
           })
          })
          
  }
  render(){
    let playlisttorender=this.state.user && this.state.playlists
      ?this.state.playlists.filter(playlist=>
        playlist.name.toLowerCase().includes(this.state.filterString.toLowerCase()) || playlist.songs.reduce((check,song)=>song.name.toLowerCase().includes(this.state.filterString.toLowerCase())||check,false))
      :[]
    return(
    <div>
    {this.state.user ? 
      <div style={{padding:'5px 70px'}}>
        <h1 style={{textAlign:'center',fontSize:'40px',color:'white'}}>
            {this.state.user.name }'s Playlist
        </h1>
        <PlaylistCounter 
            playlists={playlisttorender}
        />
        <HoursCounter
          playlists={playlisttorender}
        />
        <Filter onTextChange={text=>{this.setState({filterString:text})}}/>
      
        {playlisttorender.map(playlist=><Playlist playlist={playlist}/>)}
      </div>:
        <button onClick={()=>
          {window.location= window.location.href.includes('localhost')?'http://localhost:8888/login':'https://myplaylist-backend.herokuapp.com/login'}} 
          style={
            {border:'none',
            fontSize:'20px',
            textAlign:'center',
            padding:'20px',
            background:'white',
            width:'300px',
            margin:' 5% 34%'}
          }>
          Sign With Spotify
        </button>
    }
    </div>
    )
  }
}

export default main
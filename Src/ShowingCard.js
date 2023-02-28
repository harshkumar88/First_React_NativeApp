import { StyleSheet, Text, View,FlatList,Image,TouchableOpacity,Dimensions } from 'react-native'
import React,{useEffect,useState} from 'react'
import axios from "axios"
import { useNavigation } from '@react-navigation/native';

let limit=1;
 const { Height } = Dimensions.get('window');

const ShowingCard = (props) => {
    
     const [skip,setSkip]=useState(0);
     const [item,setData]=useState([]);
     let Data=[];
    

    let loadMore=true;

    const navigation=useNavigation();
    
    const getMovie=async(genreId,page)=>{
        // console.log(skip);
        let query=`?skip=10&limit=${limit}`
        const data = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=e752948ae6a04102bfd8b96313f773dd&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&`+query+`page=1&with_genres=${genreId}&with_watch_monetization_types=flatrate`);
        const Otherdata = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=e752948ae6a04102bfd8b96313f773dd&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&`+query+`page=1&with_genres=${genreId}&with_watch_monetization_types=flatrate&with_original_language=hi`);
        //  console.log(data)
        let arr=data.data.results;
      
        if(data.data.length=0){
            loadMore=false;
        }
        for(let i of Otherdata.data.results){
            arr.push(i);
            
        }

        arr.sort(function(a, b){
            const date1 = new Date(a.release_date)
            const date2 = new Date(b.release_date)
            
            return date2 - date1;
        })
    //    console.log(arr.length)


        Data=arr;
        setData(Data.slice(0,10));
    }

    const getTV=async(genreId,page)=>{
        let query=`?skip=10&limit=${limit}`
        const data = await axios.get(`
        https://api.themoviedb.org/3/discover/tv?api_key=e752948ae6a04102bfd8b96313f773dd&language=en-US&sort_by=popularity.desc&page=2&timezone=America%2FNew_York&with_genres=${genreId}&include_null_first_air_dates=false&with_watch_monetization_types=flatrate&with_status=0&with_type=0`+query);
        const Otherdata = await axios.get(`
        https://api.themoviedb.org/3/discover/tv?api_key=e752948ae6a04102bfd8b96313f773dd&language=en-US&sort_by=popularity.desc&page=2&timezone=America%2FNew_York&with_genres=${genreId}&include_null_first_air_dates=false&with_watch_monetization_types=flatrate`+query+`&with_original_language=hi`);

        
        if(data.data.length=0){
            loadMore=false;
        }
        let arr=data.data.results;

        for(let i of Otherdata.data.results){
            arr.push(i);
            
        }

        arr.sort(function(a, b){
            const date1 = new Date(a.first_air_date)
            const date2 = new Date(b.first_air_date)
            
            return date2 - date1;
        })
       
        //  console.log(arr.length)

       Data=arr;
       setData(Data.slice(0,10));
        
    }
    useEffect(() => {
        if(props.type=="movie")
             getMovie(props.id,1);
        if(props.type=="tv"){
            getTV(props.id,1)
        }

        setSkip(1);
    },[])

    const GetDetails=(id)=>{
        console.log(id)
          navigation.navigate("Details",{ID:id,type:props.type})
    }

    const onEndReached=()=>{
         
        
        // Data=Data.slice(6,Data.length);
        

        // if(loadMore){
        //     if(props.type=="movie")
        //      getMovie(props.id,skip+1);
        //    if(props.type=="tv"){
        //     getTV(props.id,skip+1)
        //     }
        // }
        // setSkip(skip+1);
    }
  return (
    <View style={styles.outerCard} >
       <FlatList data={item} renderItem={({item})=>{
    //    console.log(item)
        return (
          <TouchableOpacity  onPress={()=>GetDetails(item.id)} >
            <View style={styles.card} >
            
            {item.poster_path!=null && item.poster_path!=""?<Image source={{uri:`https://www.themoviedb.org/t/p/w1280/${item.poster_path}`}} style={styles.poster}  alt={'No Image Available'} />
            :<Image source={{ uri: `https://i.ytimg.com/vi/245_u3OsrnE/maxresdefault.jpg` }} style={styles.poster} alt={'No Image Available'}/>}
                
                   <Text style={styles.textGenre}>{item.original_title==undefined?item.name.substring(0,25):item.title.substring(0,25) }</Text>
            </View>
            </TouchableOpacity>
        )
       }} horizontal={true} showsHorizontalScrollIndicator={false} onEndReached={onEndReached} style={styles.flexi}/>
    </View>
  )
}

const styles = StyleSheet.create({
    outerCard:{
          flex:1,
          height:Height
    },flexi:{
       flex:1
    },
    card:{
        height:240,
        width:150,
        margin:7,
        marginBottom:3,
        overflow:"hidden",borderRadius:10,cursor:"pointer"
    },textGenre:{
        color:"red",
        fontWeight:"bold",
    fontSize:15},
    poster:{
        height: 220,
        width:150,
        color:"white"
    }
})
export default ShowingCard


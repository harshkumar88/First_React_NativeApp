import { StyleSheet, Text, View,FlatList,Image } from 'react-native'
import React,{useEffect,useState} from 'react'
import axios from "axios"

const ShowingCard3 = ({cast}) => {
    const [data,setData]=useState([]);

    
    useEffect(()=>{
        setData(cast);
    
    },[])
  return (
    <View style={styles.outerCard}>
    
       <FlatList data={data} renderItem={({item})=>{
     
        return (
            <View style={styles.card}>
            
            {item.img!=null && item.img!=""?<Image source={{uri:`https://www.themoviedb.org/t/p/w1280/${item.img}`}} style={styles.poster}  alt={'No Image Available'}/>
            :<Image source={{ uri: `https://i.ytimg.com/vi/245_u3OsrnE/maxresdefault.jpg` }} style={styles.poster} alt={'No Image Available'} />}
                   <Text style={styles.name3}>{item.name}</Text>
            </View>
        )
       }}  showsHorizontalScrollIndicator={false} numColumns={3} style={styles.cardList}/>
    </View>
  )
}

const styles = StyleSheet.create({
    outerCard:{
          display:"flex",
          flexDirection:"row",
          overflow:"hidden",margin:"auto"
    },
    cardList:{
        display:"flex",
        flexDirection:"row",
        overflow:"hidden",flexWrap:"wrap",
        margin:"auto"
    },
    card:{
        height:200,
        width:100,
        margin:7,
        marginBottom:3,
        overflow:"hidden",borderRadius:10
    },textGenre:{
        color:"red",
        fontWeight:"bold",
    fontSize:15},
    poster:{
        height: 150,
        width:"auto",
        color:"white"
    },name3:{
        fontSize:20,color:"white",
        textAlign:"center"
    }
})
export default ShowingCard3


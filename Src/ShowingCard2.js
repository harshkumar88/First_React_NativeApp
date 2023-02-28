import { StyleSheet, Text, View,FlatList,Image,TouchableOpacity } from 'react-native'
import React,{useEffect,useState} from 'react'
import axios from "axios"
import { useNavigation } from '@react-navigation/native';

const ShowingCard2 = ({Similar,type}) => {
    const navigation=useNavigation();
    const [data,setData]=useState([]);
    let arr=[];
    useEffect(()=>{
           setData(Similar)
          
          
    },[])

    const GetDetails=(id)=>{
        // console.log(id,type)
        navigation.push("Details",{ID:id,type:type})
  }
  return (
    <View style={styles.outerCard}>
       <FlatList data={data} renderItem={({item})=>{
     
        return (
            <TouchableOpacity  onPress={()=>GetDetails(item.id)}>
            <View style={styles.card} >
                  {item.poster_path!=null && item.poster_path!="" ? <Image source={{uri:`https://www.themoviedb.org/t/p/w1280/${item.poster_path}`}} style={styles.poster}  alt={'No Image Available'}/>
                   :<Image source={{ uri: `https://i.ytimg.com/vi/245_u3OsrnE/maxresdefault.jpg` }} style={styles.poster} alt={'No Image Available'} />}
            </View>
            </TouchableOpacity>
        )
       }} horizontal={true} showsHorizontalScrollIndicator={false} vertical={false}/>
    </View>
  )
}

const styles = StyleSheet.create({
    outerCard:{
          display:"flex",
          flexDirection:"row",
          overflow:"hidden"
    },
    card:{
        height:240,
        width:150,
        margin:7,
        marginBottom:3,
        overflow:"hidden",borderRadius:10
    },textGenre:{
        color:"red",
        fontWeight:"bold",
    fontSize:15},
    poster:{
        height: 220,
        width:"auto",
        color:"white"
    }
})
export default ShowingCard2


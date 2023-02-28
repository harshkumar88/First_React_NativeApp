import { StyleSheet, Text, View,FlatList,Dimensions,ScrollView } from 'react-native'
import React,{useState} from 'react'
import { Moviesdata,TvData } from './Typesofmovies'
import ShowingCard from './ShowingCard'
import Nav from './Nav'
const { Height } = Dimensions.get('window');
const Movies = () => {

    const [scroll,setScroll]=useState(false);
    
    window.onscroll=(()=>{
        alert("ki")
    })
    return (
        <View style={styles.main}>
          {scroll==false?<Nav click="movies"/>:<View></View>}
            <View style={styles.moviecard}>
            
            <FlatList data={Moviesdata} 
            renderItem={({item})=>{
                return (
                    <View key={item.id}>
                       <Text  style={styles.NameofGenre}>{item.name} Movies</Text>
                       <ShowingCard genre={item.name} id={item.id} type="movie"/>
                    </View>
                )
            }}/>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    main:{
        backgroundColor:"black",    
        position:"relative"   
    },
    NameofGenre:{
        color:"white",
        fontWeight:"bold",
        fontSize:25,
        fontFamily:"inherit"
    },
    moviecard:{
        padding:6,
        marginBottom:15
    }
})
export default Movies


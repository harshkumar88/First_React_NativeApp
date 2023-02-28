import { StyleSheet, Text, View,FlatList } from 'react-native'
import React from 'react'
import { Moviesdata,TvData } from './Typesofmovies'
import ShowingCard from './ShowingCard'
import Nav from './Nav'

const Tv = () => {
    return (
        <View style={styles.main}>
           <Nav click="Tv"/>
            
            <View style={styles.moviecard}>
              
            <FlatList data={TvData} renderItem={({item})=>{
                return (
                    <View>
                    
                       <Text style={styles.NameofGenre}>{item.name} Tv</Text>
                       <ShowingCard genre={item.name} id={item.id} type="tv"/>
                    </View>
                )
            }}/>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    main:{
        backgroundColor:"black"
    },
    NameofGenre:{
        color:"white",
        fontWeight:"bold",
        fontSize:25,
        fontFamily:"inherit"
    },
    moviecard:{
        padding:6,
    }
})
export default Tv


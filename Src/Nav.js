import { StyleSheet, Text, View,TouchableOpacity,Image } from 'react-native'
import React,{useState,useEffect} from 'react'

import { useNavigation } from '@react-navigation/native';

const Nav = (props) => { 
    const val=props.click;
    const navigation=useNavigation();
    const [check,setCheck]=useState(1);

    useEffect(() => {
       if(val=='all')setCheck(1);
       else if(val=='movies')setCheck(2);
       else setCheck(3);
    }, [])

    const OpenPages=(val)=>{
        if(val=="Home"){
            navigation.navigate("Home");
            setCheck(1);
        }
        else if(val=="Movies"){
            navigation.navigate("Movies");
            setCheck(2);
        }
        else{
            navigation.navigate("Tv");
            setCheck(3);
        }
    }
    return (
        <View style={styles.navbar}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Movie<Text style={{ color: "red" }}>Q</Text></Text>
                <Text style={styles.headerText}>HARSH <Image source={{ uri: "https://th.bing.com/th/id/R.e04324c4c16de8ecfae1959194e89b5b?rik=WMWd0BXqfVYyow&riu=http%3a%2f%2fcdn.onlinewebfonts.com%2fsvg%2fimg_227643.png&ehk=P4zMEPJ5NQ9erjCrTStGhLW2S5hhsHxFY31p3xvWzEE%3d&risl=&pid=ImgRaw&r=0" }} style={styles.img} /></Text>
            </View>

            <View style={styles.slider}>
               {/* <TouchableOpacity onPress={()=>OpenPages("Home")}>{check==1?
                    <Text style={styles.Bgtext}>All</Text>:
                    <Text style={styles.headerText}>All</Text>}
               </TouchableOpacity>*/}
                <TouchableOpacity onPress={()=>OpenPages("Movies")}>{check==2?
                    <Text style={styles.Bgtext}>Movies</Text>
                    :<Text style={styles.headerText}>Movies</Text>}
                    </TouchableOpacity>
                <TouchableOpacity onPress={()=>OpenPages("Tv")}>{check==3?
                    <Text style={styles.Bgtext}>TV Shows</Text>:<Text style={styles.headerText}>
                    TV Shows</Text>}</TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
   
    header: {
        display: "flex",    
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 10,
        padding:20
    },slider:{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        marginTop: 10,
        padding:20,
        borderBottomWidth:2,
        borderBottomColor:"white",
        marginBottom:20
    },
    headerText:{
        fontSize:25,
        fontWeight:"bold",
        color:"white"
    },img:{
        width:20,
        height:20
    },
    Bgtext:{
        fontSize:25,
        fontWeight:"bold",
        color:"black",
        backgroundColor:"white",
        width:"auto",
        borderRadius:20,
        paddingBottom:10,
        paddingTop:5,
        paddingHorizontal:15
       
    }
})
export default Nav


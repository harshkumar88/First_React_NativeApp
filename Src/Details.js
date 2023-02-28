import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList,ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import Nav from './Nav'
import ShowingCard2 from './ShowingCard2'
import ShowingCard3 from './ShowingCard3'
import { Moviesdata, TvData } from './Typesofmovies'
import axios from 'axios'

const Details = (props) => {
    const [poster, setPoster] = useState("");
    const [title, setTitle] = useState("");
    const [desc, setOverview] = useState("");
    const [genre, setGenre] = useState("");
    const [date, setDate] = useState("");
    const [Cast, setCast] = useState([]);
    const [direct, setDirect] = useState({
        profile_path: ""
    });
    const [type, setType] = useState();
    const [set,setter]=useState(false);
    let CastInfo = [];
    let sim = [];
    const arr=[1];
    const getMovieDetails = async (id) => {
      
        const res = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=e752948ae6a04102bfd8b96313f773dd&append_to_response=credits`)
        const simres = await axios.get(`https://api.themoviedb.org/3/movie/${id}/similar?api_key=e752948ae6a04102bfd8b96313f773dd&language=en-US&page=1`)
        // const simres2=await axios.get(`https://api.themoviedb.org/3/movie/${id}/similar?api_key=e752948ae6a04102bfd8b96313f773dd&page=1&with_original_language=hi`)

        const data = res.data;
        const similar = simres.data.results;

        for (let i of similar) {
            // console.log(i)
            sim.push(i)
        }

        // for (let i of simres2.data.results){
        //     sim.push(i.poster_path);
        // }


        // console.log(simres2.data.results)

        for (var i = sim.length - 1; i > 0; i--) {

            // Generate random number
            var j = Math.floor(Math.random() * (i + 1));

            var temp = sim[i];
            sim[i] = sim[j];
            sim[j] = temp;
        }




        setPoster(data.poster_path);
        setTitle(data.title);
        setOverview(data.overview);

        let genre = "";

        for (let i of data.genres) {
            genre = genre + i.name + " | ";
        }

        genre = genre.substring(0, genre.length - 3);
        setGenre(genre);
        setDate(data.release_date);

        const credit = data.credits;



        for (let i of credit.cast) {

            if (CastInfo.length == 9) break;
            CastInfo.push({
                name: i.original_name
                , img: i.profile_path
            })
        }

        for (let i of credit.crew) {
            if (i.job == "Director" && i.profile_path != null) {
                setDirect(i);
                break;
            }
            else if (i.job == "Director") {
                setDirect(i);
            }
            else if (i.job == "Producer" && i.profile_path != null) {
                setDirect(i);
                break;
            }
            else {
                if (i.profile_path != null) {
                    setDirect(i);
                }
            }

        }


        setCast(CastInfo);

        if(sim.length>0){
            setter(true);
        }
       


    }

    const getTVDetails = async (id) => {

        const res = await axios.get(`https://api.themoviedb.org/3/tv/${id}?api_key=e752948ae6a04102bfd8b96313f773dd&append_to_response=credits`)
        const simres = await axios.get(`https://api.themoviedb.org/3/tv/${id}/similar?api_key=e752948ae6a04102bfd8b96313f773dd&language=en-US&page=1`)
        // const simres2=await axios.get(`https://api.themoviedb.org/3/movie/${id}/similar?api_key=e752948ae6a04102bfd8b96313f773dd&page=1&with_original_language=hi`)
        //  console.log(res)
        const data = res.data;
        const similar = simres.data.results;
        // console.log(simres)
        for (let i of similar) {
            // console.log(i)
            sim.push(i)
        }

        // for (let i of simres2.data.results){
        //     sim.push(i.poster_path);
        // }


        // console.log(simres2.data.results)

        for (var i = sim.length - 1; i > 0; i--) {

            // Generate random number
            var j = Math.floor(Math.random() * (i + 1));

            var temp = sim[i];
            sim[i] = sim[j];
            sim[j] = temp;
        }




        setPoster(data.poster_path);
        setTitle(data.title);
        setOverview(data.overview);

        let genre = "";

        for (let i of data.genres) {
            genre = genre + i.name + " | ";
        }

        genre = genre.substring(0, genre.length - 3);
        setGenre(genre);
        setDate(data.release_date);

        const credit = data.credits;



        for (let i of credit.cast) {

            if (CastInfo.length == 9) break;
            CastInfo.push({
                name: i.original_name
                , img: i.profile_path
            })
        }

        for (let i of credit.crew) {
            if (i.job == "Director" && i.profile_path != null) {
                setDirect(i);
                break;
            }
            else if (i.job == "Director") {
                setDirect(i);
            }
            else if (i.job == "Producer" && i.profile_path != null) {
                setDirect(i);
                break;
            }
            else {
                if (i.profile_path != null) {
                    setDirect(i);
                }
            }

        }


        setCast(CastInfo);
        console.log(sim.length)
        if(sim.length>0){
            setter(true);
        }
        


    }
    useEffect(() => {
        if (props.route.params.type == 'movie')
            getMovieDetails(props.route.params.ID);

        else {
            getTVDetails(props.route.params.ID)
        }

        setType(props.route.params.type)
    }, [])
    return (
        <FlatList data={arr} renderItem={()=>{
            return (
          
        <View style={[styles.outerColor,{ flex: 1 }]} contentContainerStyle={{ flexGrow: 1 }} >
            <View style={styles.upperDetails}><Image source={{ uri: `https://www.themoviedb.org/t/p/w1280/${poster}` }} style={styles.posterImage} resizeMode="contain" /></View>

            <View style={styles.completeDetails}>

                <Text style={styles.name}>{title}</Text>

                <TouchableOpacity style={styles.watch}><Text style={styles.watchText}>Watch Now</Text></TouchableOpacity>
                <View style={styles.btnContainer}>

                    <View style={styles.btn}>
                        <TouchableOpacity><Image source={{ uri: "https://cdn-icons-png.flaticon.com/512/3747/3747096.png" }} style={styles.btnImage} /></TouchableOpacity>
                        <Text style={styles.textColor}>Trailer</Text>
                    </View>

                    <View style={styles.btn}>
                        <TouchableOpacity><Image source={{ uri: "https://webstockreview.net/images/play-icon-png-1.png" }} style={styles.btnImage} /></TouchableOpacity>
                        <Text style={styles.textColor}>Watchlist</Text>
                    </View>

                    <View style={styles.btn}>
                        <TouchableOpacity><Image source={{ uri: "https://webstockreview.net/images/play-icon-png-1.png" }} style={styles.btnImage} /></TouchableOpacity>
                        <Text style={styles.textColor}>More</Text>
                    </View>

                </View>


            </View>

            <View style={styles.descOuter}>
                <Text style={styles.desc}>{desc}</Text>

                <Text style={[styles.desc, { marginTop: 5 }]}>{genre}</Text>

                <Text style={styles.rating}>IMDb 6.0</Text>
                <Text style={styles.rating}>{date}</Text>
            </View>
            
                    <View style={styles.relate}>
                        <Text style={styles.Related}>Related</Text>
                    </View>
                   
                    {sim.length>0 || set==true?
                    <Text style={styles.Related1}>Customers also watched</Text>
                    :<Text style={{marginBottom:5,marginTop:2}}></Text>}

                    <View style={styles.moviecard}>

                        <ShowingCard2 Similar={sim} type={type} />

                    </View>
                
                

            <Text style={[styles.Related1, { marginTop: 2 }]}>Cast & Crew</Text>
            <Text style={[styles.rating, { marginLeft: 15, fontWeight: "bold" }]}>Details from TMDb</Text>

            <View style={[styles.moviecard, { borderBottomColor: "white", borderBottomWidth: 2 }]}>

                <ShowingCard3 cast={CastInfo} />

            </View>

            <View style={[styles.director, { marginTop: 10 }]}>

                <View style={styles.card}>

                    {direct.profile_path != null && direct.profile_path != "" ? <Image source={{ uri: `https://www.themoviedb.org/t/p/w1280/${direct.profile_path}` }} style={styles.poster} alt={'No Image Available'} />
                        : <Image source={{ uri: `https://i.ytimg.com/vi/245_u3OsrnE/maxresdefault.jpg` }} style={styles.poster} alt={'No Image Available'} />}
                    <Text style={styles.name3}>{direct.name}</Text>
                </View>

                <View style={styles.directTxt}>
                    <Text style={{ color: "white", fontWeight: "bold", marginBottom: 6, fontSize: 20 }}>{direct.job}</Text>
                    <Text style={{ color: "#D3D3D3" }}>{desc.substring(0, 50)} is {direct.job}ed by {direct.name} </Text>
                </View>

            </View>
            </View>
                  
            )
        }}
           />
    )
}

const styles = StyleSheet.create({
    outerColor: {
        backgroundColor: 'black',
        alignSelf:'baseline',
        display:"flex"
    },
    upperDetails: {
        height: 350, paddingHorizontal: 8,marginTop:5
    }, posterImage: {
        width: "auto",
        height: 350
    }, completeDetails: {
        marginTop: '1%'
    },
    watch: {
        width: 350,
        backgroundColor: "white",
        margin: "auto",
        paddingVertical: 7, textAlign: "center",
        borderRadius: 15,
        marginTop: 12, marginBottom: 13
    },
    watchText: {
        fontSize: 20
    },
    name: {
        color: "white",
        fontSize: 30,
        width: 350,
        textAlign: "justify",
        margin: "auto",
        paddingHorizontal: 2
    }, btnContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly",
        width: 350,
        margin: "auto"
    },
    btnImage: {
        width: 50, height: 20,
        backgroundColor: "white",
        color: "white",
        borderColor: "white",
        margin: 'auto'
    },
    textColor: {
        color: "white",
        fontSize: 20,
        marginTop: 20
    }, desc: {
        color: "white", fontSize: 22,
        textAlign: "justify", fontFamily: "serif", marginBottom: 5
    }, descOuter: {
        // backgroundColor:"red",
        marginTop: 7,
        padding: 9
    }, rating: {
        marginTop: 4,
        fontSize: 20, color: "#D3D3D3"
    }, Related: {
        color: "white",
        fontSize: 25, fontWeight: "bold",
        textAlign: "justify", margin: "auto"
    }, relate: {
        borderBottomWidth: 2,
        borderBottomColor: "white",
        marginBottom: 6
    }, Related1: {
        color: 'white',
        marginLeft: 15, fontSize: 25, fontWeight: "bold"
    }, NameofGenre: {
        color: "white",
        fontWeight: "bold",
        fontSize: 25,
        fontFamily: "inherit"
    },
    moviecard: {
        padding: 6
    }, card: {
        height: 300,
        width: 100,
        margin: 7,
        marginBottom: 3,
        overflow: "hidden", borderRadius: 10
    }, poster: {
        height: 130,
        width: "auto",
        color: "white"
    }, name3: {
        fontSize: 20, color: "white",
        textAlign: "center"
    }, director: {
        padding: 8,
        display: "flex",
        flexDirection: "row", margin: "auto",
    }, directTxt: {
        width: 200, marginLeft: 4
    }
})
export default Details


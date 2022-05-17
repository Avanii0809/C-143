import React, { Component } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Header, AirbnbRating, Icon } from "react-native-elements";
import { RFValue } from "react-native-responsive-fontsize";
import axios from "axios";

export default class HomeScreen extends Component {
  constructor() {
    super();
    this.state = {
      movieDetails: {}
    };
  }

  componentDidMount() {
    this.getMovie();
  }

  timeConvert(num){
    var hours = Math.floor(num/60)
    var minute = num%60
    return`${hours}hrs ${minutes}mins`
  }
getMovies =()=>{
  const url ="http://localhost:5000/get-movie"
  axios 
  .get(url )
  .then (response =>{
    let details =response .data.data 
    details ["duration"] =this.timeConvert(details .duration )
    this.setState({
      movieDetails: details
    })
  })
  .catch (error=>{
    console.log(error.message)
  })
}
likedMovies=() =>{
  const url ="http://localhost:5000/get-movie"
  axios 
  .get(url )
  .then (response =>{
    this.getMovie()
  })
  .catch (error=>{
    console.log(error.message)
  })
}

unlikedMovies=() =>{
  const url ="http://localhost:5000/get-movie"
  axios 
  .get(url )
  .then (response =>{
    this.getMovie()
  
  })
  .catch (error=>{
    console.log(error.message)
  })
}
notWatched=() =>{
  const url ="http://localhost:5000/get-movie"
  axios 
  .get(url )
  .then (response =>{
    this.getMovie()
  })
  .catch (error=>{
    console.log(error.message)
  })
}

render(){
  const{movieDetails} = this.state
  if(movieDetails.poster_link){
    const {
      poster_link,
      title,
      release_date,
      duation,
      overview,
      rating
    }=movieDetails

    return(
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Header
          centreComponent = {{
            text:"movie recommended",
            style :styles.headerTitle 
          }}
          rightComponent = {{item:"search", color:"white"}}
          backgroundColor = {"blue"}
          containerStyle = {{flex:1}}
      />
        </View>
        <View style = {styles.subContainer}>
          <View style = {styles.subTopContainer}>
            <Image style={styles.posterImage} source = {{uri:poster_link}}/>
          </View>
          <View style ={styles.upperBottomContainer}>
            <View style={styles.subBottomContainer}>
              <Text style={styles.title}>{title}</Text>
              <Text style={styles.subtitle}>
              {`${
                  release_date.split("-")[0]
                } | ${duration}`}
              </Text>
            </View>
           <View style={styles.middleBottomContainer}>
              <View style={{flex:0.3}}>
                <AirbnbRating
                count = {10}
                reviews = {["", "", "", "", "", ""]}
                defaultRating ={rating }
                isDisabled = {True}
                size = {RFValue(25)}
                starContainerStyle ={{marginTop:-30}}
                />
              </View>

              <View style ={{flex:0.7, padding :15}}>
              <Text style={styles.overview}>{overview}</Text>
            </View>
            </View>
            <View style={styles.lowerBottomContainer}>
                <View style={styles.iconButtonContainer}>
            <TouchableOpacity onpress={this.likedMovie}>
              <Icon
              reverse
              name = {"checked"}
              type = {"entypo"}
              size = {RFValue(30)}
              color = {"red"}
              />
            </TouchableOpacity>

            <TouchableOpacity onpress={this.unlikedMovie}>
              <Icon
              reverse
              name = {"checked"}
              type = {"entypo"}
              size = {RFValue(30)}
              color = {"red"}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.buttonCotainer}>
            <TouchableOpacity
            style={styles.button}
            onPress={this.notWatched}>
              <Text style  ={styles.buttonText}>did not watch</Text>
            </TouchableOpacity>
          </View>
        </View>
        </View>
        </View>
        
      </View>
    )
 
  }
  return null 
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  headerContainer: {
    flex: 0.1
  },
  headerTitle: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: RFValue(18)
  },
  subContainer: {
    flex: 0.9
  },
  subTopContainer: {
    flex: 0.4,
    justifyContent: "center",
    alignItems: "center"
  },
  posterImage: {
    width: "60%",
    height: "90%",
    resizeMode: "stretch",
    borderRadius: RFValue(30),
    marginHorizontal: RFValue(10)
  },
  subBottomContainer: {
    flex: 0.6
  },
  upperBottomContainer: {
    flex: 0.2,
    alignItems: "center"
  },
  title: {
    fontSize: RFValue(20),
    fontWeight: "bold",
    textAlign: "center"
  },
  subtitle: {
    fontSize: RFValue(14),
    fontWeight: "300"
  },
  middleBottomContainer: {
    flex: 0.35
  },
  overview: {
    fontSize: RFValue(13),
    textAlign: "center",
    fontWeight: "300",
    color: "gray"
  },
  lowerBottomContainer: {
    flex: 0.45
  },
  iconButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center"
  },
  buttonCotainer: {
    justifyContent: "center",
    alignItems: "center"
  },
  button: {
    width: RFValue(160),
    height: RFValue(50),
    borderRadius: RFValue(20),
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    marginTop: RFValue(15)
  },
  buttonText: {
    fontSize: RFValue(15),
    fontWeight: "bold"
  }
});

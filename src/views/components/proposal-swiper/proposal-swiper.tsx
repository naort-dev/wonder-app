import _ from "lodash";
import React from "react";
import { DeckSwiper } from "native-base";
import { Text, Title, WonderImage, SubTitle, IconButton } from "../theme";
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Dimensions,
  Animated,
  Modal,
  TouchableHighlight
} from "react-native";

import moment from "moment-timezone";
import Icon from "react-native-vector-icons/Entypo";

import Images from "src/assets/images";

import LinearGradient from "react-native-linear-gradient";
import Wonder from "../theme/wonder/wonder";
import Proposal from "src/models/proposal";
import ProfileImage from "src/models/profile-image";
import Topic from "src/models/topic";
import Candidate from "src/models/candidate";

import VideoPlayer from "react-native-video-player";
import theme from "src/assets/styles/theme";

import validator from "validator";
import googleMaps, { GoogleGeoLocation } from "../../../services/google-maps";

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;
interface Props {
  proposal: Proposal | null;
  onSwipeLeft: Function;
  onSwipeRight: Function;
}

interface CardDetailsOverlayProps {
  candidate: Candidate;
}

interface CardDetailsOverlayState {
  showDetails: boolean;
  animation: Animated.Value;
  contentHeight: number;
}

class CardDetailsOverlay extends React.Component<
  CardDetailsOverlayProps,
  CardDetailsOverlayState
> {
  state = {
    contentHeight: 0,
    showDetails: false,
    imageCount: 0,
    showVideoPlayer: false,
    location: "",
    animation: new Animated.Value(0)
  };

  componentDidMount() {
    this.lookupZipcode();
  }

  lookupZipcode = async () => {
    const { zipcode } = this.props.candidate;
    const geolocation: GoogleGeoLocation = await googleMaps.geocodeByZipCode(
      zipcode
    );
    this.setState({ location: `${geolocation.city}, ${geolocation.state}` });
  };

  toggleDetails = () => {
    const showDetails = !this.state.showDetails;
    const { contentHeight } = this.state;
    const fromValue = showDetails ? 0 : contentHeight;
    const toValue = showDetails ? contentHeight : 0;
    this.state.animation.setValue(fromValue);
    Animated.timing(this.state.animation, {
      toValue,
      duration: 100
    }).start();
    this.setState({ showDetails });
  };

  getTopics = () => {
    const { candidate, currentUser } = this.props;
    const candidateTopics = candidate.topics;
    const userTopics = currentUser.topics;

    return (
      <View style={{ flexDirection: "row" }}>
        {candidate &&
          candidateTopics.map(x => {
            if (userTopics) {
              if (userTopics.find(i => i.name === x.name)) {
                return (
                  <Wonder key={x.name} topic={x} size={60} active={true} />
                );
              } else {
                return (
                  <Wonder key={x.name} topic={x} size={60} active={false} />
                );
              }
            }
          })}
      </View>
    );
  };

  getNextPhoto = () => {
    const { candidate } = this.props;
    const { imageCount } = this.state;

    if (imageCount < candidate.images.length - 1) {
      this.setState({ imageCount: this.state.imageCount + 1 });
    } else {
      this.setState({ imageCount: 0 });
    }
  };

  render() {
    const { showDetails } = this.state;
    const { candidate, currentUser } = this.props;
    const details = (
      <React.Fragment>
        <Text color="#FFF">
          {candidate.occupation}
          {"\n"}
          {candidate.school}
        </Text>
        {!!candidate.about && <Text color="#FFF">{candidate.about}</Text>}
      </React.Fragment>
    );

    return (
      <TouchableWithoutFeedback
        style={styles.cardOverlayContainer}
        onPress={() => this.getNextPhoto()}
      >
        <WonderImage
          background
          uri={_.get(candidate, "images[0].url", Images.WELCOME)}
          style={styles.container}
        >
          <View style={{ alignSelf: "flex-end", padding: 10 }}>
            <View style={{ alignItems: "center" }}>
              {candidate.images.map((c, i) => (
                <View
                  key={i}
                  style={{
                    opacity: i === this.state.imageCount ? 1 : 0.2,
                    height: 9,
                    width: 9,
                    borderRadius: 4.5,
                    backgroundColor:
                      i === this.state.imageCount
                        ? theme.colors.primary
                        : theme.colors.textColorLight,
                    margin: 3
                  }}
                />
              ))}
            </View>
            {candidate.video && (
              <TouchableHighlight
                style={{ alignItems: "center", margin: 4 }}
                onPress={() => this.setState({ showVideoPlayer: true })}
              >
                <Icon
                  size={20}
                  name={"video-camera"}
                  color={theme.colors.textColor}
                />
              </TouchableHighlight>
            )}
          </View>
          <LinearGradient
            style={styles.textContainer}
            colors={["transparent", "rgb(0,0,0)"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            // locations={[0, 0.3]}
          >
            <View flex={1}>
              <Title style={{ fontSize: 24 }} color="#FFF">
                {[
                  candidate.first_name,
                  moment().diff(candidate.birthdate, "years")
                ].join(", ")}
              </Title>
              <SubTitle style={{ fontSize: 16 }} color="#FFF">
                {this.state.location && this.state.location}
              </SubTitle>
              <View>{this.getTopics()}</View>
              <Animated.View style={{ height: this.state.animation }}>
                {details}
              </Animated.View>
              <View
                style={{ position: "absolute", bottom: -deviceHeight }}
                onLayout={(event: any) =>
                  this.setState({
                    contentHeight: event.nativeEvent.layout.height
                  })
                }
              >
                {details}
              </View>
            </View>
            <View style={{ justifyContent: "flex-end" }}>
              <IconButton
                size={44}
                icon={showDetails ? "chevron-down" : "chevron-up"}
                onPress={this.toggleDetails}
                primary="#FFF"
                secondary="transparent"
              />
            </View>
          </LinearGradient>
          <Modal
            animationType="slide"
            transparent={false}
            visible={this.state.showVideoPlayer}
            onRequestClose={() => console.log("yo")}
          >
            <View style={{ flex: 1 }}>
              <View>
                <VideoPlayer
                  customStyles={{
                    wrapper: {
                      flex: 1
                    }
                  }}
                  videoHeight={deviceHeight}
                  videoWidth={deviceWidth}
                  pauseOnPress
                  disableFullscreen={true}
                  autoplay
                  video={{
                    uri: `https://api.getwonderapp.com${candidate.video}`
                  }}
                />
                <LinearGradient
                  style={{ height: 80, alignItems: "flex-end", paddingTop: 20 }}
                  colors={["black", "transparent"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 0, y: 1 }}
                >
                  <IconButton
                    size={54}
                    icon={"close"}
                    onPress={() => this.setState({ showVideoPlayer: false })}
                    primary={theme.colors.primaryLight}
                    secondary="transparent"
                  />
                </LinearGradient>
              </View>
            </View>
          </Modal>
        </WonderImage>
      </TouchableWithoutFeedback>
    );
  }
}

class ProposalSwiper extends React.Component<Props> {
  renderProfileImage = (images?: ProfileImage[]) => {
    if (images && images.length) {
      return (
        <View style={styles.noImageContainer}>
          <WonderImage
            style={{ width: "100%", height: "100%" }}
            uri={images[0].url}
            resizeMode="cover"
          />
        </View>
      );
    } else {
      return (
        <View style={styles.noImageContainer}>
          <Icon name="user" color="#CCC" size={100} />
        </View>
      );
    }
  };

  renderCard = (proposal: Proposal) => (
    <CardDetailsOverlay
      candidate={proposal.candidate}
      currentUser={this.props.currentUser}
    />
  );

  render() {
    const { proposal, onSwipeLeft, onSwipeRight } = this.props;
    const data = [proposal];
    // TODO: prefetch one more proposal
    if (proposal) {
      return (
        <DeckSwiper
          onSwipeLeft={onSwipeLeft}
          onSwipeRight={onSwipeRight}
          dataSource={data}
          renderItem={this.renderCard}
        />
      );
    } else {
      return (
        <View style={styles.noMatchesContainer}>
          <Title style={[styles.messageText, styles.titleText]}>
            Looks like you&apos;re out of people...
          </Title>
          <Text style={styles.messageText}>Check back soon!</Text>
        </View>
      );
    }
  }
}

export default ProposalSwiper;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#EEE",
    justifyContent: "space-between",
    height: Dimensions.get("window").height - 60
  },
  textContainer: {
    padding: 20,
    flexDirection: "row"
  },
  noMatchesContainer: {
    padding: 20,
    flex: 1,
    backgroundColor: "#EEE",
    justifyContent: "center"
  },
  titleText: {
    fontSize: 24
  },
  messageText: {
    textAlign: "center"
  },
  noImageContainer: {
    flex: 1,
    height: 300,
    backgroundColor: "#EEE",
    justifyContent: "center",
    alignItems: "center"
  },
  cardOverlayContainer: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  }
});

// {candidate.topics &&
//   candidate.topics.map((topic: Topic) => (
//     <Wonder key={topic.name} topic={topic} size={60} active={false} />
//   ))}

{
  /* <WonderImage</WonderImage></WonderImage>
          background
          uri={_.get(
            candidate,
            `images[${this.state.imageCount}].url`,
            Images.WELCOME
          )}
          style={styles.container}
        > */
}

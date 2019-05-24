import React, {Component} from 'react';
import {
    ActivityIndicator,
    Alert,
    Image,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    Platform,
    ScrollView
} from 'react-native';
import styles from './AddPostScreenStyle'
import {createNewPost} from "../../../store/addpost";
import connect from "react-redux/es/connect/connect";
import ImagePicker from 'react-native-image-picker';
import img from '../../../assets/ic_chat_black_48dp.png'
import TagInput from 'react-native-tag-input';

const options = {
    title: 'Select Avatar',
    storageOptions: {
        skipBackup: true,
        path: 'images',

    },
};
const inputProps = {
    keyboardType: 'default',
    placeholder: '# Tags',
    autoFocus: true,
    style: {
        fontSize: 14,
        marginVertical: Platform.OS == 'ios' ? 10 : -2,
    },
};

const horizontalInputProps = {
    keyboardType: 'default',
    returnKeyType: 'search',
    placeholder: 'Search',
    style: {
        fontSize: 14,
        marginVertical: Platform.OS == 'ios' ? 10 : -2,
    },
};

const horizontalScrollViewProps = {
    horizontal: true,
    showsHorizontalScrollIndicator: false,
};

class AddPostScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            avatarSource: null,
            whatis: '',
            whyis: '',
            location: 'current location',
            tags: [],
            text: "",
            horizontalTags: [],
            horizontalText: "",
        }
    }


    componentDidMount(): void {

        this.setState({message: JSON.stringify(this.props.navigation.getParam('data'))})
    }

    _sendPost() {

        if (this.state.message === '') {
            Alert.alert("Empty", "Feild can not be blank")
            return;
        } else {
            const request = {
                title: this.state.message,
                body: 'Body',
                userId: 1
            };
            this.props.createNewPost(request)
            this.setState({message: ''})

        }
    }

    _pickImage() {
        /**
         * The first arg is the options object for customization (it can also be null or omitted for default options),
         * The second arg is the callback which sends object: response (more info in the API Reference)
         */
        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                const source = {uri: response.uri};

                // You can also display the image using data:
                // const source = { uri: 'data:image/jpeg;base64,' + response.data };

                this.setState({
                    avatarSource: source,
                });
            }
        });
    }


    onChangeTags = (tags) => {
        this.setState({tags});
    }

    onChangeText = (text) => {
        this.setState({text});

        const lastTyped = text.charAt(text.length - 1);
        const parseWhen = [',', ' ', ';', '\n'];

        if (parseWhen.indexOf(lastTyped) > -1) {
            this.setState({
                tags: [...this.state.tags, this.state.text],
                text: "",
            });
        }
    }

    labelExtractor = (tag) => tag;

    onChangeHorizontalTags = (horizontalTags) => {
        this.setState({
            horizontalTags,
        });
    };

    onChangeHorizontalText = (horizontalText) => {
        this.setState({horizontalText});

        const lastTyped = horizontalText.charAt(horizontalText.length - 1);
        const parseWhen = [',', ' ', ';', '\n'];

        if (parseWhen.indexOf(lastTyped) > -1) {
            this.setState({
                horizontalTags: [...this.state.horizontalTags, this.state.horizontalText],
                horizontalText: "",
            });
            this._horizontalTagInput.scrollToEnd();
        }
    }


    render() {
        return (
            <ScrollView style={{backgroundColor: '#ffffff',}}>
                <View style={styles.container}>
                    <Text style={styles.textTitle}>{'CREATE POST'}</Text>

                    <View style={styles.line}/>

                    <Image style={styles.userImage}
                           source={this.state.avatarSource}/>
                    {this.props.isLoading &&
                    <ActivityIndicator size="large" style={styles.progressView}/>
                    }
                    <TouchableOpacity
                        onPress={() => {
                            this._pickImage()
                        }}>
                        <Text style={{alignSelf: 'center', color: '#000', fontSize: 18}}>{'Pick Image'}</Text>
                    </TouchableOpacity>

                    <View style={styles.viewInRow}>

                        <Image source={img} style={styles.image}/>
                        <TextInput
                            style={{width: '90%'}}
                            placeholder={'What is..'}
                            value={this.state.whatis}
                            onChangeText={(text) => this.setState({whatis: text})}
                        />
                    </View>
                    <View style={styles.line}/>

                    <View style={styles.viewInRow}>

                        <Image source={img} style={styles.image}/>
                        {/*<TextInput*/}
                        {/*style={{width: '90%'}}*/}
                        {/*placeholder={'Whay is..'}*/}
                        {/*value={this.state.whyis}*/}
                        {/*onChangeText={(text) => this.setState({whyis: text})}*/}
                        {/*/>*/}

                        <TagInput
                            value={this.state.tags}
                            onChange={this.onChangeTags}
                            labelExtractor={this.labelExtractor}
                            text={this.state.text}
                            onChangeText={this.onChangeText}
                            tagColor="blue"
                            tagTextColor="white"
                            inputProps={inputProps}
                            maxHeight={75}
                        />
                    </View>
                    <View style={styles.line}/>


                    <View style={styles.viewInRow}>

                        <Image source={img} style={styles.image}/>
                        <TextInput
                            style={{width: '90%'}}
                            placeholder={'Location'}
                            value={this.state.location}
                            onChangeText={(text) => this.setState({location: text})}
                        />
                    </View>
                    <View style={styles.line}/>


                    <TouchableOpacity
                        style={styles.buttonStyle}
                        onPress={() => {
                            alert("New Post Created")
                        }}>
                        <Text style={styles.buttonText}>{'ADD POST'}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.buttonStyle}
                        onPress={() => {
                            const {navigate} = this.props.navigation;
                            navigate('PostListScreen');

                        }}>
                        <Text style={styles.buttonText}>{'POST LIST'}</Text>
                    </TouchableOpacity>

                </View></ScrollView>

        );
    }
}

const mapActionCreators = {
    createNewPost
};

const mapStateToProps = state => {

    return {
        isLoading: state.addpost.loading,
        data: state.addpost.data,
        message: state.addpost.message
    };
};
export default connect(mapStateToProps, mapActionCreators)(AddPostScreen);

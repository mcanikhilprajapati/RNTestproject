import React, {Component} from 'react';
import {ActivityIndicator, Text, View, FlatList, TouchableOpacity} from 'react-native';
import styles from './PostlistScreenStyle'
import connect from "react-redux/es/connect/connect";

class PostlistScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [{id: 1, title: 'title', isSelect: false},
                {id: 2, title: 'title', isSelect: false},
                {id: 3, title: 'title', isSelect: false},
                {id: 4, title: 'title', isSelect: false},
                {id: 5, title: 'title', isSelect: false},
                {id: 6, title: 'title', isSelect: false},
                {id: 7, title: 'title', isSelect: false},
                {id: 8, title: 'title', isSelect: false},
                {id: 9, title: 'title', isSelect: false}],
            selectdata: []
        }
    }

    selectItem = data => {
        data.item.isSelect = !data.item.isSelect;

        const index = this.state.data.findIndex(
            item => data.item.id === item.id
        );
        this.state.data[index] = data.item;
        this.setState({
            data: this.state.data,
        });
    };

    renderItem = (data) =>
        <TouchableOpacity
            onPress={() => {
                this.selectItem(data)
            }}
        >
            <Text
                style={{padding: 15, color: '#000'}}>  {data.item.title + ' ' + data.item.id}  </Text>

            {data.item.isSelect && <View style={styles.selectedMark}/>}
        </TouchableOpacity>;


    FlatListItemSeparator = () => <View style={styles.line}/>;

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.textTitle}>{'POST SELECTION LIST'}</Text>

                <View style={styles.line}/>

                <TouchableOpacity
                    style={styles.buttonStyle}
                    onPress={() => {

                        this.setState({selectdata: []},
                            ()=>{

                                for (let i = 0; i < this.state.data.length; i++) {
                                    if (this.state.data[i].isSelect ===true)
                                        this.state.selectdata.push(this.state.data[i])
                                }



                                alert(JSON.stringify(this.state.selectdata))
                            })


                    }}>
                    <Text style={styles.buttonText}>{'SHOW SELECTED ITEMS'}</Text>
                </TouchableOpacity>
                <FlatList
                    data={this.state.data}
                    ItemSeparatorComponent={this.FlatListItemSeparator}
                    keyExtractor={item => item.id.toString()}
                    extraData={this.state}
                    renderItem={item => this.renderItem(item)}/>


            </View>

        );
    }
}

const mapActionCreators = {};

const mapStateToProps = state => {
    return {
        isLoading: state.postlist.loading,
        data: state.postlist.data,
        message: state.postlist.message
    };
};
export default connect(mapStateToProps, mapActionCreators)(PostlistScreen);

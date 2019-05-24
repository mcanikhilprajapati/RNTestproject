import React from 'react';
import {StyleSheet} from 'react-native';


const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: '#ffffff',
            borderColor: '#d0d0d0',

        },
        progressContainer: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#ffffff', padding: 25
        },
        cardView: {
            padding: 10,
            margin: 5,
            backgroundColor: '#ffffff',
            borderColor: '#d0d0d0',
            borderWidth: 0.5,
            elevation: 5

        },
        shadow: {
            backgroundColor: '#2E9298',
            borderRadius: 10,
            padding: 10,
            shadowColor: '#000000',
            shadowOffset: {
                width: 0,
                height: 3
            },
            shadowRadius: 5,
            shadowOpacity: 1.0
        }
        ,

        imageContainer:
            {
                flex: 1,
                alignItems:
                    'center',
                marginBottom:
                    10,
                justifyContent:
                    'center',
                backgroundColor:
                    '#ffffff',
            }
        ,

        image: {
            height: 30,
            width: 30,
            alignSelf: 'center'
        },
        textTitle: {
            color: '#000000',
            fontWeight: 'bold',
            textAlign: 'center',
            padding: 15
        }
        ,
        text: {
            color: '#000000',
            fontWeight:
                'bold',
            padding:
                5
        },
        line: {
            backgroundColor: '#d0d0d0',
            height: 1
        },
        bottomiew: {
            position: 'absolute',
            bottom: 10,
            left: 10,
        },
        chatInput: {width: '77%', borderColor: '#d0d0d0', borderWidth: 1, margin: 3},
        innerChat: {flexDirection: 'row', flex: 1},
        userImage: {
            height: 200,
            width: 200,
            alignSelf: 'center',
            borderColor: '#8f8f8f',
            borderWidth: 0.5,
            borderRadius: 10,
            margin: 10
        },
        viewInRow: {
            flexDirection: 'row',
            padding: 10
        }, buttonStyle: {
            width: 250,
            backgroundColor: '#3bb7ff',
            borderRadius: 20,
            margin: 15,
            alignSelf: 'center'

        }, buttonText: {
            alignSelf: 'center', color: '#fff', fontSize: 14, padding: 5
        }
    })
;


export default styles;

import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import Fire from '../Fire';

class Chat extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: (props.route.params || {}).name || 'Chat!',
    });

    constructor(props) {
        super(props);
        this.state = {
            messages: []
        };
    }

    componentDidMount() {
        Fire.shared.on(
            message => this.setState(previousState => ({
                messages: GiftedChat.append(previousState.messages, message),
            }))
        );
    }

    componentWillUnmount() {
        Fire.shared.off();
    }

    get user() {
        return {
            name: this.props.route.params.name,
            _id: Fire.shared.uid,
        };
    }
    
    render() {
        return (
            <GiftedChat
                messages={this.state.messages}
                onSend={Fire.shared.send}
                user={this.user}
            />
        );
    }
}

const styles = StyleSheet.create({});

export default Chat;

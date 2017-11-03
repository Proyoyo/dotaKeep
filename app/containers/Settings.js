import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    AsyncStorage
} from 'react-native';

import { connect } from 'react-redux';

import { bindActionCreators } from 'redux';
import * as settingsActions from '../actions/settings_act';
import { Actions } from 'react-native-router-flux';

import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import _ from 'lodash';

import Colors from '../themes/Colors';
import base from '../themes/BaseStyles';
import Fonts from '../themes/Fonts';

export const mapStateToProps = state => ({
    alpha: state.settingsState.alpha,
    mod: state.settingsState.mod,
    legend: state.settingsState.legend,
    secondLegend: state.settingsState.secondLegend,
    theme: state.settingsState.theme,
    tracker: state.navigationState.tracker
});

export const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(settingsActions, dispatch)
});

class Settings extends Component {

    constructor(props) {
        super(props);
        this.onThemeSelected = this.onThemeSelected.bind(this);
        this.setTheme = this.setTheme.bind(this);
        this.radio_props = [
            {label: 'OpenDota', value: 1},
            {label: 'Sky Dolch', value: 2},
            {label: 'Hyperfuse', value: 3},
            {label: 'Invisibility', value: 4},
            {label: 'Double Damage', value: 6}
        ];
    }

    componentDidMount() {
        this.props.tracker.trackScreenView('Settings');
    }

    onThemeSelected(value) {
        AsyncStorage.setItem("theme", value.toString());
        this.setTheme(value);
    }

    setTheme(value) {
        if (value === 1) {
            this.props.tracker.trackEvent('Theme Selected', 'OpenDota');
        } else if (value === 2) {
            this.props.tracker.trackEvent('Theme Selected', 'Sky Dolch');
        } else if (value === 3) {
            this.props.tracker.trackEvent('Theme Selected', 'Hyperfuse');
        } else if (value === 4) {
            this.props.tracker.trackEvent('Theme Selected', 'Invisibility');
        } else if (value === 6) {
            this.props.tracker.trackEvent('Theme Selected', 'Double Damage');
        }
        this.setState({theme: value});
        this.props.actions.changeTheme(value);
    }

    componentWillMount() {

    }

    render() {
        //BUG:0 Selected does not get rendered if it's a variable. Probably problem with library?
        return (
            <View style = {styles.container}>
                <KeyboardAwareScrollView>
                    <View style = {[styles.settingsItemContainer, {backgroundColor: this.props.mod}]}>
                        <View style = {styles.settingsTitle}>
                            <Text style = {[styles.settingsTitleText, { color: this.props.legend}]}>Themes</Text>
                            <RadioForm
                                radio_props = {this.radio_props}
                                initial = {this.props.theme}
                                onPress = {this.onThemeSelected}
                                />
                        </View>
                    </View>
                </KeyboardAwareScrollView>
            </View>
        )
    }
}

const baseStyles = _.extend(base.general, {
    settingsItemContainer: {
        flex: 1,
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10,
        borderRadius: 3
    },
    settingsTitle: {
        padding: 10
    },
    settingsTitleText: {
        fontFamily: Fonts.base,
        fontSize: 18,
        fontWeight: 'bold'
    }

});
const styles = StyleSheet.create(baseStyles);

export default connect(mapStateToProps, mapDispatchToProps)(Settings);

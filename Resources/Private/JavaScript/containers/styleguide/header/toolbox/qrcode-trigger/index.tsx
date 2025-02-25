import * as React from "react";
import { PureComponent } from "react";
import {connect} from "react-redux";

import Button from "@neos-project/react-ui-components/lib-esm/Button";
import Icon from "@neos-project/react-ui-components/lib-esm/Icon";

import { actions } from "../../../../../state";

import style from "./style.css";

interface QrCodeTriggerProps {
    toggle: () => void
}

class QrCodeTriggerC extends PureComponent<QrCodeTriggerProps> {
    handleToggle = () => {
        const { toggle } = this.props;

        toggle();
    }

    render() {
        return (
            <Button className={style.selector} onClick={this.handleToggle} style="clean">
                <Icon icon="qrcode" className={style.icon}/>
            </Button>
        );
    }
}

export const QrCodeTrigger = connect(() => ({}), {
    toggle: actions.qrcode.toggle
})(QrCodeTriggerC);

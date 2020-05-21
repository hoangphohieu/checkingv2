import React, { Component } from 'react';

class names extends Component {
    submit = () => {
        let endPoint = "?name=user"+this.refs["name"].value.trim() + "&pass="+this.refs["pass"].value.trim();
        this.props.getUse(endPoint);
        localStorage.setItem("SumOrderHome", JSON.stringify([]));
        // console.log(endPoint);

    }
    render() {
        return (
            <React.Fragment>
                <div className="wrapper fadeInDown">
                    <div id="formContent">
                        {/* Tabs Titles */}
                        {/* Icon */}

                        {/* Login Form */}
                        <form>
                            <input type="text" id="login" className="fadeIn second" name="login" placeholder="login" ref="name" />
                            <input type="text" id="password" className="fadeIn third" name="login" placeholder="password" ref="pass" />
                            <br />
                            <button type="button" className="btn btn-info" onClick={this.submit}>Submit</button>
                        </form>
                        {/* Remind Passowrd */}
                        <div id="formFooter">
                            <a className="underlineHover" href="#">Forgot Password?</a>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default names;
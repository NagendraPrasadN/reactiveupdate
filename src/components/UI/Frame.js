import classes from './Frame.module.css';

const Frame = (props) => {
    return (<div className={classes.frame}>
        {props.children}
    </div>);
}

export default Frame;
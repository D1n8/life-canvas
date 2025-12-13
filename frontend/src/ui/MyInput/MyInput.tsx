import * as React from 'react';
import cl from './MyInput.module.css'

function MyInput({...props}) {
    return ( <input type="text" {...props} className={cl.myInput}/> );
}

export default MyInput;
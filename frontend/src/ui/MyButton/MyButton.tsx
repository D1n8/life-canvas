import * as React from 'react';
import cl from './MyButton.module.css'

interface IMyButonProps extends React.HTMLAttributes<HTMLButtonElement>{
    children: React.ReactNode
}
function MyButton({children, ...props}: IMyButonProps) {
    return ( <button {...props} className={cl.myBtn}>{children}</button> );
}

export default MyButton;
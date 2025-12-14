import * as React from 'react';
import cl from './MyButton.module.css'

interface IMyButonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>{
    children: React.ReactNode
}
function MyButton({children, ...props}: IMyButonProps) {
    const {className, ...restProps} = props
    return ( <button {...restProps} className={cl.myBtn + ' ' + className}>{children}</button> );
}

export default MyButton;
import cl from './TextBox.module.css'

interface ITextBoxProps extends React.HTMLAttributes<HTMLDivElement>{
    children: React.ReactNode
}

function TextBox({children, ...props}: ITextBoxProps) {
    const {className, ...restProps} = props
    return ( 
        <div {...restProps} className={cl.textBox + ' ' + className}>
            {children}
        </div>
     );
}

export default TextBox;
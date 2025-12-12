import cl from './TextBox.module.css'

interface ITextBoxProps extends React.HTMLAttributes<HTMLDivElement>{
    children: React.ReactNode
}

function TextBox({children, ...props}: ITextBoxProps) {
    return ( 
        <div {...props} className={cl.textBox}>
            <p>{children}</p>
        </div>
     );
}

export default TextBox;
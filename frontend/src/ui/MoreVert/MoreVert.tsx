import * as React from 'react';
import cl from './MoreVert.module.css'

interface IMoreVertProps {
    setOpen: () => void;
}

const MoreVert = React.forwardRef<SVGSVGElement, IMoreVertProps>(({setOpen}, ref) => {
    return (
        <svg
            ref={ref}
            className={cl.moreVert}
            onClick={() => setOpen()}
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="#d9d9d9"
        >
            <circle cx="12" cy="5" r="2" />
            <circle cx="12" cy="12" r="2" />
            <circle cx="12" cy="19" r="2" />
        </svg>
    );
})

export default MoreVert;

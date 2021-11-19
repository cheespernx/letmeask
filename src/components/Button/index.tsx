import { ButtonHTMLAttributes } from 'react';

import './styles.scss';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    isOutlined?: boolean;
    isDanger?: boolean;
};

export function Button({ isOutlined = false, isDanger = false, ...props }: ButtonProps){
    return (
        <button 
            className={`button ${isOutlined ? 'outlined' : ''} ${isDanger ? 'danger' : ''}`}
            {...props} 
        /> 
    )
}
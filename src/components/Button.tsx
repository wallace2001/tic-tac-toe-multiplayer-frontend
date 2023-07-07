import { cn } from "@/lib/utils";
import { IconType } from "react-icons";

interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>
{
    label: string;
    onClick(e: React.MouseEvent<HTMLButtonElement>): void;
    disabled?: boolean;
    outline?: boolean;
    small?: boolean;
    icon?: IconType;
}

const Button: React.FC<ButtonProps> = ({
    label,
    disabled,
    outline,
    small,
    onClick,
    icon: Icon,
    ...rest
}) => {
    return ( 
        <button onClick={onClick} disabled={disabled} className={cn(
            `
            relative
            disabled:opacity-70
            disabled:cursor-not-allowed
            rounded-lg
            hover:opacity-80
            transition
            w-full
            ${outline ? 'bg-black' : 'bg-cyan-900'}
            ${outline ? 'border-white' : 'border-cyan-900'}
            ${outline ? 'text-white' : 'text-white'}
            ${small ? 'py-1' : 'py-3'}
            ${small ? 'text-sm' : 'text-md'}
            ${small ? 'font-light' : 'font-semibold'}
            ${small ? 'border-[1px]' : 'border-2'}
        `,
        rest.className
        )}>
            {Icon && (
                <Icon
                    className="
                        absolute
                        left-4
                        top-3
                    " 
                    size={24} 
                />
            )}
            {label}
        </button>
     );
}
 
export default Button;
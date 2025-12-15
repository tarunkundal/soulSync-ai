import { Loader2 } from 'lucide-react'

interface SpinnerProps {
    isFullPage?: boolean
    text?: string
}

export const Spinner = ({ isFullPage, text, ...props }: SpinnerProps) => {
    return (
        <div className={`h-full w-full flex justify-center items-center ${isFullPage ? 'h-screen' : ''}`}>
            <Loader2 className="animate-spin text-primary " />
            {text && <span className="ml-2 text-secondary-foreground">{text}</span>}
        </div>
    )
}
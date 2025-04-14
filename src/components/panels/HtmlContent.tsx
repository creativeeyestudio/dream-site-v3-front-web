import React from 'react';

interface HtmlContentProps {
    htmlContent: string;
}

const HtmlContent: React.FC<HtmlContentProps> = (content: HtmlContentProps) => {
    return(
        <>
            {content.htmlContent}
        </>
    )
}

export default HtmlContent;
import React from 'react';

interface HtmlContentProps {
    htmlContent: string;
}

const HtmlContent: React.FC<HtmlContentProps> = (content: HtmlContentProps) => {
    return(
        <>
        <div dangerouslySetInnerHTML={{ __html: content.htmlContent }}></div>
        </>
    )
}

export default HtmlContent;
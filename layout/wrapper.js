function wrapLayout(metadata) {
    const {
        title = "Spencer Carver's Info",
        description = "Spencer Carver's personal website. Details about his hobbies, skills, and interests, as well as contact information.",
        siteName = "Spencer.Carvers.info",
        siteUrl = "https://spencer.carvers.info",
        twitterHandle = "@spencerrc"
    } = metadata;

    return `<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="height=device-height, 
                      width=device-width, initial-scale=1.0, 
                      minimum-scale=1.0, maximum-scale=5.0, 
                      target-densitydpi=device-dpi">
        <meta name="theme-color" content="#000000">
        <link rel="manifest" href="%PUBLIC_URL%/manifest.json">
        <link rel="shortcut icon" href="%PUBLIC_URL%/favicon.ico">
        <link href="https://fonts.googleapis.com/css?family=Lato&display=swap" rel="stylesheet">
        <!--
            Notice the use of %PUBLIC_URL% in the tags above.
            It will be replaced with the URL of the 'public' folder during the build.
            Only files inside the 'public' folder can be referenced from the HTML.

            Unlike "/favicon.ico" or "favicon.ico", "%PUBLIC_URL%/favicon.ico" will
            work correctly both with client-side routing and a non-root public URL.
            Learn how to configure a non-root public URL by running 'npm run build'.
        -->
        <title>${ title }</title>
        <link rel="canonical" href="${ siteUrl }">
        <meta name="description" content="${ description }">
        <meta name="homepage" content="true">
        <meta name="referrer" content="unsafe-url">
        <meta name="referrer" content="always">
        <meta property="og:site_name" content="${ siteName }">
        <meta property="og:type" content="website">
        <meta property="og:description" content="${ description }">
        <meta property="og:title" content="${ siteName }">
        <meta property="og:url" content="${ siteUrl }">
        <meta property="og:image" content="${ siteUrl }/seo.jpg">
        <meta name="twitter:card" content="summary_large_image">
        <meta name="twitter:site" content="${ twitterHandle }">
        <meta name="twitter:description" content="${ description }">
        <meta name="twitter:title" content="${ siteName }">
        <meta name="twitter:image" content="${ siteUrl }/seo.jpg">
    </head>
    <body>
        <div id="root"></div>
    </body>
</html>`;
}

module.exports = wrapLayout;
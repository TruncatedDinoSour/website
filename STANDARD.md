# ari-web standard

this document describes how ari-web is built, what rules
it follows and what standard it practices

-   folder structure
    -   api
        -   1 API route
            -   e.g. <https://blog.ari-web.xyz/blog.json>, you can make the request to
                that route and thats all, hashing of it works basically the same,
                but wtihout `/api/` -- <https://blog.ari-web.xyz/blog_json_hash.txt>
        -   \>1 API route
            -   use `/api` directory for APIs based on JSON if you have multiple ones
            -   `/api/*.json` is any API route
            -   `/api` purely should return a redirect to a JSON file in `/api` containing
                an index of all API routes
            -   `/api_hash/*_json_hash.txt` where wildcard is api route name returns a sha256 sum
                of that specific route
    -   `/content/`
        -   content includes all your content
            -   `img` -- images
            -   `js` -- javascript
            -   `styles` / `css` -- CSS ( or SCSS )
            -   `etc` -- other content
    -   `/favicons/`
        -   this directory should purely be on the parent level domain, e.g. `ari-web.xyz`,
            this should include all of your favicons and its versions / revisions you might
            use
    -   `/page/`
        -   this should include all of your pages
        -   this directory should purely include directories and text files
            use directories for pages and text files for pages that dont make
            use of html ( e.g. <https://ari-web.xyz/page/minimal.txt>, otherwise
            you should have a subdirectory and in it you should have an `index.html`
            file, e.g. <https://ari-web.xyz/page/info/index.html>, which compresses
            into <https://ari-web.xyz/page/info/>
    -   `/index.html`
        -   as per HTTP this is just your home page -- `/`, you should not put it in
            `/page/`, this should be in the root level directory
    -   `/robots.txt` and `/sitemap.xml`
        -   these once again should follow general format of robots and sitemap,
            although this should purely be on the parent-level domain
    -   `/manifest.json`
        -   this is your site manifest, you should have it
    -   \*see redirects for all `parent-level` points
-   licensing
    -   all of your code must be free and open source under a shareable license
    -   id suggest your license to be accessible through your site
-   redirects
    -   `/404.html` must be a redirect to `/page/404/index.html`
    -   `/favicon.ico` should be a redirect to one of your favicons in the `/favicons/` directory
    -   `/git` should redirect to the source code on the website, preferably on git
    -   `/git/*` should also be redirected into the source code but with the splat appended to it
    -   `/*` should redirect to `/page/*` if `/*` does not exist
    -   `/*` should 'redirect' to `/page/404/index.html` with status code `404` if `/*` nor `/page/*` exists
-   content
    -   content should preferably should be minified at build time on the build server
        rather than in the source code, source code should be readable for a human reader
    -   all minified content should link to the source code through a human-readable comment
        in the source code, for example HTML -- `<!-- source code @ /git -->` or similar
    -   your content should strive to be accessible for all people of different abilities,
        for example, try if possible make it easy for blind readers, A11Y
    -   your content should strive to be portable for all browsers that have at least
        a couple hundred users
-   markup
    -   use semantic markup
    -   use JS licensing
    -   dont force JS on people, explain why you need it if its disabled
    -   all `script`s must be placed in the `head` element, use `defer` attribute
    -   make sure to specify `lang` attribute in your `html`
    -   escape all html-unsafe characters with escapes
    -   make sure to use `charset`, `X-UA-Compatible` and `viewport` meta tags
        to make it easy for people
        -   `<meta charset="UTF-8" />`
        -   `<meta http-equiv="X-UA-Compatible" content="IE=edge" />`
        -   `<meta name="viewport" content="width=device-width, initial-scale=1.0" />`
    -   make sure to link to your `robots.txt` using the `meta` tag and `manifest.json`
        using `link`
    -   `og:type` should have a defined value preferably
    -   `color-scheme` and `theme-color` should also preferably be defined
-   textual content
    -   dates : `yyyy/mm/dd` for dates `yyyy-mm-dd` for timestamps

# changelog

-   `2023-03-18` -- init

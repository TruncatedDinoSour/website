<h1 align="center">Website</h1>

<p align="center">
  <img src="https://img.shields.io/github/last-commit/TruncatedDinosour/website?color=red&style=flat-square">
  <img src="https://img.shields.io/github/repo-size/TruncatedDinosour/website?color=red&style=flat-square">
  <img src="https://img.shields.io/github/issues/TruncatedDinosour/website?color=red&style=flat-square">
  <img src="https://img.shields.io/github/stars/TruncatedDinosour/website?color=red&style=flat-square">
</p>

<p align="center">
    <a href="https://app.netlify.com/sites/ari-web/deploys">
        <img alt="Netlify Status" src="https://api.netlify.com/api/v1/badges/4ac67547-6444-4c67-9a54-c7f8fb28427b/deploy-status"/>
    </a>
</p>

### [My website's](https://www.ari-web.xyz/) source code.

# Customising when self-hosting

1. Clone the repository: `git clone https://ari-web.xyz/git ari-web`
2. Enter the directory: `cd ari-web`
3. See the `/content/styles/config` and `/content/js/config` directories.
4. Open it in live server: `python3 -m http.server 5500`
5. Go to http://0.0.0.0:5500/ in your browser
6. Edit all stuff that is `ARI-WEB-SPECIFIC` in [netlify.toml](/netlify.toml)
7. Publish on [netlify](https://netlify.com/)

# Subdomains

-   https://www.ari-web.xyz/ (source: https://ari-web.xyz/git)
-   https://files.ari-web.xyz/ (source: https://files.ari-web.xyz/git)
-   https://blog.ari-web.xyz/ (source: https://blog.ari-web.xyz/git)
-   https://tcl.ari-web.xyz/ (source: https://tcl.ari-web.xyz/filetree.html (Due to size limitations of git services I cannot publish it on any git))
-   https://legacy.blog.ari-web.xyz/ (source: https://legacy.blog.ari-web.xyz/git)
-   https://school.ari-web.xyz/ (source: proprietary (I don't want people snooping on my homework lol))

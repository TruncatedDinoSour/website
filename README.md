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

1. Clone the repository: `git clone https://github.com/TruncatedDinosour/website`
2. Enter the directory: `cd website`
3. Install python dependencies: `python3 -m pip install -r requirements.txt`
4. See the `/content/styles/config` and `/content/js/config` directories.
5. Open it in live server: `python3 -m http.server 5500`
6. Go to http://0.0.0.0:5500/ in your browser
7. Edit all stuff that is `ARI-WEB-SPECIFIC` in [netlify.toml](/netlify.toml)
8. Publish

# Subdomains

-   https://www.ari-web.xyz/ (source: https://ari-web.xyz/git)
-   https://files.ari-web.xyz/ (source: https://files.ari-web.xyz/git)
-   https://blog.ari-web.xyz/ (source: https://blog.ari-web.xyz/git)
-   https://tcl.ari-web.xyz/ (source: https://tcl.ari-web.xyz/filetree.html)
